const { rollup } = require('rollup');
const { resolve } = require('path');
const { sync } = require('rimraf');
const filePlugin = require('../index.ts').default;

const entryDir = resolve(__dirname, 'entry');
const outputDir = resolve(__dirname, 'tmp');
const outputRollup = {
  format: 'es',
  file: `${outputDir}/chunks/output.js`,
};

describe('rollup-plugin-file', () => {
  it('should inline text files', async () => {
    const bundle = await rollup({
      input: resolve(entryDir, 'index.js'),
      plugins: [filePlugin()],
    });

    await bundle.write(outputRollup);
  });
});
