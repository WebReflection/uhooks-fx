import {nodeResolve} from '@rollup/plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';
import includePaths from 'rollup-plugin-includepaths';

export default {
  input: './esm/async.js',
  plugins: [
    includePaths({
      include: {
        '@webreflection/lie': 'node_modules/uhooks/esm/promise.js'
      }
    }),
    nodeResolve(),
    terser()
  ],
  output: {
    exports: 'named',
    file: './async.js',
    format: 'iife',
    name: 'uhooksFX'
  }
};
