const fetch = require('node-fetch');
const { token } = require('../config/reources');
export async function getPages(url) {
  const config = {
    method: 'GET',
    headers: {
      'X_FIGMA-Token': token,
    },
  };
  await fetch(url, config).then((data) => {
    console.log(data);
    return data.json();
  });
}

//path.join(base, "/files", resource.file, "?depth=1"
