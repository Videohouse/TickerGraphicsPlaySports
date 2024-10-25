import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    publicDir: env.VITE_PUBLIC_DIR.toString(),
    base: "",
    build: {
      minify: false,
      assetsDir: "js",
      emptyOutDir: true,
      rollupOptions: {
        input: "index.html",
        output: {
          dir: "dist/" + mode,
          entryFileNames: `js/[name].js`,
          chunkFileNames: `js/[name].js`,
          assetFileNames: `js/[name].[ext]`,
        },
      },
    },
  };
});
