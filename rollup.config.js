import resolve from 'rollup-plugin-node-resolve' // 处理第三方引入的模块
import babel from 'rollup-plugin-babel' // .js文件编译为es2015
import commonjs from 'rollup-plugin-commonjs' // 转化为commonjs规范
import { terser } from 'rollup-plugin-terser' // 压缩
// import esbuild from 'rollup-plugin-esbuild' // es压缩
const buildFileOptions = {
  input: 'src/core/index.js',
  output: {
    file: 'lib/index.js',
    name: 'hundun-request',
    format: 'es',
  },
  plugins: [
    commonjs(),
    resolve(),
    terser(),
    babel({
      exclude: 'node_modules/**',
    }),
    // esbuild({
    //   minify: true,
    // }),
  ],
  external: ['axios'],
}
export default buildFileOptions
