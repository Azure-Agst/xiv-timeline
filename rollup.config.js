import { nodeResolve } from "@rollup/plugin-node-resolve";
import livereload from "rollup-plugin-livereload";
import json from "@rollup/plugin-json";

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
    livereload({
      watch: "public",
    }),
  ],
};
