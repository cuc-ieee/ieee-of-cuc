/**
 * Script to fetch all images from Cloudinary and generate gallery.ts
 * 
 * Usage: node scripts/fetch-cloudinary-images.js
 * 
 * Prerequisites:
 * - Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET in .env.local
 */

import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Fetch all images from a specific folder in Cloudinary
 */
async function fetchImagesFromFolder(folderPath = '', folderName = '') {
  try {
    const result = await cloudinary.api.resources_by_asset_folder(folderPath || folderName, {
      type: 'upload',
      max_results: 500,
      resource_type: 'image',
    });

    return result.resources.map(resource => ({
      public_id: resource.public_id,
      folder: folderName || folderPath,
      tags: resource.tags || [],
      created_at: resource.created_at,
    }));
  } catch (error) {
    if (error.error?.http_code === 404) {
      console.log(`    No images found in folder: ${folderPath || folderName}`);
      return [];
    }
    console.error('❌ Error fetching images:', error.message);
    throw error;
  }
}

/**
 * Fetch all folders/subfolders from Cloudinary
 */
async function fetchAllFolders() {
  try {
    const result = await cloudinary.api.root_folders();
    return result.folders.map(folder => folder.path);
  } catch (error) {
    if (error.error?.http_code === 404) {
      return []; // No folders found
    }
    throw error;
  }
}

/**
 * Group images by folder/event or tags
 */
function groupImagesByFolder(resources) {
  const grouped = {};
  
  resources.forEach(resource => {
    const publicId = resource.public_id;
    
    // First, try to group by folder property
    if (resource.folder) {
      const folder = resource.folder;
      if (!grouped[folder]) {
        grouped[folder] = [];
      }
      grouped[folder].push(publicId);
    }
    // Second, try to extract folder from public_id path
    else if (publicId.includes('/')) {
      const folder = publicId.split('/')[0];
      if (!grouped[folder]) {
        grouped[folder] = [];
      }
      grouped[folder].push(publicId);
    }
    // Third, try to group by tags
    else if (resource.tags && resource.tags.length > 0) {
      resource.tags.forEach(tag => {
        if (!grouped[tag]) {
          grouped[tag] = [];
        }
        if (!grouped[tag].includes(publicId)) {
          grouped[tag].push(publicId);
        }
      });
    }
    // Last resort: put in 'uncategorized'
    else {
      if (!grouped['uncategorized']) {
        grouped['uncategorized'] = [];
      }
      grouped['uncategorized'].push(publicId);
    }
  });
  
  return grouped;
}

/**
 * Convert folder name to title (e.g., "3mrc" -> "3 Minute Research Challenge")
 */
function folderToTitle(folder) {
  // Add your custom mappings here
  const customTitles = {
    '3mrc': '3 Minute Research Challenge',
    'greet-meet': 'Annual Greet Meet',
    'agm': 'Annual General Meeting',
    // Add more mappings as needed
  };
  
  if (customTitles[folder]) {
    return customTitles[folder];
  }
  
  // Default: capitalize and replace hyphens/underscores with spaces
  return folder
    .replace(/[-_]/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Convert folder name to slug
 */
function folderToSlug(folder) {
  return folder.toLowerCase().replace(/[_\s]/g, '-');
}

/**
 * Natural sort comparator for image names
 */
function naturalSort(a, b) {
  // Split strings into parts of numbers and non-numbers
  const regex = /(\d+)|(\D+)/g;
  const aParts = a.match(regex);
  const bParts = b.match(regex);
  
  const minLength = Math.min(aParts.length, bParts.length);
  
  for (let i = 0; i < minLength; i++) {
    const aPart = aParts[i];
    const bPart = bParts[i];
    
    // If both parts are numbers, compare numerically
    const aNum = parseInt(aPart);
    const bNum = parseInt(bPart);
    
    if (!isNaN(aNum) && !isNaN(bNum)) {
      if (aNum !== bNum) {
        return aNum - bNum;
      }
    } else {
      // String comparison
      if (aPart !== bPart) {
        return aPart.localeCompare(bPart);
      }
    }
  }
  
  // If all parts are equal, compare lengths
  return aParts.length - bParts.length;
}

/**
 * Generate gallery.ts content
 */
function generateGalleryFile(groupedImages) {
  const events = Object.entries(groupedImages)
    .filter(([folder]) => folder !== 'uncategorized') // Exclude uncategorized by default
    .map(([folder, images], index) => ({
      id: (index + 1).toString(),
      title: folderToTitle(folder),
      slug: folderToSlug(folder),
      images: images.sort(naturalSort), // Sort images naturally
    }));

  const content = `export interface GalleryEvent {
  id: string;
  title: string;
  slug: string;
  images: string[];
}

export const galleryEvents: GalleryEvent[] = ${JSON.stringify(events, null, 2)};
`;

  return content;
}

/**
 * Update only the PLCFI event in app/data/gallery.ts using PLCFI/1 then PLCFI/2 order.
 */
function updatePlcfiImagesInGallery(plcfiImages) {
  const galleryPath = path.join(__dirname, '..', 'app', 'data', 'gallery.ts');
  const gallerySource = fs.readFileSync(galleryPath, 'utf-8');

  const plcfiBlockRegex = /(\{\s*"id":\s*"3",\s*"title":\s*"PLCFI",\s*"slug":\s*"plcfi",\s*"images":\s*)\[[\s\S]*?\](\s*\})/;

  if (!plcfiBlockRegex.test(gallerySource)) {
    throw new Error('Could not find PLCFI block in app/data/gallery.ts');
  }

  const imagesJson = JSON.stringify(plcfiImages, null, 6)
    .replace(/^\[/, '[\n      ')
    .replace(/\]$/, '\n    ]')
    .replace(/\n\s{6}/g, '\n      ');

  const updatedGallerySource = gallerySource.replace(plcfiBlockRegex, `$1${imagesJson}$2`);
  fs.writeFileSync(galleryPath, updatedGallerySource, 'utf-8');

  return galleryPath;
}

/**
 * Main function
 */
async function main() {
  try {
    console.log('🚀 Starting Cloudinary image fetch...\n');

    // Verify credentials
    if (!cloudinary.config().api_key || !cloudinary.config().api_secret) {
      throw new Error(
        '❌ Missing Cloudinary credentials. Please set CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET in your .env.local file.'
      );
    }

    if (process.argv.includes('--plcfi')) {
      console.log('🎯 PLCFI mode enabled: fetching only PLCFI/1 and PLCFI/2\n');

      const subFolders = ['PLCFI/1', 'PLCFI/2'];
      const orderedIds = [];

      for (const subFolder of subFolders) {
        console.log(`  Fetching from: ${subFolder}`);
        const resources = await fetchImagesFromFolder(subFolder, subFolder);
        const sortedIds = resources.map(item => item.public_id).sort(naturalSort);
        orderedIds.push(...sortedIds);
        console.log(`  ✅ ${subFolder}: ${sortedIds.length} images`);
      }

      const updatedPath = updatePlcfiImagesInGallery(orderedIds);
      console.log(`\n✅ Updated PLCFI images in: ${updatedPath}`);
      console.log(`📸 Total PLCFI images: ${orderedIds.length}`);
      return;
    }

    // Fetch all folders
    console.log('📁 Discovering folders...');
    const folders = await fetchAllFolders();
    console.log(`✅ Found ${folders.length} folders: ${folders.join(', ')}\n`);

    // Fetch images from all folders
    console.log('📥 Fetching images from all folders...');
    const allResources = [];
    const seenIds = new Set();
    
    for (const folder of folders) {
      console.log(`  Fetching from: ${folder}`);
      const images = await fetchImagesFromFolder(folder, folder);
      images.forEach(img => {
        if (!seenIds.has(img.public_id)) {
          seenIds.add(img.public_id);
          allResources.push(img);
        }
      });
    }
    
    console.log(`✅ Found ${allResources.length} total images\n`);

    // Show sample of first few images
    console.log('📸 Sample images (first 5):');
    allResources.slice(0, 5).forEach(resource => {
      console.log(`  - ${resource.public_id}`);
      console.log(`    Folder property: "${resource.folder}"`);
      if (resource.tags.length > 0) console.log(`    Tags: ${resource.tags.join(', ')}`);
    });
    console.log('');

    // Group by folder
    console.log('📊 Grouping images by folder/tags...');
    const grouped = groupImagesByFolder(allResources);
    console.log(`✅ Grouped into ${Object.keys(grouped).length} categories\n`);

    // Display summary
    console.log('📋 Summary:');
    Object.entries(grouped).forEach(([folder, images]) => {
      console.log(`  - ${folder}: ${images.length} images`);
    });
    console.log('');

    // Generate gallery.ts
    console.log('📝 Generating gallery.ts...');
    const galleryContent = generateGalleryFile(grouped);
    
    const outputPath = path.join(__dirname, '..', 'app', 'data', 'gallery.ts');
    fs.writeFileSync(outputPath, galleryContent, 'utf-8');
    
    console.log(`✅ Successfully generated gallery.ts with ${Object.keys(grouped).length - (grouped.uncategorized ? 1 : 0)} events`);
    console.log(`📁 File saved to: ${outputPath}\n`);

    // Show preview
    const events = Object.entries(grouped)
      .filter(([folder]) => folder !== 'uncategorized')
      .map(([folder, images], index) => ({
        id: (index + 1).toString(),
        title: folderToTitle(folder),
        slug: folderToSlug(folder),
        images: images.length,
        sample: images.slice(0, 2),
      }));

    if (events.length > 0) {
      console.log('👀 Preview (first 3 events):');
      events.slice(0, 3).forEach(event => {
        console.log(`\n  Event: ${event.title}`);
        console.log(`  Slug: ${event.slug}`);
        console.log(`  Images: ${event.images}`);
        console.log(`  Sample: ${event.sample.join(', ')}`);
      });
    } else {
      console.log('\n⚠️  No events found!');
      console.log('Your images might not be organized in folders or tags.');
      console.log('Consider organizing them in Cloudinary or adding tags.');
    }

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

// Run the script
main();
