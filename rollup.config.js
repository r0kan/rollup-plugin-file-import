const babel = require('rollup-plugin-babel');
const pkg = require('./package.json');

const external = Object.keys(pkg.peerDependencies).concat(['path', 'fs']);

export default {
  input: 'src/index.ts',
  external,
  plugins: [
    babel({
      extensions: ['.ts'],
    }),
  ],
  output: [
    {
      format: 'cjs',
      file: 'dist/index.cjs.js',
    },
    {
      format: 'es',
      file: 'dist/index.es.js',
    }
  ],
};
