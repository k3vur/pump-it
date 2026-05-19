import { defineConfig } from "oxfmt";

export default defineConfig({
  ignorePatterns: ["**/routeTree.gen.ts", "dist/"],
  sortImports: true,
  sortTailwindcss: {
    functions: ["clsx"],
    stylesheet: "./src/styles.css",
  },
  sortPackageJson: true,
});
