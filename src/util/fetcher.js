const { file, token } = require('../util/resources');
const axios = require('axios');

async function getFiles() {
  const config = {
    method: 'get',
    url: `https://api.figma.com/v1/files/${file}/nodes?ids=0%3A1`,
    headers: {
      'X-FIGMA-TOKEN': ` ${token}`,
    },
  };
  const figma = await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  return figma;
}

async function getImage(fileID, nodeID) {
  const config = {
    method: 'get',
    url: `https://api.figma.com/v1/images/${fileID}?ids=${nodeID}&format=svg`,
    headers: {
      'X-FIGMA-TOKEN': ` ${token}`,
    },
  };
  await axios(config).then((icon) => {
    return icon.data;
  });

  return;
}
// getImage(file, '167:0');

module.exports = {
  getFiles,
  getImage,
};
