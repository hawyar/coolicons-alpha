const { file, token } = require('../util/resources');

//path.join(base, "/files", resource.file, "?depth=1"

var axios = require('axios');

var config = {
  method: 'get',
  url: `https://api.figma.com/v1/files/${file}/nodes?ids=0%3A1`,
  headers: {
    'X-FIGMA-TOKEN': ` ${token}`,
  },
};
async function getFiles() {
  const figma = await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  return figma;
}

module.exports = {
  getFiles,
};
