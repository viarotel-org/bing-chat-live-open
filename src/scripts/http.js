import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import portfinder from "portfinder";

export default {
  init(configs) {
    const indexFilePath = path.join(process.cwd(), "index.html"); //你本地放index.html页面的文件路径
    // console.log("indexFilePath", indexFilePath);

    // console.log("http", http);
    const server = http.createServer((req, res) => {
      fs.readFile(indexFilePath, (err, data) => {
        if (err) {
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.write("File not found");
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.write(data);
        }
        res.end();
      });
    });

    // 设置端口号
    // console.log("portfinder", portfinder);
    portfinder.setBasePort(configs.listen);
    portfinder.getPort((err, port) => {
      // 如果出错，打印错误信息
      if (err) {
        console.error(err);
        return;
      }

      console.log(`前端服务启动成功: http://localhost:${port}`);
      // 如果成功，启动服务器
      server.listen(port, () => {
        console.log("Server listening on port " + port);
      });
    });
  },
};
