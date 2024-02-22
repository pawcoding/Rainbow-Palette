export enum PaletteScheme {
  RAINBOW = 'rainbow',
  SURPRISE = 'surprise',
  MONOCHROME = 'monochrome',
  ANALOGOUS = 'analogous',
  COMPLEMENTARY = 'complementary',
  SPLIT_COMPLEMENTARY = 'split-complementary',
  SQUARE = 'square',
  TETRADIC = 'tetradic',
  TRIADIC = 'triadic',
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
  { value: PaletteScheme.SQUARE, label: 'scheme.square' },
  { value: PaletteScheme.TETRADIC, label: 'scheme.tetradic' },
  { value: PaletteScheme.TRIADIC, label: 'scheme.triadic' },
];
