import { Result } from "../src/result";

describe("Result module", () => {
  it("should create a successful result", () => {
    const result = Result.Ok("Hello, world!");
    expect(result.isOk()).toBe(true);
    expect(result.isErr()).toBe(false);
    expect(result.unwrap()).toBe("Hello, world!");
  });

  it("should create a failed result", () => {
    const result = Result.Err("Something went wrong.");
    expect(result.isOk()).toBe(false);
    expect(result.isErr()).toBe(true);
    expect(result.getErr()).toBe("Something went wrong.");
  });

  it("should unwrap a successful result", () => {
    const result = Result.Ok("Hello, world!");
    expect(result.unwrap()).toBe("Hello, world!");
  });

  it("should unwrap a failed result and throw an error", () => {
    const result = Result.Err("Something went wrong.");
    expect(() => result.unwrap()).toThrowError("Called unwrap on an error.");
  });

  it("should unwrap a successful result or return a default value", () => {
    const result = Result.Ok("Hello, world!");
    expect(result.unwrapOrDefault("Default")).toBe("Hello, world!");
  });

  it("should unwrap a failed result or return a default value", () => {
    const result = Result.Err("Something went wrong.");
    expect(result.unwrapOrDefault("Default")).toBe("Default");
  });

  it("should unwrap a successful result or return a value from a function", () => {
    const result = Result.Ok("Hello, world!");
    expect(result.unwrapOrElse(() => "Default")).toBe("Hello, world!");
  });

  it("should unwrap a failed result or return a value from a function", () => {
    const result = Result.Err("Something went wrong.");
    expect(result.unwrapOrElse(() => "Default")).toBe("Default");
  });

  it("should expect a successful result", () => {
    const result = Result.Ok("Hello, world!");
    expect(result.expect("Error message")).toBe("Hello, world!");
  });

  it("should expect a failed result and throw an error", () => {
    const result = Result.Err("Something went wrong.");
    expect(() => result.expect("Error message")).toThrowError("Error message");
  });

  it("should map a successful result", () => {
    const result = Result.Ok("Hello, world!");
    const mappedResult = result.map((value) => value.toUpperCase());
    expect(mappedResult.isOk()).toBe(true);
    expect(mappedResult.unwrap()).toBe("HELLO, WORLD!");
  });

  it("should map a failed result and return the same error", () => {
    const result = Result.Err("Something went wrong.");
    const mappedResult = result.map(() => "Hello, world!");
    expect(mappedResult.isErr()).toBe(true);
    expect(mappedResult.getErr()).toBe("Something went wrong.");
  });

  it("should flatMap a successful result", () => {
    const result = Result.Ok("Hello, world!");
    const mappedResult = result.flatMap((value) => Result.Ok(value.toUpperCase()));
    expect(mappedResult.isOk()).toBe(true);
    expect(mappedResult.unwrap()).toBe("HELLO, WORLD!");
  });

  it("should flatMap a failed result and return the same error", () => {
    const result = Result.Err("Something went wrong.");
    const mappedResult = result.flatMap(() => Result.Ok("Hello, world!"));
    expect(mappedResult.isErr()).toBe(true);
    expect(mappedResult.getErr()).toBe("Something went wrong.");
  });
});
