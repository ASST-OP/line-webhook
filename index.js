import http from "http";

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.end("Only POST allowed");
    return;
  }

  let body = "";
  req.on("data", chunk => {
    body += chunk;
  });

  req.on("end", () => {
    try {
      const json = JSON.parse(body);
      console.log("LINE Webhook:", JSON.stringify(json, null, 2));
      res.statusCode = 200;
      res.end("OK");
    } catch {
      res.statusCode = 400;
      res.end("Invalid JSON");
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
