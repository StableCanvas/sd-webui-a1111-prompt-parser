import { PromptParser, generation_str } from "../src/main";

let parser!: PromptParser;

describe("PromptParser", () => {
  beforeAll(() => {
    parser = new PromptParser();
  });

  test("parse simple example1", () => {
    const prompt1 = `masterpiece, 1girl, blonde hair, <lora:Zelda_v1:0.5>, (chromatic aberration:0.7), sharp focus, hyper detailed, (fog:0.7), <hypernet:sxz-bloom:0.5>, [real photo], [highlight:dark:0.9], (((good anatomy)))`;
    const tokens = parser.parse(prompt1);
    const generation_result = generation_str(tokens);
    const tokens2 = parser.parse(generation_result);

    expect(tokens2).toEqual(tokens);
  });

  test("should support multiple lora", () => {
    const prompt1 = `<lora:detailed_eye:0.5>, <lora:LORA MODEL:0.2>, kpop, asian 18 years old girl with pony hair, sbg, breast grab, breast lift, nipples, <lora:SelfBreastGrab:0.8>, couple, hetero, nude girl standing behind girl, make up, <lora:aiKorea_sd15:1>`;
    const tokens = parser.parse(prompt1);
    const generation_result = generation_str(tokens);
    const tokens2 = parser.parse(generation_result);

    expect(tokens2).toEqual(tokens);
  });

  test('should support ":" char in prompt', () => {
    const promp1 = `(best quality, highest quality), 1girl, mature, (((hair over eyes, short pink and black hair, bob cut, wavy hair, curly hair, multicolor hair))), looking at viewer, (((turtleneck, oversized hoodie, shorts, sleeves_past_fingers, ong_sleeves, sleeves_past_wrists, fake animal ears, zipper_pull_tab, zipper))), (((cyberpunk))), rating:safe, solo, black eyes, cyber eyes, eye protesys, ((flat chest)), black background,  <lora:CyberPunkAI:1>, <lora:hair_over_eyes:1>, <lora:style:0.7> ,<lora:holographic-v1.0:0.7>`;
    const tokens = parser.parse(promp1);
    const generation_result = generation_str(tokens);
    const tokens2 = parser.parse(generation_result);

    expect(tokens2).toEqual(tokens);
  });

  test("when wrong prompt should throw error", () => {
    const prompt1 = `1girl, (((((`;
    expect(() => parser.parse(prompt1)).toThrow();
  });

  test("when enable parser.force to parse wrong prompt should not throw error", () => {
    const prompt1 = `1girl, (((((`;
    const tokens = parser.parse(prompt1, {
      force: true,
    });
    expect(tokens).toEqual([
      {
        type: "plain",
        value: "1girl",
      },
    ]);
  });
});
