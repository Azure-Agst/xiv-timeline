import { nodeResolve } from "@rollup/plugin-node-resolve";
import livereload from "rollup-plugin-livereload";
import json from "@rollup/plugin-json";

const isProd = process.env.BUILD_ENV === "prod";

export default {
  input: "src/index.js",
  output: {
    file: "public/bundle.js",
    name: "xivtimeline",
    format: "iife",
    sourcemap: true,
  },
  plugins: [
    nodeResolve(),
    json(),
    !isProd &&
      livereload({
        watch: "public",
      }),
  ],
};
