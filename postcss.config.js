module.exports = ({ file, options, env }) => ({
  plugins: {
    'autoprefixer': env === 'production' ? {
      "overrideBrowserslist": [
        "defaults",
        "not ie < 11",
        "last 2 versions",
        "> 1%",
        "iOS 7",
        "last 3 iOS versions"
      ]
    } : {},

    'cssnano': env === 'production' ? {
      zindex: false,
      reduceIdents: false
    } : false
  },

})