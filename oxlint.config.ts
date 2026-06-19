import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["react"],
  ignorePatterns: ["**/routeTree.gen.ts", "dist/"],
  options: {
    typeAware: true,
  },
  rules: {
    "react/react-compiler": "error",
  },
});
