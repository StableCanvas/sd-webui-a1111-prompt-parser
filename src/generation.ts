import { SDPromptParser as sdp } from "./types";

/**
 * Generates a string representation of a prompt node.
 *
 * @param {sdp.PromptNode} node - The prompt node to generate the string representation for.
 * @return {string} The string representation of the prompt node.
 */
const generation_node = (node: sdp.PromptNode): string => {
  switch (node.type) {
    case "extra_networks_name":
    case "plain": {
      return node.value;
    }
    case "positive": {
      const nodes = node.args;
      const depth = node.value;
      // depth 2 => (( node.value ))
      // depth 3 => ((( node.value )))
      let result = generation_token(nodes).join(", ");
      for (let i = 0; i < depth; i++) {
        result = `(${result})`;
      }
      return result;
    }
    case "negative": {
      const nodes = node.args;
      const depth = node.value;
      // depth 2 => [[ node.value ]]
      // depth 3 => [[[ node.value ]]]
      let result = generation_token(nodes).join(", ");
      for (let i = 0; i < depth; i++) {
        result = `[${result}]`;
      }
      return result;
    }
    case "weighted": {
      const n = node.value;
      const prompts = node.args;
      const prompt = generation_token(prompts).join(", ");
      return `(${prompt}:${n})`;
    }
    case "alternate": {
      if (!node.args || !Array.isArray(node.args)) {
        throw new Error("Invalid AST, missing args for alternate node");
      }
      // "[" prompts ("|" prompts)+ "]"
      const result = node.args.map((x) => generation_token([x])).join(" | ");
      return `[${result}]`;
    }
    case "scheduled_to": {
      // "[" prompts ":" number "]"
      const number = node.value;
      if (typeof number !== "number") {
        throw new Error("Invalid AST, missing number for scheduled_to node");
      }
      const prompts = node.args;
      if (!Array.isArray(prompts)) {
        throw new Error("Invalid AST, missing args for scheduled_to node");
      }
      const result = generation_token(prompts).join(", ");
      return `[${result}:${number}]`;
    }
    case "scheduled_from": {
      // "[" prompts ":" ":" number "]"
      const number = node.value;
      if (Number.isNaN(number)) {
        throw new Error("Invalid AST, missing number for scheduled_from node");
      }
      const prompts = node.args;
      if (!Array.isArray(prompts)) {
        throw new Error("Invalid AST, missing args for scheduled_from node");
      }
      const result = generation_token(prompts).join(", ");
      return `[${result}::${number}]`;
    }
    case "scheduled_full": {
      // "[" prompts ":" prompts ":" number "]"
      const number = node.value;
      if (Number.isNaN(number)) {
        throw new Error("Invalid AST, missing number for scheduled_full node");
      }
      const [from, to] = node.args;
      return `[${generation_str(from)}:${generation_str(to)}:${number}]`;
    }
    case "extra_networks": {
      // "<" extra_networks_name extra_networks_args ">"
      const type = node.value;
      const args = node.args;
      if (!Array.isArray(args)) {
        throw new Error("Invalid AST, missing args for extra_networks node");
      }
      const result = args.join(":");
      return `<${type}:${result}>`;
    }
    default: {
      throw new Error(`Unknown node type: ${(node as any).type}`);
    }
  }
};

/**
 * Generates tokens for prompt nodes.
 *
 * @param {sdp.PromptNode[]} nodes - The prompt nodes to generate tokens for.
 * @return {string[]} The generated tokens.
 */
export const generation_token = (nodes: sdp.PromptNode[]): string[] => {
  return nodes.map(generation_node);
};

/**
 * Generates a string representation of prompt nodes.
 *
 * @param {sdp.PromptNode[]} nodes - The prompt nodes to generate the string representation for.
 * @return {string} The generated string representation.
 */
export const generation_str = (nodes: sdp.PromptNode[]): string => {
  return generation_token(nodes).join(", ");
};
