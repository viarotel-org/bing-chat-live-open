import configs from "./configs.js";
import httpService from "./src/scripts/http.js";
import bingSerive from "./src/scripts/bing.js";

// 启动前端服务
// TODO http服务 mac下目前可能会出现停止服务后端口占用没有被释放的问题
httpService.init(configs);

// 启动必应服务
bingSerive.init(configs);
