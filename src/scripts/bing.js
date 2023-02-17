import bilibili from "./bilibili.js";
import { BingAIClient } from "@waylaidwanderer/chatgpt-api";
import { isAnchor, messageLock, messageFilter } from "../helpers/index.js";
// import { throttle } from "lodash-es";
export default {
  init(configs) {
    const bingService = new BingAIClient({
      userToken: configs.token,
      debug: false,
    });

    let contextParams = {};
    let sendMessage = async (body) => {
      let {
        user: { uname, uid },
        content,
      } = body;

      if (!content.startsWith(configs.prefix)) return false;

      // console.log("uid", uid);
      // 如果不是主播本人则执行以下限制
      if (!isAnchor(uid)) {
        // 过滤敏感词
        const { pass } = await messageFilter.init(content);
        if (!pass) {
          console.log("请注意: 该条问题包含敏感词汇，已自动跳过。");
          return;
        }

        // console.log("messageLock", messageLock);
        // 校验消息锁以进行节流
        if (messageLock.get()) return false;
      }

      // 添加消息锁以进行节流
      messageLock.remove({ autoState: false });
      messageLock.set({
        delay: 30 * 1000,
        callback: () => {
          // contextParams = {};
          console.log(configs.errorTips);
        },
      });

      // 重置当前对话
      if (content.startsWith(`${configs.prefix}重置`)) {
        console.log("重置会话成功");
        contextParams = {};
        messageLock.remove();
        return false;
      }

      console.log(
        `-----------------------------------------------问题分割线---------------------------------------------------\n${uname} 提问:\n${content}\n\nBingChat 回答:`
      );

      try {
        const res = await bingService.sendMessage(content.slice(1), {
          ...contextParams,
          onProgress: (token) => {
            messageLock.remove({ autoState: false });
            messageLock.set({ delay: 10 * 1000 });

            process.stdout.write(token);
            // console.log("token", token);
          },
        });
        // console.log("res", JSON.stringify(res));

        contextParams = {
          conversationSignature: res.conversationSignature,
          conversationId: res.conversationId,
          clientId: res.clientId,
          invocationId: res.invocationId,
        };
      } catch {
        messageLock.remove();
        // contextParams = {};
        // console.log(configs.errorTips);
      }
    };

    bilibili(configs.roomId, sendMessage);

    // bilibili(configs.roomId, () => {});

    // @ts-ignore
    // sendMessage = throttle(sendMessage, 10 * 1000, {
    //   trailing: false,
    // });

    // sendMessage({
    //   user: {
    //     uname: "viarotel",
    //     uid: configs.anchorUid + 1,
    //   },
    //   content: "#体制",
    // });
  },
};
