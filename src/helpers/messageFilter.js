import MintFilter from "mint-filter";

const keywords = [
  "新闻",
  "时政",
  "政治",
  "啪啪啪",
  "床",
  "习近平",
  "习大大",
  "习总书记",
  "共产",
  "推倒",
  "黑社会",
  "vpn",
  "梯子",
  "体制",
  "翻墙",
  "国际互联网",
  "外网",
  "天气",
];

export default {
  async init(content) {
    // @ts-ignore
    const Mint = MintFilter.default;

    const mint = new Mint(keywords);

    return mint.filter(content);
  },
};
