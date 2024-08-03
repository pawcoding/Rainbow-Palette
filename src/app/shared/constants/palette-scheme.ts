export enum PaletteScheme {
  RAINBOW = 'rainbow',
  SURPRISE = 'surprise',
  AI = 'ai',
  MONOCHROME = 'monochrome',
  ANALOGOUS = 'analogous',
  COMPLEMENTARY = 'complementary',
  SPLIT_COMPLEMENTARY = 'split-complementary',
  TRIADIC = 'triadic',
  COMPOUND = 'compound'
}

export const PALETTE_SCHEMES = [
  { value: PaletteScheme.RAINBOW, label: 'scheme.rainbow' },
  { value: PaletteScheme.SURPRISE, label: 'scheme.surprise' },
  { value: PaletteScheme.MONOCHROME, label: 'scheme.monochrome' },
  { value: PaletteScheme.ANALOGOUS, label: 'scheme.analogous' },
  { value: PaletteScheme.COMPLEMENTARY, label: 'scheme.complementary' },
  {
    value: PaletteScheme.SPLIT_COMPLEMENTARY,
    label: 'scheme.split-complementary'
  },
  { value: PaletteScheme.TRIADIC, label: 'scheme.triadic' },
  { value: PaletteScheme.COMPOUND, label: 'scheme.compound' }
];

if (window.ai) {
  PALETTE_SCHEMES.splice(2, 0, { value: PaletteScheme.AI, label: 'scheme.ai' });
}

/**
 * Get a random color palette scheme.
 */
export function randomScheme(): { value: PaletteScheme; label: string } {
  // Exclude the surprise and AI schemes as they don't make sense here
  const excluded = new Set([PaletteScheme.SURPRISE, PaletteScheme.AI]);
  const schemes = PALETTE_SCHEMES.filter((scheme) => !excluded.has(scheme.value));

  return schemes[Math.floor(Math.random() * schemes.length)];
}
