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
      console.log("Received from LINE:", JSON.stringify(json, null, 2));

      // 受け取ったJSONをそのまま返す
      res.setHeader("Content-Type", "application/json");
      res.statusCode = 200;
      res.end(JSON.stringify(json));

    } catch (err) {
      console.error("Invalid JSON:", err);
      res.statusCode = 400;
      res.end("Invalid JSON");
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
