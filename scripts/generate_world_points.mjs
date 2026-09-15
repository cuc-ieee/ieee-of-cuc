import puppeteer from 'puppeteer-core';
import fs from 'fs';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox'],
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:3000/earth-water.png');

  const points = await page.evaluate(() => {
    const img = document.querySelector('img');
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    const isLand = (lat, lon) => {
      // lon from -180 to 180 -> 0 to width
      let u = (lon + 180) / 360;
      // lat from 90 to -90 -> 0 to height
      let v = (90 - lat) / 180;
      u = Math.max(0, Math.min(1, u));
      v = Math.max(0, Math.min(1, v));

      const x = Math.floor(u * (canvas.width - 1));
      const y = Math.floor(v * (canvas.height - 1));
      const idx = (y * canvas.width + x) * 4;

      // In earth-water.png, land is black (RGB < 128)
      return data[idx] < 120;
    };

    // Sample using Fibonacci sphere for perfectly even distribution
    const samples = 14000;
    const landCoords = [];

    for (let i = 0; i < samples; i++) {
      const yNorm = 1 - (i / (samples - 1)) * 2; // from 1 to -1
      const radiusAtY = Math.sqrt(1 - yNorm * yNorm);
      const theta = (i * Math.PI * (3 - Math.sqrt(5))) % (2 * Math.PI); // golden angle

      const xNorm = Math.cos(theta) * radiusAtY;
      const zNorm = Math.sin(theta) * radiusAtY;

      // Convert unit vector to lat / lon
      // lat: -90 to +90
      const lat = Math.asin(yNorm) * (180 / Math.PI);
      // lon: -180 to +180
      const lon = Math.atan2(zNorm, xNorm) * (180 / Math.PI);

      // Filter out extreme poles if needed, but Antarctica is part of the world
      if (isLand(lat, lon)) {
        // Round to 3 decimal places to keep bundle compact
        landCoords.push([
          Math.round(xNorm * 1000) / 1000,
          Math.round(yNorm * 1000) / 1000,
          Math.round(zNorm * 1000) / 1000,
        ]);
      }
    }

    return landCoords;
  });

  console.log(`Extracted ${points.length} land points!`);

  // Write to TypeScript file
  const tsContent = `// Precomputed unit-sphere coordinates for Earth continents
export const WORLD_MAP_POINTS: [number, number, number][] = ${JSON.stringify(points)};
`;

  fs.writeFileSync('app/data/worldMapPoints.ts', tsContent);
  console.log('Saved to app/data/worldMapPoints.ts');

  await browser.close();
}

main().catch(console.error);
