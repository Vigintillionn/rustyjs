<h1 align="center">RustyJS</h1>

<p align="center">
RustyJS is a library that brings some of the useful features of the <a href="https://www.rust-lang.org/">Rust programming language</a> to JavaScript. With RustyJS, developers can write safer and more efficient code in JavaScript by incorporating Rust's best practices and techniques.
</p>

## About

RustyJS aims to bridge the gap between Rust and JavaScript, allowing developers to leverage Rust's powerful features in their JavaScript projects. By providing utilities inspired by Rust's syntax and concepts, RustyJS enhances code safety, error handling, and overall developer productivity.

## Features

- **Option and Result Types**: Implementations of Rust's Option and Result types for safer handling of nullable values and error propagation.
- **Iterators**: Implementation of Rust's Iterators allowing for more powerful traversal of series of data.

## Installation
You can install RustyJS via npm:

```bash
npm install rustyjs
```

## Getting Started
To get started with RustyJS, you can refer to the following examples:

### Example: Option and Result types
```ts
import { Option, Result } from 'rustyjs';

// Using Option
const maybeNumber = Option.Some(42);
const result = maybeNumber.map(num => num * 2).unwrapOr(0);
console.log(result); // Output: 84

// Using Result
const divide = (a, b) => {
  if (b === 0) {
    return Result.Err(new Error("Division by zero"));
  }
  return Result.Ok(a / b);
};

const result1 = divide(10, 2).unwrap();
console.log(result1); // Output: 5

const result2 = divide(10, 0).unwrapOr(0);
console.log(result2); // Output: 0

const result3 = divide(20, 3);
if (result3.isSome()) {
  console.log(result3.unwrap()); // unwrap can be safely called here
}
```
