const fs = require('fs');

const files = [
  './dist/language/en.json',
  './dist/language/uk.json',
];

files.forEach(path => {
  const json = fs.readFileSync(path);
  fs.writeFileSync(path, JSON.stringify(JSON.parse(json)));
});