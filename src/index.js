const svgr = require('@svgr/core').default;
const fetcher = require('./util/fetcher');
const fs = require('fs');

//TODO: get SVG names and id
// map each svg id to a request for its content
// generate SVG componenet
async function generateSVGS() {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await fetcher.getFiles().then((e) => {
        return e;
      });

      if (data.nodes['0:1'].document.type !== 'CANVAS' || !data) {
        reject('Unable to fetch figma content');
      }

      const IconCanvas = await data.nodes['0:1'].document;
      const content = IconCanvas.children.map((el) => {
        return el.type === 'FRAME';
      });

      resolve(content);
    } catch (e) {
      reject(e);
    }
  });
}

generateSVGS().then((data) => {
  fs.writeFile('./output.json', JSON.stringify(data), (err) => {
    if (err) {
      console.error(err);
    }
  });
});

// // this is equivalent to a page in figma

// data.nodes['0:1'].document.children[0].children.map((el) => {
//   console.log(el.name);
// });

// // for (const target of Object.entries(
// //   data.nodes['0:1'].document.children[0].children[0]
// // )) {
// //   console.log(target);
// // }
// return data;
