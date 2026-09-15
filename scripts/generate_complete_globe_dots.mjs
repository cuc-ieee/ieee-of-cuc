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

  const globeData = await page.evaluate(() => {
    const img = document.querySelector('img');
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    const isLand = (lat, lon) => {
      let u = (lon + 180) / 360;
      let v = (90 - lat) / 180;
      u = Math.max(0, Math.min(1, u));
      v = Math.max(0, Math.min(1, v));

      const x = Math.floor(u * (canvas.width - 1));
      const y = Math.floor(v * (canvas.height - 1));
      const idx = (y * canvas.width + x) * 4;

      // In earth-water.png, land is black (RGB < 120)
      return data[idx] < 120;
    };

    // Total points on the sphere
    const totalPoints = 6500;
    const whitePoints = [];
    const bluePoints = [];

    for (let i = 0; i < totalPoints; i++) {
      const yNorm = 1 - (i / (totalPoints - 1)) * 2; // from 1 to -1
      const radiusAtY = Math.sqrt(Math.max(0, 1 - yNorm * yNorm));
      const theta = (i * Math.PI * (3 - Math.sqrt(5))) % (2 * Math.PI); // golden angle

      const xNorm = Math.cos(theta) * radiusAtY;
      const zNorm = Math.sin(theta) * radiusAtY;

      const lat = Math.asin(Math.max(-1, Math.min(1, yNorm))) * (180 / Math.PI);
      const lon = Math.atan2(zNorm, xNorm) * (180 / Math.PI);

      const pt = [
        Math.round(xNorm * 1000) / 1000,
        Math.round(yNorm * 1000) / 1000,
        Math.round(zNorm * 1000) / 1000,
      ];

      if (isLand(lat, lon)) {
        whitePoints.push(pt);
      } else {
        bluePoints.push(pt);
      }
    }

    return {
      whitePoints,
      bluePoints,
    };
  });

  console.log(`Generated ${globeData.whitePoints.length} white land dots and ${globeData.bluePoints.length} blue ocean dots!`);

  const tsContent = `// Precomputed unit-sphere coordinates for White land dots and Blue ocean dots
export const GLOBE_WHITE_DOTS: [number, number, number][] = ${JSON.stringify(globeData.whitePoints)};
export const GLOBE_BLUE_DOTS: [number, number, number][] = ${JSON.stringify(globeData.bluePoints)};
`;

  fs.writeFileSync('app/data/globeDots.ts', tsContent);
  console.log('Saved to app/data/globeDots.ts');

  await browser.close();
}

main().catch(console.error);
