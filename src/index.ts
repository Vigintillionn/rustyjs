import { Result } from './result';
export * from './result';
export * from './option';
export * from './iterator';

function divide(a: number, b: number): Result<number, string> {
  if (b === 0) {
    return Result.Err('Division by zero');
  } else {
    return Result.Ok(a / b);
  }
}

const result1 = divide(10, 2);
if (result1.isOk()) {
  console.log('Result:', result1.unwrap());
} else {
  console.log('Error:', result1.getErr());
}

const result2 = divide(10, 0);
if (result2.isOk()) {
  console.log('Result:', result2.unwrap());
} else {
  console.log('Error:', result2.getErr());
}
