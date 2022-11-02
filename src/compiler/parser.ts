import {
  AdditiveOperator,
  BinaryExpressionNode,
  CallExpressionNode,
  IdentifierToken,
  MultiplicativeOperator,
  Node,
  NumericLiteralNode,
  NumericLiteralToken,
  Program,
  StringLiteralNode,
  StringLiteralToken,
  Token,
} from "./types";

export const parser = (tokens: Token[]) => {
  const program: Program = { body: [] };

  let current = 0;

  function parse(): Node {
    const token = tokens[current];

    if (token.type === "Identifier") {
      return parseCallExpression(token);
    }

    if (token.type === "StringLiteral") {
      return parseStringLiteral(token);
    }

    if (token.type === "NumericLiteral") {
      const next = tokens[current + 1];

      if (
        next?.type === "PlusToken" ||
        next?.type === "MinusToken" ||
        next?.type === "AsteriskToken" ||
        next?.type === "SlashToken"
      ) {
        return parseBinaryExpression(token, next);
      } else {
        return parseNumericLiteral(token);
      }
    }

    throw new SyntaxError(`Unknown token: ${token.type}`);
  }

  function parseBinaryExpression(
    token: NumericLiteralToken,
    next: AdditiveOperator | MultiplicativeOperator
  ): BinaryExpressionNode {
    const left = parseNumericLiteral(token);

    const operator = next;

    current++;

    const right = parse();
    return { type: "BinaryExpression", left, operator, right };
  }

  function parseCallExpression(token: IdentifierToken): CallExpressionNode {
    const identifier = token;
    current++;

    if (tokens[current].type !== "OpenParenToken") {
      throw new SyntaxError(`Identifier must be followed by "("`);
    }

    current++;

    const argument: Node = parse();

    if (tokens[current].type !== "CloseParenToken") {
      throw new SyntaxError(`Call expressions terminate with ")"`);
    }

    current++;

    return { type: "CallExpression", identifier, argument };
  }

  function parseNumericLiteral(token: NumericLiteralToken): NumericLiteralNode {
    current++;

    return {
      type: "NumericLiteral",
      value: token.value,
    };
  }

  function parseStringLiteral(token: StringLiteralToken): StringLiteralNode {
    current++;

    return {
      type: "StringLiteral",
      value: token.value,
    };
  }

  while (current < tokens.length) {
    program.body.push(parse());
  }

  return program;
};
