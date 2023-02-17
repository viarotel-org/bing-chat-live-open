import { listen } from "bili-live-listener";

export default async (roomId, callback) => {
  const liveService = await listen(roomId, {
    // 成功登入房间回调函数
    onStartListen() {
      // console.log("---------------------------------------------------");
      // console.log("onStartListen");
      // console.log("---------------------------------------------------");
      console.log("进入直播间成功");
    },
    // 弹幕消息回调函数
    onDanmu(message) {
      // console.log("---------------------------------------------------");
      // console.log("onDanmu.message", JSON.stringify(message));
      // console.log("---------------------------------------------------");
      const { body } = message;
      callback(body);
    },
    // 高能榜人数变化时触发
    onRankCountChange(message) {
      // console.log("---------------------------------------------------");
      // console.log("onRankCountChange.message", JSON.stringify(message));
      // console.log("---------------------------------------------------");
    },
  });

  // 关闭连接
  liveService.close();
};