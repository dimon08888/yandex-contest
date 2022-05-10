function calc(first, ...rest) {
  let result = BigInt(first);
  let operator;

  for (const token of rest) {
    if ('+-*/'.includes(token)) {
      operator = token;
      continue;
    }

    switch (operator) {
      case '+':
        result += BigInt(token);
        break;
      case '-':
        result -= BigInt(token);
        break;
      case '*':
        result *= BigInt(token);
        break;
      case '/':
        result /= BigInt(token);
        break;
    }
  }

  return result.toString();
}

module.exports = { calc };
