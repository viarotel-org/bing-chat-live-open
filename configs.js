export default {
  // 必填
  // bingAI的cookie(bing.com 中字段为"\_U"的值)
  token: "",
  // 主播房间id
  roomId: 27132379,

  // 以下为可选
  platform: "bilibili",
  // 前端服务端口号设置 注意mac下个别端口可能无法启动
  listen: 8080,
  prefix: "#",
  errorTips:
    "请注意: 可能由于使用测试方案或由于网络，限流，政策，其他等未知原因无法正常回答的，烦请谅解。",
  // 哔哩哔哩主播自己的用户id 设置后可以无视一些限制
  anchorUid: 274990176,
};
