export function wheelToHue(wheel: number): number {
  if (wheel < 120) {
    return (0.5 * wheel) % 360;
  } else if (wheel < 180) {
    return (wheel + 300) % 360;
  } else if (wheel < 240) {
    return (2 * wheel + 120) % 360;
  } else {
    return wheel % 360;
  }
}

export function hueToWheel(hue: number): number {
  if (hue < 60) {
    return (hue * 2) % 360;
  } else if (hue < 120) {
    return (hue + 60) % 360;
  } else if (hue < 240) {
    return (0.5 * hue + 120) % 360;
  } else {
    return hue % 360;
  }
}
