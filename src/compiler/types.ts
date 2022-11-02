export type IdentifierToken = { type: "Identifier"; value: string };
export type OpenParenToken = { type: "OpenParenToken" };
export type CloseParenToken = { type: "CloseParenToken" };
export type NumericLiteralToken = { type: "NumericLiteral"; value: string };
export type StringLiteralToken = { type: "StringLiteral"; value: string };
export type EqualsToken = { type: "EqualsToken" };
export type PlusToken = { type: "PlusToken" };
export type MinusToken = { type: "MinusToken" };
export type AsteriskToken = { type: "AsteriskToken" };
export type SlashToken = { type: "SlashToken" };

export type Token =
  | IdentifierToken
  | OpenParenToken
  | CloseParenToken
  | NumericLiteralToken
  | StringLiteralToken
  | EqualsToken
  | PlusToken
  | MinusToken
  | AsteriskToken
  | SlashToken;

export type AdditiveOperator = PlusToken | MinusToken;
export type MultiplicativeOperator = AsteriskToken | SlashToken;

export type NumericLiteralNode = { type: "NumericLiteral"; value: string };
export type StringLiteralNode = { type: "StringLiteral"; value: string };

export type VariableDeclarationNode = {
  type: "VariableDeclaration";
  identifier: IdentifierToken;
  initializer: Node;
};
export type CallExpressionNode = {
  type: "CallExpression";
  identifier: IdentifierToken;
  argument: Node;
};
export type BinaryExpressionNode = {
  type: "BinaryExpression";
  left: Node;
  right: Node;
  operator: AdditiveOperator | MultiplicativeOperator;
};

export type Node =
  | BinaryExpressionNode
  | CallExpressionNode
  | NumericLiteralNode
  | StringLiteralNode;

export type Program = { body: Node[] };
