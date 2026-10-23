import sharp from 'sharp';

// Build-only Vite plugin: every image bundled from src/assets is replaced with a
// copy that is capped in size, carries a tiled watermark baked into the pixels,
// and embeds copyright metadata. The originals in src/assets are never touched,
// and the dev server keeps serving them unmodified.

const IMAGE = /\.(webp|jpe?g|png|avif)$/i;

const escapeXml = (s) => s.replace(/[<>&'"]/g, (c) => `&#${c.charCodeAt(0)};`);

// A diagonal grid of semi-transparent text covering the whole image. White text
// with a thin dark outline stays visible on both light and dark artwork.
function watermarkSvg(width, height, text, opacity) {
  const size = Math.max(14, Math.round(Math.min(width, height) / 24));
  const tileW = Math.round(size * text.length * 1.05);
  const tileH = size * 6;
  const label = escapeXml(text);

  return Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <defs>
        <pattern id="wm" width="${tileW}" height="${tileH}" patternUnits="userSpaceOnUse" patternTransform="rotate(-30)">
          <text x="0" y="${size}" font-family="DejaVu Sans, Arial, sans-serif" font-size="${size}" font-weight="600"
            fill="#fff" stroke="#000" stroke-width="${Math.max(1, size / 22)}" stroke-opacity="0.5">${label}</text>
          <text x="${tileW / 2}" y="${size + tileH / 2}" font-family="DejaVu Sans, Arial, sans-serif" font-size="${size}" font-weight="600"
            fill="#fff" stroke="#000" stroke-width="${Math.max(1, size / 22)}" stroke-opacity="0.5">${label}</text>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#wm)" opacity="${opacity}" />
    </svg>`);
}

async function protect(input, { maxSize, text, opacity, author, copyright }) {
  const image = sharp(input);
  const { format } = await image.metadata();

  const resized = await image
    .resize({ width: maxSize, height: maxSize, fit: 'inside', withoutEnlargement: true })
    .toBuffer({ resolveWithObject: true });
  const { width, height } = resized.info;

  return sharp(resized.data)
    .composite([{ input: watermarkSvg(width, height, text, opacity) }])
    .withExif({ IFD0: { Artist: author, Copyright: copyright, ImageDescription: copyright } })
    .toFormat(format, { quality: 82 })
    .toBuffer();
}

export default function protectImages({
  include = '/src/assets/',
  maxSize = 1400,
  author = 'Gurjeet Kaur',
  text = `© ${author}`,
  copyright = `© ${new Date().getFullYear()} ${author}. All rights reserved. Unauthorised use prohibited.`,
  opacity = 0.22,
} = {}) {
  return {
    name: 'protect-images',
    apply: 'build',
    async generateBundle(_, bundle) {
      const assets = Object.values(bundle).filter(
        (file) =>
          file.type === 'asset' &&
          IMAGE.test(file.fileName) &&
          (file.originalFileNames ?? []).some((name) => `/${name}`.includes(include)),
      );

      await Promise.all(
        assets.map(async (file) => {
          file.source = await protect(Buffer.from(file.source), { maxSize, text, opacity, author, copyright });
        }),
      );

      this.info(`watermarked ${assets.length} images`);
    },
  };
}
