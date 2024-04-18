// very simple test to check if the library is working as expected

import { generation_token, PromptParser } from "../src/main";

const parser = new PromptParser();

// const prompt1 = `masterpiece, 1girl, blonde hair, <lora:Zelda_v1:0.5>, (chromatic aberration:0.7), sharp focus, hyper detailed, (fog:0.7), <hypernet:sxz-bloom:0.5>, [real photo], [highlight:dark:0.9], (((good anatomy)))`;
// const prompt1 = `<lora:detailed_eye:0.5>, <lora:LORA MODEL:0.2>, kpop, asian 18 years old girl with pony hair, sbg, breast grab, breast lift, nipples, <lora:SelfBreastGrab:0.8>, couple, hetero, nude girl standing behind girl, make up, <lora:aiKorea_sd15:1>`;
const prompt1 = `(best quality, highest quality), 1girl, mature, (((hair over eyes, short pink and black hair, bob cut, wavy hair, curly hair, multicolor hair))), looking at viewer, (((turtleneck, oversized hoodie, shorts, sleeves_past_fingers, ong_sleeves, sleeves_past_wrists, fake animal ears, zipper_pull_tab, zipper))), (((cyberpunk))), rating:safe, solo, black eyes, cyber eyes, eye protesys, ((flat chest)), black background,  <lora:CyberPunkAI:1>, <lora:hair_over_eyes:1>, <lora:style:0.7> ,<lora:holographic-v1.0:0.7>`;
const tokens = parser.parse(prompt1);

// console.log("tokens: ", tokens);
console.log("tokens: ", JSON.stringify(tokens));

const generation_result = generation_token(tokens);
const generation_str = generation_result.join(", ");

console.log("generation_result: ", generation_result);
console.log("input__str: ", prompt1);
console.log("output_str: ", generation_str);

const is_expected = prompt1 === generation_str;

if (!is_expected) {
  throw new Error("Generation failed");
}

console.log("====");
console.log("Test passed");
console.log("====");
