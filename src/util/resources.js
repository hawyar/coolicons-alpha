require('dotenv').config();

module.exports = {
  main_base: process.env.MAIN_BASE,
  img_base: process.env.IMAGE_BASE,
  file: process.env.FIGMA_FILE,
  token: process.env.FIGMA_TOKEN,
  entry: process.env.PAGE_ID,
};
