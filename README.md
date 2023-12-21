# sd-webui-a1111-prompt-parser
sd a1111 prompt parser for javascript.

# usage

```ts
import { PromptParser } from "@stable-canvas/sd-webui-a1111-prompt-parser";

const parser = new PromptParser();

const prompt1 = `masterpiece, 1girl, blonde hair, <lora:Zelda_v1:0.5>, (chromatic aberration:0.7), sharp focus, hyper detailed, (fog:0.7), <hypernet:sxz-bloom:0.5>, [real photo], [highlight:dark:0.9], (((good anatomy)))`;

const output = parser.parse(prompt1);
```

output
```
[{"type":"token","value":"masterpiece"},{"type":"token","value":"1girl"},{"type":"token","value":"blonde hair"},{"type":"extra_networks","value":"lora","args":["Zelda_v1","0.5"]},{"type":"weighted","value":"chromatic aberration","args":"0.7"},{"type":"token","value":"sharp focus"},{"type":"token","value":"hyper detailed"},{"type":"weighted","value":"fog","args":"0.7"},{"type":"extra_networks","value":"hypernet","args":["sxz-bloom","0.5"]},{"type":"negative","value":"real photo","args":[1]},{"type":"scheduled_from","value":"0.9","args":{"from":[{"type":"token","value":"highlight"}],"to":[{"type":"token","value":"dark"}]}},{"type":"positive","value":"good anatomy","args":[3]}]
```

# build

## 1. build parser

### 1.1 install lark.js
```
pip install lark-js
```

### 1.2 build
```
lark-js prompt_grammar.lark -o ./src/prompt_parser.js
```

> NOTE: two options values need to be cleared manually (`strict` & `ordered_sets`)

## 2. build package
```
pnpm build
```

# LICENSE
MIT
