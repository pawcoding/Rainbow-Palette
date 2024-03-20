export enum PaletteScheme {
  RAINBOW = 'rainbow',
  SURPRISE = 'surprise',
  MONOCHROME = 'monochrome',
  ANALOGOUS = 'analogous',
  COMPLEMENTARY = 'complementary',
  SPLIT_COMPLEMENTARY = 'split-complementary',
  TRIADIC = 'triadic',
  COMPOUND = 'compound',
}

export const PALETTE_SCHEMES = [
  { value: PaletteScheme.RAINBOW, label: 'scheme.rainbow' },
  { value: PaletteScheme.SURPRISE, label: 'scheme.surprise' },
  { value: PaletteScheme.MONOCHROME, label: 'scheme.monochrome' },
  { value: PaletteScheme.ANALOGOUS, label: 'scheme.analogous' },
  { value: PaletteScheme.COMPLEMENTARY, label: 'scheme.complementary' },
  {
    value: PaletteScheme.SPLIT_COMPLEMENTARY,
    label: 'scheme.split-complementary',
  },
  { value: PaletteScheme.TRIADIC, label: 'scheme.triadic' },
  { value: PaletteScheme.COMPOUND, label: 'scheme.compound' },
];
