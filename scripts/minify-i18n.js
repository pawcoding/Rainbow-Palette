const fs = require('fs');
const path = require('path');

// List of supported languages
const languages = ['en', 'de'];

/**
 * Minify a translation file
 */
function minifyTranslation(language) {
  // Read the file size before minification
  const file = `../dist/rainbow-palette/browser/assets/i18n/${language}.json`;
  const before = fs.statSync(path.resolve(__dirname, file)).size;

  // Minify the file
  const content = fs.readFileSync(path.resolve(__dirname, file), 'utf8');
  const minified = JSON.stringify(JSON.parse(content));
  fs.writeFileSync(path.resolve(__dirname, file), minified);

  // Read the file size after minification
  const after = fs.statSync(path.resolve(__dirname, file)).size;

  // Log the results
  const beforeKB = (before / 1024).toFixed(2);
  const afterKB = (after / 1024).toFixed(2);
  const saved = (100 - (after / before) * 100).toFixed(2);
  console.log(`Minified "${language}.json": ${beforeKB} kB -> ${afterKB} kB (-${saved}%)`);
}

// Minify all translation files
languages.forEach(minifyTranslation);
