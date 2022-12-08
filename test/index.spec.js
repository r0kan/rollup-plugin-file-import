const { rollup } = require('rollup');
const { existsSync, readFileSync } = require('fs');
const { resolve } = require('path');
const { sync } = require('rimraf');
const filePlugin = require('../');

const entryDir = resolve(__dirname, 'entry');

describe('rollup-plugin-file', () => {
  it('should emit files relative file (cjs)', async () => {
    const outputDir = resolve(__dirname, 'tmp/dist_as_file');

    const outputFileRollup = {
      format: 'cjs',
      file: `${outputDir}/output.js`,
    };

    const bundle = await rollup({
      input: resolve(entryDir, 'index.js'),
      plugins: [
        filePlugin([
          {
            outputDir: `${outputDir}/raster`,
            extensions: ['.png'],
          },
          {
            outputDir: `${outputDir}/vector`,
            extensions: ['.svg'],
          },
        ]),
      ],
    });

    await bundle.write(outputFileRollup);

    expect(existsSync(`${outputDir}/raster/chunk_image.png`)).toBe(true);
    expect(existsSync(`${outputDir}/raster/image.png`)).toBe(true);
    expect(existsSync(`${outputDir}/vector/image.svg`)).toBe(true);

    const outputCode = readFileSync(`${outputDir}/output.js`, { encoding: 'utf8' });

    expect(outputCode.indexOf("require('./raster/image.png')") !== -1).toBe(true);
    expect(outputCode.indexOf("require('./vector/image.svg')") !== -1).toBe(true);
    expect(outputCode.indexOf("require('./raster/chunk_image.png')") !== -1).toBe(true);
  });

  it('should emit files relative dir (es)', async () => {
    const outputDir = resolve(__dirname, 'tmp/dist_as_dir');

    const outputDirRollup = {
      format: 'es',
      dir: `${outputDir}`,
      entryFileNames: 'output.es.js',
      chunkFileNames: 'chunks/[name].js',
    };

    const bundle = await rollup({
      input: resolve(entryDir, 'index_async.js'),
      plugins: [
        filePlugin([
          {
            outputDir: `${outputDir}/raster`,
            extensions: ['.png'],
          },
          {
            outputDir: `${outputDir}/vector`,
            extensions: ['.svg'],
          },
        ]),
      ],
    });

    await bundle.write(outputDirRollup);

    expect(existsSync(`${outputDir}/raster/chunk_image.png`)).toBe(true);
    expect(existsSync(`${outputDir}/raster/image.png`)).toBe(true);
    expect(existsSync(`${outputDir}/vector/image.svg`)).toBe(true);

    const outputCode = readFileSync(`${outputDir}/output.es.js`, { encoding: 'utf8' });

    expect(outputCode.indexOf("import('./raster/image.png')") !== -1).toBe(true);
    expect(outputCode.indexOf("import('./vector/image.svg')") !== -1).toBe(true);
  });
});
