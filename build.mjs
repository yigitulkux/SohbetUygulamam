import { copyFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";

const keys = [
  "FIREBASE_API_KEY",
  "FIREBASE_AUTH_DOMAIN",
  "FIREBASE_PROJECT_ID",
  "FIREBASE_STORAGE_BUCKET",
  "FIREBASE_MESSAGING_SENDER_ID",
  "FIREBASE_APP_ID",
  "FIREBASE_MEASUREMENT_ID",
];

mkdirSync("dist", { recursive: true });
copyFileSync("index.html", "dist/index.html");

const clean = (v) => String(v || "").trim().replace(/^["']|["']$/g, "");

if (clean(process.env.FIREBASE_API_KEY)) {
  const env = {};
  for (const k of keys) {
    env[k] = clean(process.env[k]);
  }
  writeFileSync(
    "dist/env.js",
    `window.__ENV__ = ${JSON.stringify(env, null, 2)};\n`,
    "utf8"
  );
  console.log("Build complete: dist/index.html + dist/env.js (from env vars)");
} else if (existsSync("env.js")) {
  copyFileSync("env.js", "dist/env.js");
  console.log("Build complete: dist/index.html + dist/env.js (copied env.js)");
} else {
  const env = Object.fromEntries(keys.map((k) => [k, ""]));
  writeFileSync(
    "dist/env.js",
    `window.__ENV__ = ${JSON.stringify(env, null, 2)};\n`,
    "utf8"
  );
  console.log("Build complete: dist/index.html + dist/env.js (empty fallback)");
}
