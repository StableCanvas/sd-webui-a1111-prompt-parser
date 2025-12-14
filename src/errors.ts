import { SDPromptParser } from "./types";

/**
 * SDPromptParser 的基类错误
 */
export class SDPromptParserError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SDPromptParserError";
    // 确保 instanceof 操作符在某些编译环境下正常工作
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

// ==========================================
// 编译阶段错误 (AST -> PromptNodes)
// ==========================================

export class CompilationError extends SDPromptParserError {
  constructor(message: string, public node?: SDPromptParser.IPromptASTNode) {
    super(message);
    this.name = "CompilationError";
  }
}

/**
 * AST 结构错误：比如缺少子节点、子节点数量不对、类型不匹配
 */
export class InvalidASTStructureError extends CompilationError {
  constructor(message: string, node?: SDPromptParser.IPromptASTNode) {
    super(`Invalid AST Structure: ${message}`, node);
    this.name = "InvalidASTStructureError";
  }
}

/**
 * AST 数值/内容错误：比如解析出的权重是 NaN，或者必须存在的字符串为空
 */
export class InvalidASTValueError extends CompilationError {
  constructor(
    message: string,
    public value: any,
    node?: SDPromptParser.IPromptASTNode
  ) {
    super(`Invalid AST Value: ${message} (received: ${value})`, node);
    this.name = "InvalidASTValueError";
  }
}

/**
 * 未知的 AST 节点类型
 */
export class UnknownASTNodeError extends CompilationError {
  constructor(
    nodeData: SDPromptParser.TreeData | string,
    node?: SDPromptParser.IPromptASTNode
  ) {
    super(`Unknown AST Node Type: ${nodeData}`, node);
    this.name = "UnknownASTNodeError";
  }
}

// ==========================================
// 生成阶段错误 (PromptNodes -> String)
// ==========================================

export class GenerationError extends SDPromptParserError {
  constructor(message: string, public node?: SDPromptParser.PromptNode) {
    super(message);
    this.name = "GenerationError";
  }
}

/**
 * PromptNode 结构错误：比如缺少 args 数组
 */
export class InvalidPromptNodeStructureError extends GenerationError {
  constructor(message: string, node?: SDPromptParser.PromptNode) {
    super(`Invalid PromptNode Structure: ${message}`, node);
    this.name = "InvalidPromptNodeStructureError";
  }
}

/**
 * PromptNode 数值错误：比如权重是 NaN
 */
export class InvalidPromptNodeValueError extends GenerationError {
  constructor(
    message: string,
    public value: any,
    node?: SDPromptParser.PromptNode
  ) {
    super(`Invalid PromptNode Value: ${message}`, node);
    this.name = "InvalidPromptNodeValueError";
  }
}

/**
 * 未知的 PromptNode 类型
 */
export class UnknownPromptNodeTypeError extends GenerationError {
  constructor(type: string, node?: SDPromptParser.PromptNode) {
    super(`Unknown PromptNode Type: ${type}`, node);
    this.name = "UnknownPromptNodeTypeError";
  }
}
