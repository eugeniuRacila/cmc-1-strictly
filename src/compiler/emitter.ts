import { getBinaryExpressionOperatorToken } from "../utils/operator";
import {
  BinaryExpressionNode,
  CallExpressionNode,
  Node,
  NumericLiteralNode,
  Program,
} from "./types";

export function emitter(program: Program): string {
  function emit(node: Node): string {
    switch (node.type) {
      case "NumericLiteral":
        return emitNumericLiteral(node);
      case "BinaryExpression":
        return emitBinaryExpression(node);
      case "CallExpression":
        return emitCallExpression(node);
      default:
        throw new SyntaxError("Unknown type of Node");
    }
  }

  function emitNumericLiteral(node: NumericLiteralNode): string {
    return node.value;
  }

  function emitBinaryExpression(node: BinaryExpressionNode): string {
    return `${emit(node.left)} ${getBinaryExpressionOperatorToken(
      node.operator
    )} ${emit(node.right)}`;
  }

  function emitCallExpression(node: CallExpressionNode): string {
    if (node.identifier.value === "show") {
      return `console.log(${emit(node.argument)})`;
    }

    throw new SyntaxError(
      `Unknown Identifier in call expression: ${node.identifier}`
    );
  }

  const output: string[] = [];

  for (const node of program.body) {
    output.push(emit(node));
  }

  return output.join("\n");
}
