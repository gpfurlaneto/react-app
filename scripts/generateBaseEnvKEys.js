// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');

dotenv.config();

const apiBaseUrl = process.env.API_BASE_URL;
fs.writeFile(
  './src/lib/env.ts',
  `const env = {
  API_BASE_URL: '${apiBaseUrl || ''}',
};
export default env;
`,
  // eslint-disable-next-line consistent-return
  function callback(err) {
    if (err) {
      return console.log(err);
    }
    console.log('The file was saved!');
  },
);
