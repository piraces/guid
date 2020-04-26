export class Guid {
  private static readonly patternV4 = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[4][0-9a-fA-F]{3}-[89ab][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/i;
  private static readonly emptyStr = '00000000-0000-0000-0000-000000000000';
  private static readonly MAX_INT_32 = 4294967295;

  private contentStr?: string;
  private contentInt?: number;
  private readonly DASH = '-';
  private readonly DASH_REGEXP = /-/g;

  constructor(str?: string) {
    this.contentStr = str;
    this.contentInt = this.getNumberFromGuidString();
    if (!this.isValid()) {
      this.contentStr = Guid.emptyStr;
      this.contentInt = -1;
    }
  }

  public static empty() {
    return new Guid();
  }

  public static newGuid(): Guid {
    return new Guid(this.generate());
  }

  public static isValid(str: string): boolean {
    if (str) {
      return Guid.patternV4.test(str);
    }
    return false;
  }

  public isValid(): boolean {
    if (this.contentStr) {
      return Guid.patternV4.test(this.contentStr);
    }
    return false;
  }

  public isEmpty(): boolean {
    return this.contentStr === Guid.emptyStr;
  }

  public equals(otherGuid: Guid): boolean {
    return otherGuid && !!this.contentStr && otherGuid.toString().toLowerCase() === this.contentStr.toLowerCase();
  }

  public toString(): string {
    return this.contentStr ?? '';
  }

  public toNumber(): number {
    return this.contentInt ?? -1;
  }

  private getNumberFromGuidString(): number {
    if (!this.contentStr || this.contentStr.indexOf(this.DASH) === -1) {
      return -1;
    }

    return Number('0x' + this.contentStr.replace(this.DASH_REGEXP, ''));
  }

  private static generate(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Guid.generateRandomDecimal() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  private static generateRandomDecimal(): number {
    const cryptoObj = Guid.getCryptoImplementation();
    return typeof cryptoObj !== 'undefined'
      ? cryptoObj.getRandomValues(new Uint32Array(1))[0] / Guid.MAX_INT_32
      : Math.random();
  }

  private static getCryptoImplementation(): Crypto {
    // @ts-ignore: msCrypto does not exists in window (only for IE11)
    return window.crypto || window.msCrypto;
  }
}
