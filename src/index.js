const svgr = require('@svgr/core').default;
const fetcher = require('./util/fetcher');
const chalk = require('chalk');
const fs = require('fs');
const spicy = require('spicymkdir');
const path = require('path');

async function getNodes() {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await fetcher.getFiles().then((e) => {
        return e;
      });

      if (data.nodes['0:1'].document.type !== 'CANVAS' || !data) {
        reject('Unable to fetch figma content');
      }

      const IconCanvas = await data.nodes['0:1'].document;

      // remove non FRAME nodes
      const content = IconCanvas.children.filter((el) => {
        return el.type === 'FRAME';
      });

      if (!content) {
        reject('Unable to fetch figma content');
      }
      resolve(content);
    } catch (e) {
      reject(e);
    }
  });
}

// function traverse(o, fn) {
//   for (var i in o) {
//     fn.apply(this, [i, o[i]]);
//     if (o[i] !== null && typeof o[i] == 'object') {
//       traverse(o[i], fn);
//     }
//   }
// }

function mapNodes() {
  getNodes().then((frame) => {
    console.log(
      `${chalk.green.bold(`Success`)}: Fetched ${frame.length} frames\n`
    );
    const icons = frame.map((node) => {
      console.log(`${chalk.bold(node.name)} - ${node.children.length} icons`);
      const meta = node.children.map((el) => {
        return {
          id: el.name,
          name: el.id,
        };
      });
      return {
        category: node.name,
        data: {
          ...meta,
        },
      };
    });

    const dirPath = 'figma/content';

    spicy.mkdirSync(dirPath);
    fs.writeFile(
      path.join(dirPath, `/${dirPath.split('/')[0]}.json`),
      JSON.stringify(icons),
      (err) => {
        if (err) {
          console.error(err);
        }
      }
    );
  });
}

mapNodes();
