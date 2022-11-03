import { getBinaryExpressionOperatorToken } from "../utils/operator";
import {
  BinaryExpressionNode,
  CallExpressionNode,
  IdentifierLiteralNode,
  Node,
  NumericLiteralNode,
  Program,
  StringLiteralNode,
  VariableDeclarationNode,
} from "./types";

export function emitter(program: Program): string {
  function emit(node: Node): string {
    switch (node.type) {
      case "NumericLiteral":
        return emitNumericLiteral(node);
      case "StringLiteral":
        return emitStringLiteral(node);
      case "IdentifierLiteral":
        return emitIdentifierLiteral(node);
      case "BinaryExpression":
        return emitBinaryExpression(node);
      case "CallExpression":
        return emitCallExpression(node);
      case "VariableDeclaration":
        return emitVariableDeclaration(node);

      default:
        throw new SyntaxError("Unknown type of Node");
    }
  }

  function emitIdentifierLiteral(node: IdentifierLiteralNode): string {
    return node.value;
  }

  function emitNumericLiteral(node: NumericLiteralNode): string {
    return node.value;
  }

  function emitStringLiteral(node: StringLiteralNode): string {
    return `"${node.value}"`;
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

    if (node.identifier.value === "shine") {
      return `console.log(gradient.rainbow(${emit(node.argument)}))`;
    }

    throw new SyntaxError(
      `Unknown Identifier in call expression: ${node.identifier}`
    );
  }

  function emitVariableDeclaration({
    identifier,
    initializer,
  }: VariableDeclarationNode): string {
    return `let ${identifier.value} = ${emit(initializer)}`;
  }

  const output: string[] = [`const gradient = require("gradient-string");`];

  for (const node of program.body) {
    output.push(emit(node));
  }

  return output.join("\n");
}
