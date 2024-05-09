// docs: https://github.dowjones.net/newsroom-innovation/capi-generator
const { CapiGenerator, Image } = require('capi-generator');

module.exports = async function () {
  const cg = new CapiGenerator();
  const image = new Image({
    photoUrl: 'https://s.wsj.net/public/resources/images/54b6b846-503f-4ab4-950a-292e2309925c-fallback_app.jpg?v=264632313',
    width: 600,
    height: 1358,
    alternate_text: '',
    credit: '',
    caption: '',
  });
  cg.addToBody(image);

  return cg;
};
