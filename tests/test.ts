// very simple test to check if the library is working as expected

import { generation_token, PromptParser } from "../src/main";

const parser = new PromptParser();

const prompt1 = `masterpiece, 1girl, blonde hair, <lora:Zelda_v1:0.5>, (chromatic aberration:0.7), sharp focus, hyper detailed, (fog:0.7), <hypernet:sxz-bloom:0.5>, [real photo], [highlight:dark:0.9], (((good anatomy)))`;
const tokens = parser.parse(prompt1);

// console.log("tokens: ", tokens);
console.log("tokens: ", JSON.stringify(tokens));

const generation_result = generation_token(tokens);
const generation_str = generation_result.join(", ");

// console.log("generation_result: ", generation_result);
// console.log("input__str: ", prompt1);
// console.log("output_str: ", generation_str);

const is_expected = prompt1 === generation_str;

if (!is_expected) {
  throw new Error("Generation failed");
}

console.log("====");
console.log("Test passed");
console.log("====");
