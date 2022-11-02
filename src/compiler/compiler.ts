import { emitter } from "./emitter";
import { parser } from "./parser";
import { tokenizer } from "./tokenizer";

export function compiler(input: string): string {
  const tokens = tokenizer(input);
  console.log("tokens -> ", tokens);

  const ast = parser(tokens);
  console.log("ast -> ");
  console.log(JSON.stringify(ast, null, 2));

  const output = emitter(ast);

  return output;
}
