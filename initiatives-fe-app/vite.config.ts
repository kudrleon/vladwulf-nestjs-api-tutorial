import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"

const FE_PORT = process.env.FE_PORT;
const port = FE_PORT !== 'undefined' && FE_PORT !== '' ? parseInt(process.env.FE_PORT) : 3000;
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: false,
    host: true,
    port
  },
  preview: {
      host: true,
      port
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests",
    mockReset: true,
  },
})
