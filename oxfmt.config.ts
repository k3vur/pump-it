import { defineConfig } from "oxfmt";

export default defineConfig({
  ignorePatterns: ["**/routeTree.gen.ts", "dist/"],
  sortImports: true,
  sortTailwindcss: {
    functions: ["cva", "cn"],
    stylesheet: "./src/styles.css",
  },
  sortPackageJson: true,
});
