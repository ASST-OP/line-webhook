import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const handler = async (req: Request): Promise<Response> => {
  if (req.method !== "POST") {
    return new Response("Only POST allowed", { status: 405 });
  }

  const body = await req.text();
  const json = JSON.parse(body);
  console.log("LINE Webhook:", JSON.stringify(json, null, 2));

  return new Response("OK", { status: 200 });
};

serve(handler);
