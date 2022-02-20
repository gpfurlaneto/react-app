const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

const apiBaseUrl = process.env.API_BASE_URL;
fs.writeFile(
  "./src/lib/env.ts",
  `const env = {
  API_BASE_URL: '${apiBaseUrl || ""}'
};
export default env
`,
  function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  }
);
