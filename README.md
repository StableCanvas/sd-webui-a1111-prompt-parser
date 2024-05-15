# sd-webui-a1111-prompt-parser
sd a1111 prompt parser for javascript.

# usage

```
pnpm add @stable-canvas/sd-webui-a1111-prompt-parser
```


```ts
import { PromptParser } from "@stable-canvas/sd-webui-a1111-prompt-parser";

const parser = new PromptParser();

const prompt1 = `masterpiece, 1girl, blonde hair, <lora:Zelda_v1:0.5>, (chromatic aberration:0.7), sharp focus, hyper detailed, (fog:0.7), <hypernet:sxz-bloom:0.5>, [real photo], [highlight:dark:0.9], (((good anatomy)))`;

const output = parser.parse(prompt1);
```

output
```
[{"type":"plain","value":"masterpiece"},{"type":"plain","value":"1girl"},{"type":"plain","value":"blonde hair"},{"type":"extra_networks","value":"lora","args":["Zelda_v1","0.5"]},{"type":"weighted","value":0.7,"args":[{"type":"plain","value":"chromatic aberration"}]},{"type":"plain","value":"sharp focus"},{"type":"plain","value":"hyper detailed"},{"type":"weighted","value":0.7,"args":[{"type":"plain","value":"fog"}]},{"type":"extra_networks","value":"hypernet","args":["sxz-bloom","0.5"]},{"type":"negative","value":1,"args":[{"type":"plain","value":"real photo"}]},{"type":"scheduled_full","value":0.9,"args":[[{"type":"plain","value":"highlight"}],[{"type":"plain","value":"dark"}]]},{"type":"positive","value":3,"args":[{"type":"plain","value":"good anatomy"}]}]
```

# build

## 1. build parser

### 1.1 install lark.js
```
pip install lark-js
```

### 1.2 build
```
pnpm build-lark
```

## 2. build package
```
pnpm build
```

# LICENSE
MIT
