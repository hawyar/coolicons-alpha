import axios from 'axios';
require('dotenv').config();

const file = process.env.FILE_ID;
const token = process.env.FIGMA_TOKEN;

async function getFiles() {
  const config = {
    method: 'get',
    url: `https://api.figma.com/v1/files/${file}/nodes?ids=0%3A1`,
    headers: {
      'X-FIGMA-TOKEN': ` ${token}`,
    },
  };
  const figma = await axios(config)
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  return figma;
}

async function getImage(nodeID) {
  const config = {
    method: 'get',
    url: `https://api.figma.com/v1/images/${file}?ids=${nodeID}&format=svg`,
    headers: {
      'X-FIGMA-TOKEN': ` ${token}`,
    },
  };
  const data = await axios(config).then((icon) => {
    return icon.data;
  });

  return data;
}

export { getFiles, getImage };
