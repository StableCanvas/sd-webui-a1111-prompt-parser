import { compilation } from "./compilation";
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

/**
 * A parser for parsing prompt text (StableDiffusion Prompt) into a list of tokens.
 *
 * @example
 * ```ts
 * const parser = new PromptParser();
 * const tokens = parser.parse("masterpiece, 1girl, blonde hair");
 * console.log(tokens);
 * ```
 */
export class PromptParser {
  _parser: any;
  constructor(options?: sdp.ILarkOptions) {
    this._parser = PP.get_parser(options);
  }

  /**
   * Parses the given text into a prompt abstract syntax tree (AST) node.
   *
   * @param {string} text - The text to be parsed.
   * @param {ParseOptions} [options] - Optional parsing options.
   * @param {boolean} [options.force] - Whether to force parsing even if an error occurs.
   * @returns {sdp.IPromptASTNode} The parsed AST node.
   * @throws {Error} If parsing fails and the `force` option is not enabled.
   */
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

  /**
   * Parses the given text using the provided options.
   *
   * @param {string} text - The text to be parsed.
   * @param {ParseOptions} [options] - Optional parsing options.
   * @return {sdp.PromptNode[]}  The parsed prompt nodes.
   */
  parse(text: string, options?: ParseOptions) {
    const root = this.parseAST(text, options);
    return compilation(root);
  }
}
