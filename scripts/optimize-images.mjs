import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// Files to skip (e.g. data mask files used by scripts)
const IGNORE_FILENAMES = new Set([
  "earth-topology.png",
  "earth-water.png",
]);

const SUPPORTED_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

const CONFIG = {
  maxWidth: 1920,
  maxHeight: 1920,
  jpegQuality: 82,
  pngQuality: 85,
  webpQuality: 82,
};

function formatBytes(bytes) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

async function getFiles(dir) {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = path.resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    })
  );
  return files.flat();
}

async function optimizeImage(filePath) {
  const fileName = path.basename(filePath);
  const ext = path.extname(filePath).toLowerCase();

  if (IGNORE_FILENAMES.has(fileName) || !SUPPORTED_EXTS.has(ext)) {
    return null;
  }

  const inputBuffer = await fs.readFile(filePath);
  const originalSize = inputBuffer.length;

  let pipeline = sharp(inputBuffer, { failOnError: false });
  const metadata = await pipeline.metadata();

  // Downscale if image exceeds max dimensions (e.g., raw 4K camera photos)
  if (
    (metadata.width && metadata.width > CONFIG.maxWidth) ||
    (metadata.height && metadata.height > CONFIG.maxHeight)
  ) {
    pipeline = pipeline.resize({
      width: CONFIG.maxWidth,
      height: CONFIG.maxHeight,
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  // Format-specific lossless/near-lossless compression
  if (ext === ".jpg" || ext === ".jpeg") {
    pipeline = pipeline.jpeg({
      quality: CONFIG.jpegQuality,
      mozjpeg: true,
      progressive: true,
    });
  } else if (ext === ".png") {
    pipeline = pipeline.png({
      quality: CONFIG.pngQuality,
      compressionLevel: 9,
      effort: 8,
    });
  } else if (ext === ".webp") {
    pipeline = pipeline.webp({
      quality: CONFIG.webpQuality,
      effort: 6,
    });
  }

  const optimizedBuffer = await pipeline.toBuffer();
  const newSize = optimizedBuffer.length;

  if (newSize < originalSize) {
    await fs.writeFile(filePath, optimizedBuffer);
    const savedBytes = originalSize - newSize;
    const percent = ((savedBytes / originalSize) * 100).toFixed(1);
    return {
      file: path.relative(process.cwd(), filePath),
      originalSize,
      newSize,
      savedBytes,
      percent,
      status: "optimized",
    };
  } else {
    return {
      file: path.relative(process.cwd(), filePath),
      originalSize,
      newSize: originalSize,
      savedBytes: 0,
      percent: "0.0",
      status: "already_optimal",
    };
  }
}

async function main() {
  console.log("==========================================");
  console.log("🚀 IEEE CUC Automated Image Optimizer");
  console.log("==========================================\n");

  const publicDir = path.resolve(process.cwd(), "public");
  const allFiles = await getFiles(publicDir);

  const imageFiles = allFiles.filter((f) => {
    const ext = path.extname(f).toLowerCase();
    const name = path.basename(f);
    return SUPPORTED_EXTS.has(ext) && !IGNORE_FILENAMES.has(name);
  });

  console.log(`Found ${imageFiles.length} images to optimize in /public...\n`);

  let totalOriginal = 0;
  let totalOptimized = 0;
  let countOptimized = 0;

  for (const file of imageFiles) {
    try {
      const res = await optimizeImage(file);
      if (!res) continue;

      totalOriginal += res.originalSize;
      totalOptimized += res.newSize;

      if (res.status === "optimized") {
        countOptimized++;
        console.log(
          `✓ ${res.file.padEnd(45)} ${formatBytes(res.originalSize)} -> ${formatBytes(res.newSize)} (-${res.percent}%)`
        );
      } else {
        console.log(
          `• ${res.file.padEnd(45)} ${formatBytes(res.originalSize)} (Already optimal)`
        );
      }
    } catch (err) {
      console.error(`✗ Failed to optimize ${file}:`, err.message);
    }
  }

  const totalSaved = totalOriginal - totalOptimized;
  const totalPercent = totalOriginal > 0 ? ((totalSaved / totalOriginal) * 100).toFixed(1) : 0;

  console.log("\n==========================================");
  console.log(`🎉 Optimization Complete!`);
  console.log(`Images Optimized: ${countOptimized} of ${imageFiles.length}`);
  console.log(`Original Total:   ${formatBytes(totalOriginal)}`);
  console.log(`Optimized Total:  ${formatBytes(totalOptimized)}`);
  console.log(`Total Saved:      ${formatBytes(totalSaved)} (-${totalPercent}%)`);
  console.log("==========================================\n");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
