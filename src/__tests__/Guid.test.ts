import { Guid } from '../index';

const TestGuidString = '6531b3a1-e00b-4c82-8a7d-0fbfc34cf2fc';
// eslint-disable-next-line no-loss-of-precision
const TestGuidNumber = 0x6531b3a1e00b4c828a7d0fbfc34cf2fc;
const TestInvalidGuidString = 'b68b422c-3897-4aba-1ee2-f8e4f160bf00';
const TestFixedValues = [167, 69, 83, 48, 57, 88, 151, 132, 49, 172, 215, 201, 179, 96, 159, 219];

const cryptoMock = {
  subtle: {
    encrypt() {
      return {} as Promise<ArrayBuffer>;
    },
    decrypt() {
      return {} as Promise<ArrayBuffer>;
    },
    deriveBits() {
      return {} as Promise<ArrayBuffer>;
    },
    deriveKey() {
      return {} as Promise<CryptoKey>;
    },
    digest() {
      return {} as Promise<ArrayBuffer>;
    },
    exportKey() {
      return {} as Promise<any>;
    },
    generateKey() {
      return {} as Promise<any>;
    },
    importKey() {
      return {} as Promise<any>;
    },
    sign() {
      return {} as Promise<any>;
    },
    unwrapKey() {
      return {} as Promise<any>;
    },
    verify() {
      return {} as Promise<any>;
    },
    wrapKey() {
      return {} as Promise<any>;
    },
  },
  getRandomValues<T>(): T {
    return Uint8Array.from(TestFixedValues) as unknown as T;
  },
};

test('Generated GUID by newGuid() is valid', () => {
  const guid = Guid.newGuid();
  expect(guid.isValid()).toBeTruthy();
});

test('Generated GUID by newGuid() with custom implementation is valid', () => {
  const guid = Guid.newGuid(cryptoMock);
  expect(guid.isValid()).toBeTruthy();
});

test('Generate GUID from constructor with valid string is valid', () => {
  const guid = new Guid(TestGuidString);
  expect(guid.isValid()).toBeTruthy();
});

test('Generate GUID from constructor with valid string is non empty', () => {
  const guid = new Guid(TestGuidString);
  expect(guid.isEmpty()).toBeFalsy();
});

test('New GUIDs from constructor by same string are equal', () => {
  const guid = new Guid(TestGuidString);
  const otherGuid = new Guid(TestGuidString);
  expect(guid.equals(otherGuid)).toBeTruthy();
});

test('New GUIDs from constructor by same string but different casing are equal', () => {
  const guid = new Guid(TestGuidString);
  const otherGuid = new Guid(TestGuidString.toUpperCase());
  expect(guid.equals(otherGuid)).toBeTruthy();
});

test('Generate GUID from constructor with invalid string is not valid', () => {
  const guid = new Guid(TestInvalidGuidString);
  expect(guid.isValid()).toBeFalsy();
});

test('Generate GUID from constructor with invalid string is empty', () => {
  const guid = new Guid(TestInvalidGuidString);
  expect(guid.isEmpty()).toBeTruthy();
});

test('Generate GUID using empty constructor is not valid', () => {
  const guid = new Guid();
  expect(guid.isValid()).toBeFalsy();
});

test('Generate GUID using empty constructor is empty', () => {
  const guid = new Guid();
  expect(guid.isEmpty()).toBeTruthy();
});

test('Generate GUID using static empty method is not valid', () => {
  const guid = Guid.empty();
  expect(guid.isValid()).toBeFalsy();
});

test('Generate GUID using static empty method is empty', () => {
  const guid = Guid.empty();
  expect(guid.isEmpty()).toBeTruthy();
});

test('Generate GUID from constructor with valid string returns valid number', () => {
  const guid = new Guid(TestGuidString);
  expect(guid.toNumber()).toBe(TestGuidNumber);
});

test('Generate GUID from constructor with invalid string returns -1 number value', () => {
  const guid = new Guid(TestInvalidGuidString);
  expect(guid.toNumber()).toBe(-1);
});

test('Generate GUID from constructor with no value returns -1 number value', () => {
  const guid = new Guid(TestInvalidGuidString);
  expect(guid.toNumber()).toBe(-1);
});

test('Generate GUID using static empty method returns -1 number value', () => {
  const guid = Guid.empty();
  expect(guid.toNumber()).toBe(-1);
});

test('Validate GUID string using static isValid method returns true with valid GUID string', () => {
  expect(Guid.isValid(TestGuidString)).toBeTruthy();
});

test('Validate GUID string using static isValid method returns false with invalid GUID string', () => {
  expect(Guid.isValid(TestInvalidGuidString)).toBeFalsy();
});

test('Validate GUID string using static isValid method returns false with empty string', () => {
  expect(Guid.isValid('')).toBeFalsy();
});
