import { AdditiveOperator, MultiplicativeOperator } from "../compiler/types";

export const getBinaryExpressionOperatorToken = ({
  type,
}: AdditiveOperator | MultiplicativeOperator): string => {
  if (type === "PlusToken") return "+";
  if (type === "MinusToken") return "-";
  if (type === "AsteriskToken") return "*";
  if (type === "SlashToken") return "/";

  throw new SyntaxError(`Unknown token: '${type}'`);
};
