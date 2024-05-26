import { Option } from '../src/option';

describe('Option', () => {
  describe('isSome', () => {
    it('should return true for Some values', () => {
      const option = Option.Some(42);
      expect(option.isSome()).toBe(true);
    });

    it('should return false for None values', () => {
      const option = Option.None();
      expect(option.isSome()).toBe(false);
    });
  });

  describe('isNone', () => {
    it('should return true for None values', () => {
      const option = Option.None();
      expect(option.isNone()).toBe(true);
    });

    it('should return false for Some values', () => {
      const option = Option.Some(42);
      expect(option.isNone()).toBe(false);
    });
  });

  describe('unwrap', () => {
    it('should return the content of a Some value', () => {
      const option = Option.Some(42);
      expect(option.unwrap()).toBe(42);
    });

    it('should throw an error for a None value', () => {
      const option = Option.None();
      expect(() => option.unwrap()).toThrowError();
    });
  });

  // Add more tests for the other methods...
});
