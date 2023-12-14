import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react-swc"
import { VitePWA } from "vite-plugin-pwa"
// import eslint from "@rollup/plugin-eslint"

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), "")
  return {
    // vite config
    define: {
      __APP_ENV__: env.APP_ENV,
    },
    plugins: [
      react(),
      VitePWA({
        registerType: "autoUpdate",
        injectRegister: "auto",
        // devOptions: {
        //   enabled: true,
        // },
        includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
        manifest: {
          name: "Zero Farming",
          short_name: "ZFARMING",
          description:
            "Somos una solución integral que fusiona Industria 4.0, IoT y agricultura urbana para transformar la seguridad alimentaria con eficiencia y sostenibilidad.",
          theme_color: "#ffffff",
          icons: [
            {
              src: "icon/ios/192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "icon/ios/512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
            {
              src: "icon/ios/512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any",
            },
            {
              src: "icon/ios/512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "maskable",
            },
          ],
        },
        workbox: {
          clientsClaim: true,
          skipWaiting: true,
          globPatterns: ['**/*.{js,css,html,ico,png,svg}']
        },
      }),
      // eslint({
      //   /* your options */
      // }),
    ],
  }
})
