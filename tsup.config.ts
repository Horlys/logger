import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  dts: true,
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  minify: "terser",
  outDir: "dist",
  sourcemap: true,
  splitting: false,
  treeshake: true,
});
