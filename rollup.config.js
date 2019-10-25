// plugins
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');

const pkg = require('./package.json');

const external = Object.keys(pkg.peerDependencies).concat(['path', 'fs']);

const extensions = ['.js', '.ts'];

export default {
  input: 'src/index.ts',
  plugins: [
    resolve({ extensions: extensions }),
    babel({
      extensions: extensions,
      include: ['src/**/*'],
    }),
  ],
  output: [
    {
      format: 'cjs',
      file: pkg.main,
    },
    {
      format: 'es',
      file: pkg.module,
    },
  ],
  external,
};
