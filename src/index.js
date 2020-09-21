const svgr = require('@svgr/core').default;
const fetcher = require('./util/fetcher');
const chalk = require('chalk');
const fs = require('fs');
//TODO: get SVG names and id
// map each svg id to a request for its content
// generate SVG componenet
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

function traverse(o, fn) {
  for (var i in o) {
    fn.apply(this, [i, o[i]]);
    if (o[i] !== null && typeof o[i] == 'object') {
      traverse(o[i], fn);
    }
  }
}

function mapNodes() {
  // here data looks like this
  // {
  //   id: "228: 833",
  //   name: "Arrow",
  //   type: "FRAME",
  //   ...,
  //   children: [ ...icons]
  // }
  getNodes().then((frame) => {
    console.log(
      `${chalk.green.bold(`Success`)}: Fetched ${frame.length} frames\n`
    );
    const icons = frame.map((node) => {
      console.log(`${chalk.bold(node.name)} - ${node.children.length} icons`);
      return node.children.map((icon) => {
        console.log(`${icon.name} - ${icon.id}`);
      });
    });
    fs.writeFile('./output.json', JSON.stringify(icons), (err) => {
      if (err) {
        console.error(err);
      }
    });
  });
}

mapNodes();

// function mapNodes() {
//   //   // here data looks like this
//   //   // {
//   //   //   id: "228: 833",
//   //   //   name: "Arrow",
//   //   //   type: "FRAME",
//   //   //   ...,
//   //   //   children: [ ...icons]
//   //   // }
//   //   getNodes().then((data) => {
//   //     console.log();
//   //     // data.map((node) => {
//   //     //   console.log(node);
//   //     //   // traverse(node, (key, val) => {
//   //     //   //   console.log(key + ' ' + val);
//   //     //   //   fs.writeFile('./output.json', JSON.stringify({ key, val }), (err) => {
//   //     //   //     if (err) {
//   //     //   //       console.error(err);
//   //     //   //     }
//   //     //   //   });
//   //     //   // });
//   //     // });
//   //   });
//   // }

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
