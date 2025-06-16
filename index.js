import http from "http";
import https from "https";

const PORT = 3000;
const TOKEN = JeeBrQwszq7062n3fzh5mG6PzPufu2cpkN1r/5F3oBrN/pEkyX/NIEPs/I1JCM4P3USwsEEttZYKecJT/RaHxFf+dBXX95zIWeKLUP9OGsukLySMuuCBUrWM0SqpuUu+FBZOPt6wXcVMiswdZIePmwdB04t89/1O/w1cDnyilFU=;

const server = http.createServer((req, res) => {
  if (req.method !== "POST" || req.url !== "/webhook") {
    res.statusCode = 404;
    res.end("Not found");
    return;
  }

  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    try {
      const json = JSON.parse(body);
      res.statusCode = 200;
      res.end("OK");

      const event = json.events && json.events[0];
      if (!event) return;

      if (event.type === "message" && event.message.type === "contact") {
        const contactInfo = event.message;
        const replyText = JSON.stringify(contactInfo, null, 2);

        const dataString = JSON.stringify({
          replyToken: event.replyToken,
          messages: [
            {
              type: "text",
              text: replyText,
            },
          ],
        });

        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        };

        const options = {
          hostname: "api.line.me",
          path: "/v2/bot/message/reply",
          method: "POST",
          headers,
        };

        const request = https.request(options, (response) => {
          response.on("data", (d) => {
            process.stdout.write(d);
          });
        });

        request.on("error", (err) => {
          console.error(err);
        });

        request.write(dataString);
        request.end();
      }
    } catch (e) {
      res.statusCode = 400;
      res.end("Invalid JSON");
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
