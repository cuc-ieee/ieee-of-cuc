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

  const result = await page.evaluate(() => {
    const img = document.querySelector('img');
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    const getPixel = (lat, lon) => {
      const x = Math.floor(((lon + 180) / 360) * canvas.width);
      const y = Math.floor(((90 - lat) / 180) * canvas.height);
      const idx = (y * canvas.width + x) * 4;
      return [data[idx], data[idx+1], data[idx+2], data[idx+3]];
    };

    const africa = getPixel(10, 20); // Central Africa (Land)
    const pacific = getPixel(0, -150); // Pacific (Water)
    const northAmerica = getPixel(45, -100); // North America (Land)

    return {
      dimensions: { width: canvas.width, height: canvas.height },
      africa,
      pacific,
      northAmerica,
    };
  });

  console.log('Sample result:', result);
  await browser.close();
}

main().catch(console.error);
