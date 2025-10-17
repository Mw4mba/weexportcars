const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const sizes = [16, 32, 48, 64, 128, 256];
const logoPath = path.join(__dirname, '../public/logo-dark.png');
const publicDir = path.join(__dirname, '../public');

async function generateFavicons() {
  try {
    console.log('Generating favicons from logo...');
    
    // Read the logo
    const logoBuffer = fs.readFileSync(logoPath);
    
    // Get logo dimensions
    const metadata = await sharp(logoBuffer).metadata();
    console.log(`Logo dimensions: ${metadata.width}x${metadata.height}`);
    
    // Generate favicon.ico (multi-size ICO file)
    // We'll use the 32x32 as the main favicon
    await sharp(logoBuffer)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toFile(path.join(publicDir, 'favicon-32x32.png'));
    console.log('✓ Created favicon-32x32.png');
    
    // Generate 16x16
    await sharp(logoBuffer)
      .resize(16, 16, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toFile(path.join(publicDir, 'favicon-16x16.png'));
    console.log('✓ Created favicon-16x16.png');
    
    // Generate apple-touch-icon (180x180)
    await sharp(logoBuffer)
      .resize(180, 180, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .png()
      .toFile(path.join(publicDir, 'apple-touch-icon.png'));
    console.log('✓ Created apple-touch-icon.png');
    
    // Generate android-chrome icons
    await sharp(logoBuffer)
      .resize(192, 192, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .png()
      .toFile(path.join(publicDir, 'android-chrome-192x192.png'));
    console.log('✓ Created android-chrome-192x192.png');
    
    await sharp(logoBuffer)
      .resize(512, 512, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .png()
      .toFile(path.join(publicDir, 'android-chrome-512x512.png'));
    console.log('✓ Created android-chrome-512x512.png');
    
    // Generate standard favicon.ico (32x32)
    await sharp(logoBuffer)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .toFormat('png')
      .toFile(path.join(publicDir, 'favicon.ico'));
    console.log('✓ Created favicon.ico');
    
    // Generate Open Graph image (1200x630)
    await sharp(logoBuffer)
      .resize(1200, 630, {
        fit: 'contain',
        background: { r: 230, g: 230, b: 230, alpha: 1 } // #e6e6e6
      })
      .png()
      .toFile(path.join(publicDir, 'og-image.png'));
    console.log('✓ Created og-image.png (1200x630)');
    
    console.log('\n✨ All favicons generated successfully!');
  } catch (error) {
    console.error('Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons();
