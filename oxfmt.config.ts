import { defineConfig } from "oxfmt";

export default defineConfig({
  ignorePatterns: ["src/routeTree.gen.ts", "dist/"],
  sortImports: true,
  sortTailwindcss: {
    functions: ["clsx"],
    stylesheet: "./src/styles.css",
  },
  sortPackageJson: true,
});
