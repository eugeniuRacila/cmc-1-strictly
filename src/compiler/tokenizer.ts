import { LETTER, NUMBER, WHITE_SPACE } from "../utils/char";
import { Token } from "./types";

export const tokenizer = (input: string): Token[] => {
  const tokens: Token[] = [];

  let char: string;
  let cursorPosition = 0;

  while (cursorPosition < input.length) {
    char = input[cursorPosition];

    // Whitespace
    if (WHITE_SPACE.test(char)) {
      cursorPosition++;
      continue;
    }

    if (char === "(") {
      tokens.push({ type: "OpenParenToken" });
      cursorPosition++;
      continue;
    }

    if (char === ")") {
      tokens.push({ type: "CloseParenToken" });
      cursorPosition++;
      continue;
    }

    if (char === "+") {
      tokens.push({ type: "PlusToken" });
      cursorPosition++;
      continue;
    }

    if (char === "-") {
      tokens.push({ type: "MinusToken" });
      cursorPosition++;
      continue;
    }

    if (char === "*") {
      tokens.push({ type: "AsteriskToken" });
      cursorPosition++;
      continue;
    }

    if (char === "/") {
      tokens.push({ type: "SlashToken" });
      cursorPosition++;
      continue;
    }

    if (NUMBER.test(char)) {
      let value = "";

      while (NUMBER.test(char)) {
        value += char;
        char = input[++cursorPosition];
      }

      tokens.push({ type: "NumericLiteral", value });
      continue;
    }

    if (LETTER.test(char)) {
      let value = "";

      while (LETTER.test(char)) {
        value += char;
        char = input[++cursorPosition];
      }

      tokens.push({ type: "Identifier", value });
      continue;
    }

    throw new SyntaxError(`Unexpected token: "${char}"`);
  }

  return tokens;
};
