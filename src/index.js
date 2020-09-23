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
        reject('Unable to fetch content');
      }

      const IconCanvas = await data.nodes['0:1'].document;

      // remove non FRAME nodes
      const content = IconCanvas.children.filter((el) => {
        return el.type === 'FRAME';
      });

      if (!content) {
        reject('Unable to fetch content');
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
  return new Promise((resolve, reject) => {
    try {
      getNodes().then((frame) => {
        console.log(
          `${chalk.green.bold(`Success`)}: Fetched ${frame.length} frames\n`
        );
        const icons = frame.map((node) => {
          console.log(
            `${chalk.bold(node.name)} - ${node.children.length} icons`
          );
          const meta = node.children.map((el) => {
            return {
              id: el.id,
              name: el.name.split('/')[1].trim(),
            };
          });
          return {
            category: node.name,
            icons: [...meta],
          };
        });
        if (!icons) reject(`Unable to process icons name or id`);

        resolve(icons);

        const outputDir = 'figma';

        // this should be taken care of better to avoid version clashing with figma
        spicy.mkdirSync(outputDir);
        fs.writeFile(
          path.join(outputDir, `/iconsOutput.json`),
          JSON.stringify(icons),
          (err) => {
            if (err) {
              console.error(err);
            }
          }
        );
      });
    } catch (e) {
      reject(e);
    }
  });
}

mapNodes();
