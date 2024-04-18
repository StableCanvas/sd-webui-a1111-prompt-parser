export namespace SDPromptParser {
  export interface ILarkOptions {
    /**
     * Display debug information and extra warnings. Use only when debugging
     */
    debug?: boolean;

    /**
     * Prevent the tree builder from automagically removing "punctuation" tokens
     */
    keep_all_tokens?: boolean;

    /**
     * Lark will produce trees comprised of instances of this class instead of the default `lark.Tree`.
     */
    tree_class?: any;

    /**
     * Cache the results of the Lark grammar analysis, for x2 to x3 faster loading. LALR only for now.
     * - When `False`, does nothing (default)
     * - When `True`, caches to a temporary file in the local directory
     * - When given a string, caches to the path pointed by the string
     */
    cache?: boolean | string;

    /**
     * Lexer post-processing (Default: `None`) Only works with the basic and contextual lexers.
     */
    postlex?: any;

    /**
     * Decides which parser engine to use. Accepts "earley" or "lalr". (Default: "earley").
     */
    parser?: "earley" | "lalr";

    /**
     * Decides whether or not to use a lexer stage
     */
    lexer?: "auto" | "basic" | "contextual" | "dynamic" | "dynamic_complete";

    /**
     * Applies the transformer to every parse tree (equivalent to applying it after the parse, but faster)
     */
    transformer?: any;

    /**
     * The start symbol. Either a string, or a list of strings for multiple possible starts (Default: "start")
     */
    start?: string | string[];

    /**
     * How priorities should be evaluated - "auto", `None`, "normal", "invert" (Default: "auto")
     */
    priority?: "auto" | null | "normal" | "invert";

    /**
     * Decides how to handle ambiguity in the parse. Only relevant if parser="earley"
     */
    ambiguity?: "resolve" | "explicit" | "forest";

    /**
     * When `True`, uses the `regex` module instead of the stdlib `re`.
     */
    regex?: boolean;

    /**
     * Propagates (line, column, end_line, end_column) attributes into all tree branches.
     * Accepts `False`, `True`, or a callable, which will filter which nodes to ignore when propagating.
     */
    propagate_positions?: boolean | ((node: any) => boolean);

    /**
     * Dictionary of callbacks for the lexer. May alter tokens during lexing. Use with caution.
     */
    lexer_callbacks?: { [key: string]: any };

    /**
     * When `True`, the `[]` operator returns `None` when not matched.
     * When `False`,  `[]` behaves like the `?` operator, and returns no value at all.
     */
    maybe_placeholders?: boolean;

    /**
     * A callback for editing the terminals before parse.
     */
    edit_terminals?: (terminals: any) => any;

    /**
     * Flags that are applied to all terminals (both regex and strings)
     */
    g_regex_flags?: string;

    /**
     * Accept an input of type `bytes` instead of `str`.
     */
    use_bytes?: boolean;

    /**
     * A List of either paths or loader functions to specify from where grammars are imported
     */
    import_paths?: string[] | ((path: string) => any)[];

    /**
     * Override the source of from where the grammar was loaded. Useful for relative imports and unconventional grammar loading
     */
    source_path?: string;

    /**
     * Internal use
     */
    _plugins?: any;
  }

  export interface IPromptASTNode {
    data?: string;
    children?: IPromptASTNode[];

    type?: string;
    start_pos?: number;
    value?: string;
    line?: number;
    column?: number;
    end_line?: number;
    end_column?: number;
    end_pos?: number;
    _meta?: any;
  }

  export type PromptNodeType =
    | "plain"
    | "positive"
    | "negative"
    | "weighted"
    | "alternate"
    | "scheduled_to"
    | "scheduled_from"
    | "scheduled_full"
    | "extra_networks_name"
    | "extra_networks";

  export type PlainNode = {
    type: "plain";
    value: string;
  };
  export type PositiveNode = {
    type: "positive";
    value: string;
    // [depth number]
    args: [number];
  };
  export type NegativeNode = {
    type: "negative";
    value: string;
    // [depth number]
    args: [number];
  };
  export type WeightedNode = {
    type: "weighted";
    value: string;
    // [number]
    args: [string];
  };
  export type AlternateNode = {
    type: "alternate";
    value: string;
    args: PromptNode[];
  };
  export type ScheduledToNode = {
    type: "scheduled_to";
    value: string;
    args: PromptNode[];
  };
  export type ScheduledFromNode = {
    type: "scheduled_from";
    value: string;
    args: PromptNode[];
  };
  export type ScheduledFullNode = {
    type: "scheduled_full";
    value: string;
    // [from_prompt, to_prompt]
    args: [PromptNode[], PromptNode[]];
  };
  export type ExtraNetworksNameNode = {
    type: "extra_networks_name";
    value: string;
  };
  export type ExtraNetworksNode = {
    type: "extra_networks";
    value: string;
    args: string[];
  };

  // TreeNode but Array Only...
  export type PromptNode =
    | PlainNode
    | PositiveNode
    | NegativeNode
    | WeightedNode
    | AlternateNode
    | ScheduledToNode
    | ScheduledFromNode
    | ScheduledFullNode
    | ExtraNetworksNameNode
    | ExtraNetworksNode;

  export type TreeData =
    | "start"
    | "plain"
    | "combination"
    | "multiple"
    | "emphasized_negative"
    | "emphasized_positive"
    | "emphasized_weighted"
    | "number"
    | "alternate"
    | "extra_networks"
    | "extra_networks_name"
    | "extra_networks_args"
    | "scheduled_to"
    | "scheduled_none_to"
    | "scheduled_from"
    | "scheduled_full";
}
