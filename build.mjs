import { copyFileSync, mkdirSync, writeFileSync } from "node:fs";

const keys = [
  "FIREBASE_API_KEY",
  "FIREBASE_AUTH_DOMAIN",
  "FIREBASE_PROJECT_ID",
  "FIREBASE_STORAGE_BUCKET",
  "FIREBASE_MESSAGING_SENDER_ID",
  "FIREBASE_APP_ID",
  "FIREBASE_MEASUREMENT_ID",
];

const env = {};
for (const k of keys) {
  env[k] = process.env[k] || "";
}

mkdirSync("dist", { recursive: true });
copyFileSync("index29.html", "dist/index.html");
copyFileSync("index29.html", "dist/index29.html");
writeFileSync(
  "dist/env.js",
  `window.__ENV__ = ${JSON.stringify(env, null, 2)};\n`,
  "utf8"
);

console.log("Build complete: dist/index.html, dist/index29.html, dist/env.js");
