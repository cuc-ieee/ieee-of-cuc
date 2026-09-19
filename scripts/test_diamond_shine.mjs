import puppeteer from 'puppeteer-core';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    defaultViewport: { width: 1400, height: 700 },
    args: ['--no-sandbox'],
  });

  const page = await browser.newPage();

  const svgDiamond = encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
  <defs>
    <filter id="b" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="1.0"/>
    </filter>
  </defs>
  <!-- Soft blurred diamond halo -->
  <polygon points="7,1 13,7 7,13 1,7" fill="#ffffff" filter="url(#b)" opacity="0.35"/>
  <!-- Diamond core -->
  <polygon points="7,2.5 11.5,7 7,11.5 2.5,7" fill="#ffffff" opacity="0.55"/>
</svg>
  `.trim());

  const html = `
<!DOCTYPE html>
<html>
<head>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&display=swap" rel="stylesheet">
<style>
  body {
    background: #030712;
    color: white;
    font-family: 'Space Grotesk', sans-serif;
    padding: 60px;
  }
  h1 {
    font-size: 56px;
    line-height: 1.15;
    font-weight: 700;
  }

  @keyframes sweep {
    0% {
      background-position: -250% 0, 0 0, 0 0;
    }
    45%, 100% {
      background-position: 250% 0, 0 0, 0 0;
    }
  }

  .diamond-shine {
    display: inline;
    background-image:
      /* 1. Passing shine sweep beam */
      linear-gradient(
        115deg,
        transparent 0%,
        transparent 38%,
        rgba(255, 255, 255, 1) 48%,
        rgba(186, 230, 253, 0.95) 52%,
        transparent 62%,
        transparent 100%
      ),
      /* 2. Diamond pixel texture with soft blur */
      url("data:image/svg+xml,${svgDiamond}"),
      /* 3. Base Curtin Blue Gradient */
      linear-gradient(135deg, #38bdf8 0%, #0284c7 100%);
    background-size: 250% 100%, 14px 14px, 100% 100%;
    background-repeat: no-repeat, repeat, no-repeat;
    background-blend-mode: screen, normal, normal;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: sweep 3.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }
</style>
</head>
<body>
  <h1>
    <span>IEEE</span> <span class="diamond-shine">Curtin University Colombo</span><br/>
    <span>Student Branch</span>
  </h1>
</body>
</html>
  `;

  await page.setContent(html);
  await new Promise(r => setTimeout(r, 400));

  const artifactDir = 'C:\\Users\\Qclid\\.gemini\\antigravity-ide\\brain\\71380052-28df-4d63-96d2-81ab4489365c';
  await page.screenshot({ path: `${artifactDir}/test_desktop_refined.png` });
  console.log('Saved test_desktop_refined.png');

  await browser.close();
}

main().catch(console.error);
