import { SDPromptParser as sdp } from "./types";

export const compilation = (node: sdp.IPromptASTNode): sdp.PromptNode[] => {
  switch (node.data as sdp.TreeData) {
    case "start": {
      return node.children?.map(compilation).flat() as sdp.PromptNode[];
    }
    case "multiple": {
      if (!node.children) return [];
      return node.children
        .map((child) => {
          if (child.data === "plain") {
            return (
              child.children
                ?.filter((c) => c.type === "PLAIN_TEXT")
                .map((c) => ({
                  type: "plain",
                  value: c.value!,
                })) || []
            );
          }
          return compilation(child);
        })
        .flat() as sdp.PromptNode[];
    }
    case "combination": {
      if (!node.children) return [];
      const buffer = [] as sdp.PromptNode[];
      let bufferNode = null as null | sdp.PromptNode;
      for (const child of node.children) {
        if (child.data === "plain") {
          if (!bufferNode) {
            bufferNode = {
              type: "plain" as const,
              value: "",
            };
          }
          bufferNode.value += " " + child.children?.[0].value;
        } else {
          if (bufferNode) {
            buffer.push(bufferNode);
            bufferNode = null;
          }
          buffer.push(...compilation(child));
        }
      }
      if (bufferNode) {
        bufferNode.value =
          typeof bufferNode.value === "string"
            ? bufferNode.value.trim()
            : bufferNode.value;
        buffer.push(bufferNode);
      }
      return buffer;
    }
    case "plain": {
      return [
        {
          type: "plain",
          value: node.children?.[0].value!,
        },
      ];
    }
    case "emphasized_positive": {
      if (!node.children) return [];
      let current = node;
      let depth = 0;
      while (current.data === "emphasized_positive") {
        if (!current.children?.[0]) {
          throw new Error("Invalid AST");
        }
        current = current.children?.[0];
        depth++;
      }
      const nodes = compilation(current);
      return [
        {
          type: "positive",
          value: depth,
          args: nodes,
        },
      ];
    }
    case "emphasized_negative": {
      if (!node.children) return [];
      let current = node;
      let depth = 0;
      while (current.data === "emphasized_negative") {
        if (!current.children?.[0]) {
          throw new Error("Invalid AST");
        }
        current = current.children?.[0];
        depth++;
      }
      const nodes = compilation(current);
      return [
        {
          type: "negative",
          value: depth,
          args: nodes,
        },
      ];
      break;
    }
    case "emphasized_weighted": {
      if (!node.children) return [];
      const [combination, number] = node.children;
      if (!combination || !number) {
        throw new Error("Invalid AST");
      }
      const combinationNodes = compilation(combination);
      const number_value = number.children?.[0].value;
      if (!number_value) {
        throw new Error("Invalid AST");
      }
      const n = Number(number_value);
      if (Number.isNaN(n)) {
        throw new Error("Invalid AST");
      }

      return [
        {
          type: "weighted",
          value: n,
          args: combinationNodes,
        },
      ];
    }
    case "alternate": {
      if (!node.children) return [];
      const sub_nodes = node.children.map(compilation).flat();
      return [
        {
          type: "alternate",
          value: "",
          args: sub_nodes,
        },
      ];
    }
    case "scheduled_to": {
      if (!node.children) return [];
      const [value, number] = node.children;
      const n = Number(number.children?.[0].value);
      if (Number.isNaN(n)) {
        throw new Error("Invalid AST");
      }
      return [
        {
          type: "scheduled_to",
          value: n,
          args: compilation(value),
        },
      ];
    }
    case "scheduled_none_to": {
      if (!node.children) return [];
      const [value, number] = node.children;
      const n = Number(number.children?.[0].value);
      if (Number.isNaN(n)) {
        throw new Error("Invalid AST");
      }
      return [
        {
          type: "scheduled_to",
          value: n,
          args: compilation(value),
        },
      ];
    }
    case "scheduled_from": {
      if (!node.children) return [];
      const [value, number] = node.children;
      const n = Number(number.children?.[0].value);
      if (Number.isNaN(n)) {
        throw new Error("Invalid AST");
      }
      return [
        {
          type: "scheduled_from",
          value: n,
          args: compilation(value),
        },
      ];
    }
    case "scheduled_full": {
      if (!node.children) return [];
      const [from_value, to_value, number] = node.children;
      const n = Number(number.children?.[0].value);
      if (Number.isNaN(n)) {
        throw new Error("Invalid AST");
      }
      return [
        {
          type: "scheduled_full",
          value: n,
          args: [compilation(from_value), compilation(to_value)],
        },
      ];
    }
    case "extra_networks_name": {
      return [
        {
          type: "extra_networks_name" as const,
          value: node.children?.[0].value!,
        },
      ];
    }
    case "extra_networks": {
      if (!node.children) return [];
      const [name, args] = node.children;
      if (!name || !args) {
        throw new Error("Invalid AST");
      }
      const nameValue = name.children?.[0].value!;
      const argsValue = args.children?.map((c) => c.value!) || [];
      if (!argsValue.length) {
        throw new Error("Invalid AST");
      }
      if (!nameValue) {
        throw new Error("Invalid AST");
      }
      return [
        {
          type: "extra_networks" as const,
          value: nameValue,
          args: argsValue,
        },
      ];
    }
    default: {
      throw new Error(`Invalid AST: ${node.data} ${node.type || ""}`);
    }
  }
};
