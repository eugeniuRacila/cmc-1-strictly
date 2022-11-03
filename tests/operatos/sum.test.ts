import { describe, expect, it } from "vitest";
import { parser } from "../../src/compiler/parser";
import { tokenizer } from "../../src/compiler/tokenizer";

describe("addition module", () => {
  const tokens = tokenizer("show(1 + 2 + 3)");
  const ast = parser(tokens);

  it("will generate tokens list", () => {
    const expected = [
      {
        type: "Identifier",
        value: "show",
      },
      {
        type: "OpenParenToken",
      },
      {
        type: "NumericLiteral",
        value: "1",
      },
      {
        type: "PlusToken",
      },
      {
        type: "NumericLiteral",
        value: "2",
      },
      {
        type: "PlusToken",
      },
      {
        type: "NumericLiteral",
        value: "3",
      },
      {
        type: "CloseParenToken",
      },
    ];

    expect(expected).toMatchObject(tokens);
  });

  it("will generate abstract syntax tree", () => {
    const expected = {
      body: [
        {
          type: "CallExpression",
          identifier: {
            type: "Identifier",
            value: "show",
          },
          argument: {
            type: "BinaryExpression",
            left: {
              type: "NumericLiteral",
              value: "1",
            },
            operator: {
              type: "PlusToken",
            },
            right: {
              type: "BinaryExpression",
              left: {
                type: "NumericLiteral",
                value: "2",
              },
              operator: {
                type: "PlusToken",
              },
              right: {
                type: "NumericLiteral",
                value: "3",
              },
            },
          },
        },
      ],
    };

    expect(expected).toMatchObject(ast);
  });
});
