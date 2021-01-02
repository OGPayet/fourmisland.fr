/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'green': '#7c9473',
      'light-green': '#cfdac8',
      'grey': '#cdd0cb',
      'light-grey': '#e8eae6',
      'dark-blue': '#083b66',
    }),
    textColor: theme => ({
      ...theme('colors'),
      'green': '#7c9473',
      'light-green': '#cfdac8',
      'grey': '#cdd0cb',
      'light-grey': '#e8eae6',
      'dark-blue': '#083b66',
    }),
  },
  variants: {},
  plugins: [],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js'
    ]
  }
}
