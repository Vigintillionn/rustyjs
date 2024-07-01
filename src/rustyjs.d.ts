declare module 'rustyjs' {
  export class Option<T> {}
  export class Some<T> extends Option<T> {}
  export class None<T> extends Option<T> {}

  export class Result<T, E> {}
  export class Ok<T, E> extends Result<T, E> {}
  export class Err<T, E> extends Result<T, E> {}

  export class Iterator<T> {}
}
