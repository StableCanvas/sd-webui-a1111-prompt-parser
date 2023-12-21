import { compilation } from "./compilation.js";
import * as PP from "./prompt_parser.js";
import { SDPromptParser as sdp } from "./types";

interface ParseOptions {
  /**
   * force parse the prompt even if it is not a valid prompt
   *
   * It will be truncated at the error token until it can be parsed normally.
   */
  force?: boolean;
}

export class PromptParser {
  _parser: any;
  constructor(options?: sdp.ILarkOptions) {
    this._parser = PP.get_parser(options);
  }

  parseAST(text: string, options?: ParseOptions): sdp.IPromptASTNode {
    try {
      return this._parser.parse(text) as sdp.IPromptASTNode;
    } catch (error) {
      if (!options?.force) {
        throw error;
      }
      if (error instanceof PP.UnexpectedToken) {
        return this.parseAST(text.slice(0, error.token.start_pos), options);
      }
      throw error;
    }
  }

  parse(text: string, options?: ParseOptions) {
    const root = this.parseAST(text, options);
    return compilation(root);
  }
}
