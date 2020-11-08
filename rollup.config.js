import json from '@rollup/plugin-json';
import run from '@rollup/plugin-run';
export default {
  input: 'src/index.js',
  output: {
    file: './build/bundle.js',
    format: 'cjs',
  },
  plugins: [json(), run()],
};
