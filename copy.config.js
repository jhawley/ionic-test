var fs = require('fs-extra');
console.log("Beginning custom copy commands...");
fs.copy('node_modules/leaflet/dist/leaflet.css','www/build/leaflet.css');
fs.copy('node_modules/leaflet/dist/images/marker-icon.png','www/build/images/marker-icon.png');
fs.copy('node_modules/leaflet/dist/images/marker-icon-2x.png','www/build/images/marker-icon-2x.png');
fs.copy('node_modules/leaflet/dist/images/marker-shadow.png','www/build/images/marker-shadow.png');
fs.copy('node_modules/leaflet/dist/images/layers.png','www/build/images/layers.png');
fs.copy('node_modules/leaflet/dist/images/layers-2x.png','www/build/images/layers-2x.png');
console.log("Custom copy command complete.");