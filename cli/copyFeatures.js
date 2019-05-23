const fs = require('fs');
const path = require('path');
const glob = require('glob');


/**
 * Copies all '*.feature' files from the 'srcDir' directory to the 'dstDir'
 * directory, allowing for a transformation of the file basename on the way
 * using the 'modifyBasename()' function
 */
module.exports = function copyFeatures(srcDir, dstDir, modifyBasename = basename => basename) {
  glob.sync(path.join(srcDir, '*.feature')).forEach((featureSrcPath) => {
    const featureContent = fs.readFileSync(featureSrcPath, { encoding: 'utf-8' });
    const featureBasename = path.basename(featureSrcPath);
    const featurePath = path.join(dstDir, modifyBasename(featureBasename));
    fs.writeFileSync(featurePath, featureContent, { encoding: 'utf-8' });
  });
}
