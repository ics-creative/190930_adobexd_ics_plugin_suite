const {VueLoaderPlugin} = require('vue-loader');

module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: 'development',

  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: './src/main.ts',
  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    path: `${__dirname}/dist`,
    // 出力ファイル名
    filename: 'main.js',
    // CommonJS として出力しなければならない
    libraryTarget: 'commonjs2',
  },

  // ソースマップはXD側で使えないので、無効にする
  devtool: 'none',

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          // CSSをバンドルするための機能
          {
            loader: 'css-loader',
            options: {
              // オプションでCSS内のurl()メソッドを取り込む
              url: true,
            },
          },

        ],
      },
      // .vue ファイルを取り込む
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        // 拡張子 .ts の場合
        test: /\.ts$/,
        // TypeScript をコンパイルする
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },

      {
        // 対象となるファイルの拡張子
        test: /\.(gif|png|jpg|eot|wof|woff|woff2|ttf|svg)$/,
        // 画像をBase64として取り込む
        loader: 'url-loader',
      },
    ],
  },
  // import 文で .ts ファイルを解決するため
  resolve: {
    // Webpackで利用するときの設定
    alias: {
      // エイリアスを失敗したら地獄を見る
    },
    extensions: [
      '.vue', '.ts', '.js', '.json',
    ],
  },

  // ランタイムで使用するXDパッケージ
  externals: {
    // webpack に実行時モジュールだと認識させる必要がある
    uxp: 'uxp',
    scenegraph: 'scenegraph',
    clipboard: 'clipboard',
    commands: 'commands',
    application: 'application',
  },

  plugins: [
    // Vueを読み込めるようにするため
    new VueLoaderPlugin(),
  ],
};
