const standardJs = require('prettier-config-standard')
module.exports = {
  ...standardJs,
  // spaces are really crappy for accessibility: https://adamtuttle.codes/blog/2021/tabs-vs-spaces-its-an-accessibility-issue/
  useTabs: true
}
