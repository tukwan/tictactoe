import { defineConfig } from "cypress"

export default defineConfig({
  video: false,
  e2e: {
    // eslint-disable-next-line
    setupNodeEvents(_on, _config) {},
  },
})
