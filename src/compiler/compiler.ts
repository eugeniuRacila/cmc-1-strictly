import { emitter } from "./emitter";
import { parser } from "./parser";
import { tokenizer } from "./tokenizer";

export function compiler(input: string): string {
  const tokens = tokenizer(input);
  console.log(tokens);

  const ast = parser(tokens);
  console.log(ast);

  const output = emitter(ast);

  return output;
}
