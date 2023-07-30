import { defineConfig } from "cypress"

export default defineConfig({
  video: false,
  e2e: {
    // eslint-disable-next-line
    setupNodeEvents(on, config) {},
  },
})
