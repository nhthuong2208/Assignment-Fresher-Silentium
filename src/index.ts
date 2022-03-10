function expect(expectation: boolean, fn: Function) {
  if (expectation !== fn()) {
    throw Error(`Falsy`);
  }
}

// Engine rule

// From Blue, you can go with Green
// From Blue, you can go with Yellow
// From Green, you can only go to Blue
// From Yellow, you can only go to Blue
// You cannot visit Yellow consecutively

// engine(["blue"]) -> ok
// engine(["blue", "yellow", "blue"]) -> ok
// engine(["blue", "green", "blue", "green"]) -> ok
// engine(["blue", "green", "blue", "yellow"]) -> ok
// engine(["blue", "yellow", "blue", "green", "blue", "yellow"]) -> ok
// engine(["yellow", "green"]) -> not ok
// engine(["blue", "green", "blue", "yellow", "blue", "yellow"]) -> not ok

const BLUE = "blue";
const YELLOW = "yellow";
const GREEN = "green";

function engine(input: string[]): boolean {
  let size = input.length;
  if (size === 0) {
    return false;
  }
  let count = 0;
  for (let i = 0; i < size - 1; i++) {
    switch (input[i]) {
      case BLUE:
        if (input[i + 1] == BLUE) {
          return false;
        }
        else if (input[i + 1] == YELLOW) {
          if (count === 1) {
            return false;
          } else {
            count += 1;
          }
        } else {
          count = 0;
        }
        break;
      case YELLOW:
      case GREEN:
        if (input[i + 1] != BLUE) {
          return false;
        }
        break;
    }
  }
  return true;
}

function cases() {
  expect(true, () => engine(["blue"]));
  expect(true, () => engine(["blue", "yellow", "blue"]));
  expect(true, () => engine(["blue", "green", "blue", "green"]));
  expect(true, () => engine(["blue", "green", "blue", "yellow"]));
  expect(true, () =>
    engine(["blue", "yellow", "blue", "green", "blue", "yellow"])
  );
  expect(false, () => engine(["yellow", "green"]));
  expect(false, () =>
    engine(["blue", "green", "blue", "yellow", "blue", "yellow"])
  );
  expect(false, () => engine([]));
}
cases();
