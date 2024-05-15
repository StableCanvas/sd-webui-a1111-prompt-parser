import { PromptParser, generation_str } from "../src/main";

let parser!: PromptParser;

describe("PromptParser", () => {
  beforeAll(() => {
    parser = new PromptParser();
  });

  test("parse simple example1", () => {
    const prompt1 = `masterpiece, 1girl, blonde hair, <lora:Zelda_v1:0.5>, (chromatic aberration:0.7), sharp focus, hyper detailed, (fog:0.7), <hypernet:sxz-bloom:0.5>, [real photo], [highlight:dark:0.9], (((good anatomy)))`;
    const expect_nodes = [
      {
        type: "plain",
        value: "masterpiece",
      },
      {
        type: "plain",
        value: "1girl",
      },
      {
        type: "plain",
        value: "blonde hair",
      },
      {
        type: "extra_networks",
        value: "lora",
        args: ["Zelda_v1", "0.5"],
      },
      {
        type: "weighted",
        value: 0.7,
        args: [
          {
            type: "plain",
            value: "chromatic aberration",
          },
        ],
      },
      {
        type: "plain",
        value: "sharp focus",
      },
      {
        type: "plain",
        value: "hyper detailed",
      },
      {
        type: "weighted",
        value: 0.7,
        args: [
          {
            type: "plain",
            value: "fog",
          },
        ],
      },
      {
        type: "extra_networks",
        value: "hypernet",
        args: ["sxz-bloom", "0.5"],
      },
      {
        type: "negative",
        value: 1,
        args: [
          {
            type: "plain",
            value: "real photo",
          },
        ],
      },
      {
        type: "scheduled_full",
        value: 0.9,
        args: [
          [
            {
              type: "plain",
              value: "highlight",
            },
          ],
          [
            {
              type: "plain",
              value: "dark",
            },
          ],
        ],
      },
      {
        type: "positive",
        value: 3,
        args: [
          {
            type: "plain",
            value: "good anatomy",
          },
        ],
      },
    ];

    const tokens = parser.parse(prompt1);
    expect(tokens).toEqual(expect_nodes);

    const generation_result = generation_str(tokens);
    const tokens2 = parser.parse(generation_result);

    expect(tokens2).toEqual(tokens);
  });

  test("should support multiple lora", () => {
    const prompt1 = `<lora:detailed_eye:0.5>, <lora:LORA MODEL:0.2>, kpop, asian 18 years old girl with pony hair, sbg, breast grab, breast lift, nipples, <lora:SelfBreastGrab:0.8>, couple, hetero, nude girl standing behind girl, make up, <lora:aiKorea_sd15:1>`;
    const expect_nodes = [
      {
        type: "extra_networks",
        value: "lora",
        args: ["detailed_eye", "0.5"],
      },
      {
        type: "extra_networks",
        value: "lora",
        args: ["LORA MODEL", "0.2"],
      },
      {
        type: "plain",
        value: "kpop",
      },
      {
        type: "plain",
        value: "asian 18 years old girl with pony hair",
      },
      {
        type: "plain",
        value: "sbg",
      },
      {
        type: "plain",
        value: "breast grab",
      },
      {
        type: "plain",
        value: "breast lift",
      },
      {
        type: "plain",
        value: "nipples",
      },
      {
        type: "extra_networks",
        value: "lora",
        args: ["SelfBreastGrab", "0.8"],
      },
      {
        type: "plain",
        value: "couple",
      },
      {
        type: "plain",
        value: "hetero",
      },
      {
        type: "plain",
        value: "nude girl standing behind girl",
      },
      {
        type: "plain",
        value: "make up",
      },
      {
        type: "extra_networks",
        value: "lora",
        args: ["aiKorea_sd15", "1"],
      },
    ];

    const tokens = parser.parse(prompt1);
    expect(tokens).toEqual(expect_nodes);

    const generation_result = generation_str(tokens);
    const tokens2 = parser.parse(generation_result);

    expect(tokens2).toEqual(tokens);
  });

  test('should support ":" char in prompt', () => {
    const promp1 = `(best quality, highest quality), 1girl, mature, (((hair over eyes, short pink and black hair, bob cut, wavy hair, curly hair, multicolor hair))), looking at viewer, (((turtleneck, oversized hoodie, shorts, sleeves_past_fingers, ong_sleeves, sleeves_past_wrists, fake animal ears, zipper_pull_tab, zipper))), (((cyberpunk))), rating:safe, solo, black eyes, cyber eyes, eye protesys, ((flat chest)), black background,  <lora:CyberPunkAI:1>, <lora:hair_over_eyes:1>, <lora:style:0.7> ,<lora:holographic-v1.0:0.7>`;
    const expect_nodes = [
      {
        type: "positive",
        value: 1,
        args: [
          {
            type: "plain",
            value: "best quality",
          },
          {
            type: "plain",
            value: "highest quality",
          },
        ],
      },
      {
        type: "plain",
        value: "1girl",
      },
      {
        type: "plain",
        value: "mature",
      },
      {
        type: "positive",
        value: 3,
        args: [
          {
            type: "plain",
            value: "hair over eyes",
          },
          {
            type: "plain",
            value: "short pink and black hair",
          },
          {
            type: "plain",
            value: "bob cut",
          },
          {
            type: "plain",
            value: "wavy hair",
          },
          {
            type: "plain",
            value: "curly hair",
          },
          {
            type: "plain",
            value: "multicolor hair",
          },
        ],
      },
      {
        type: "plain",
        value: "looking at viewer",
      },
      {
        type: "positive",
        value: 3,
        args: [
          {
            type: "plain",
            value: "turtleneck",
          },
          {
            type: "plain",
            value: "oversized hoodie",
          },
          {
            type: "plain",
            value: "shorts",
          },
          {
            type: "plain",
            value: "sleeves_past_fingers",
          },
          {
            type: "plain",
            value: "ong_sleeves",
          },
          {
            type: "plain",
            value: "sleeves_past_wrists",
          },
          {
            type: "plain",
            value: "fake animal ears",
          },
          {
            type: "plain",
            value: "zipper_pull_tab",
          },
          {
            type: "plain",
            value: "zipper",
          },
        ],
      },
      {
        type: "positive",
        value: 3,
        args: [
          {
            type: "plain",
            value: "cyberpunk",
          },
        ],
      },
      {
        type: "plain",
        value: "rating:safe",
      },
      {
        type: "plain",
        value: "solo",
      },
      {
        type: "plain",
        value: "black eyes",
      },
      {
        type: "plain",
        value: "cyber eyes",
      },
      {
        type: "plain",
        value: "eye protesys",
      },
      {
        type: "positive",
        value: 2,
        args: [
          {
            type: "plain",
            value: "flat chest",
          },
        ],
      },
      {
        type: "plain",
        value: "black background",
      },
      {
        type: "extra_networks",
        value: "lora",
        args: ["CyberPunkAI", "1"],
      },
      {
        type: "extra_networks",
        value: "lora",
        args: ["hair_over_eyes", "1"],
      },
      {
        type: "extra_networks",
        value: "lora",
        args: ["style", "0.7"],
      },
      {
        type: "extra_networks",
        value: "lora",
        args: ["holographic-v1.0", "0.7"],
      },
    ];

    const tokens = parser.parse(promp1);
    expect(tokens).toEqual(expect_nodes);

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
