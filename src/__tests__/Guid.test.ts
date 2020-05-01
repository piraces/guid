import { Guid } from '../index';

const TestGuidString = '6531b3a1-e00b-4c82-8a7d-0fbfc34cf2fc';
const TestGuidNumber = 0x6531b3a1e00b4c828a7d0fbfc34cf2fc;
const TestInvalidGuidString = 'b68b422c-3897-4aba-1ee2-f8e4f160bf00';

test('Generated GUID by newGuid() is valid', () => {
  const guid = Guid.newGuid();
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
