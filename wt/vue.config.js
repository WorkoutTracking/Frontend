const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    name: "Workout Tracking",
    manifestOptions: {
      short_name: "WT",
      icons: [
        {
          "src": "img/besticons/android-launchericon-192-192.png",
          "sizes": "192x192",
          "type": "image/png",
          "purpose": "any"
        },
        {
          "src": "img/besticons/android-launchericon-192-192.png",
          "sizes": "192x192",
          "type": "image/png",
          "purpose": "maskable"
        },
        {
          "src": "img/besticons/android-launchericon-512-512.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "any"
        },
        {
          "src": "img/besticons/android-launchericon-512-512.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "maskable"
        }
      ]
    },
    themeColor: "#2D2B41",
    msTileColor: "#ffffff",
    display: "fullscreen",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "#2D2B41",
    iconPaths: {
      favicon32: 'img/besticons/favicon-32x32.png',
      favicon16: 'img/besticons/favicon-16x16.png',
      appleTouchIcon: 'img/besticons/apple-touch-icon-152x152.png',
      msTileImage: 'img/besticons/mstile-144x144.png'
    }
  }
})
