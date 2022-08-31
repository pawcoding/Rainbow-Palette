// Ported from
// https://github.com/davidkonrad/toUnicodeVariant
// by davidkonrad
// v1.0.2

export class ToUnicodeVariantUtil {

  static offsets: any = {
    m: [0x1d670, 0x1d7f6],
    b: [0x1d400, 0x1d7ce],
    i: [0x1d434, 0x00030],
    bi: [0x1d468, 0x00030],
    c: [0x0001d49c, 0x00030],
    bc: [0x1d4d0, 0x00030],
    g: [0x1d504, 0x00030],
    d: [0x1d538, 0x1d7d8],
    bg: [0x1d56c, 0x00030],
    s: [0x1d5a0, 0x1d7e2],
    bs: [0x1d5d4, 0x1d7ec],
    is: [0x1d608, 0x00030],
    bis: [0x1d63c, 0x00030],
    o: [0x24B6, 0x2460],
    on: [0x0001f150, 0x2460],
    p: [0x249c, 0x2474],
    q: [0x1f130, 0x00030],
    qn: [0x0001F170, 0x00030],
    w: [0xff21, 0xff10],
    u: [0x2090, 0xff10]
  }

  static variantOffsets: any = {
    'monospace': 'm',
    'bold' : 'b',
    'italic' : 'i',
    'bold italic' : 'bi',
    'script': 'c',
    'bold script': 'bc',
    'gothic': 'g',
    'gothic bold': 'bg',
    'doublestruck': 'd',
    'sans': 's',
    'bold sans' : 'bs',
    'italic sans': 'is',
    'bold italic sans': 'bis',
    'parenthesis': 'p',
    'circled': 'o',
    'circled negative': 'on',
    'squared': 'q',
    'squared negative': 'qn',
    'fullwidth': 'w'
  }

  //special characters (absolute values)
  static special: any = {
    m: {
      ' ': 0x2000,
      '-': 0x2013
    },
    i: {
      'h': 0x210e
    },
    g: {
      'C': 0x212d,
      'H': 0x210c,
      'I': 0x2111,
      'R': 0x211c,
      'Z': 0x2128
    },
    d: {
      'C': 0x2102,
      'H': 0x210D,
      'N': 0x2115,
      'P': 0x2119,
      'Q': 0x211A,
      'R': 0x211D,
      'Z': 0x2124
    },
    o: {
      '0': 0x24EA,
      '1': 0x2460,
      '2': 0x2461,
      '3': 0x2462,
      '4': 0x2463,
      '5': 0x2464,
      '6': 0x2465,
      '7': 0x2466,
      '8': 0x2467,
      '9': 0x2468,
    },
    on: {},
    p: {},
    q: {},
    qn: {},
    w: {}
  }

  static chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

  static numbers = '0123456789'


  public static toUnicodeVariant(str: string, variant: string, flags?: string) {
    if (Object.keys(this.special.p).length === 0) {
      //support for parenthesized latin letters small cases
      //support for full width latin letters small cases
      //support for circled negative letters small cases
      //support for squared letters small cases
      //support for squared letters negative small cases
      ['p', 'w', 'on', 'q', 'qn'].forEach(t => {
        for (let i = 97; i <= 122; i++) {
          this.special[t][String.fromCharCode(i)] = this.offsets[t][0] + (i-97)
        }
      })
    }

    const type = this.getType(variant)
    const underline = this.getFlag('underline|u', flags)
    const strike = this.getFlag('strike|s', flags)
    let result = ''

    for (let c of str) {
      let index
      if (this.special[type] && this.special[type][c]) c = String.fromCodePoint(this.special[type][c])
      if (type && (index = this.chars.indexOf(c)) > -1) {
        result += String.fromCodePoint(index + this.offsets[type][0])
      } else if (type && (index = this.numbers.indexOf(c)) > -1) {
        result += String.fromCodePoint(index + this.offsets[type][1])
      } else {
        result += c
      }
      if (underline) result += '\u0332' // add combining underline
      if (strike) result += '\u0336' // add combining strike
    }
    return result
  }

  private static getType(variant: string) {
    if (this.variantOffsets[variant])
      return this.variantOffsets[variant]
    if (this.offsets[variant])
      return variant
    return 'm' //monospace as default
  }

  private static getFlag(flag: string, flags?: string) {
    if (!flags)
      return false
    return flag.split('|').some(f => flags.split(',').indexOf(f) > -1)
  }

}
