import { compilation } from "./compilation.js";
import * as PP from "./prompt_parser.js";
import { SDPromptParser as sdp } from "./types";

export class PromptParser {
  _parser: any;
  constructor(options?: sdp.ILarkOptions) {
    this._parser = PP.get_parser(options);
  }

  parseAST(text: string) {
    return this._parser.parse(text) as sdp.IPromptASTNode;
  }

  parse(text: string) {
    const root = this.parseAST(text);
    return compilation(root);
  }
}
