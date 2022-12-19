const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-sonarqube-reporter',
  reporterOptions: {
    outputDir: "cypress/reports",
    overwrite: true
  },
  e2e: {},
});
