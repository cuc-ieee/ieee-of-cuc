// Simple helper to generate Cloudinary URLs from public IDs
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dtlt5iw3v';

// Helper function to generate optimized image URLs
export function getCloudinaryUrl(publicId: string, options?: {
  width?: number;
  height?: number;
  crop?: string;
  quality?: string | number;
}) {
  const baseUrl = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;
  
  const transformations = [];
  
  if (options?.width) transformations.push(`w_${options.width}`);
  if (options?.height) transformations.push(`h_${options.height}`);
  if (options?.crop) transformations.push(`c_${options.crop}`);
  if (options?.quality) transformations.push(`q_${options.quality}`);
  
  // Auto format and quality for optimization
  transformations.push('f_auto', 'q_auto');
  
  const transformString = transformations.join(',');
  return `${baseUrl}/${transformString}/${publicId}`;
}

// Helper function to generate thumbnail URL
export function getThumbnailUrl(publicId: string, size: number = 400) {
  return getCloudinaryUrl(publicId, {
    width: size,
    height: size,
    crop: 'fill',
  });
}
