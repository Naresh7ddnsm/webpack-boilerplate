/**
 * Webpack Config for Front-end development
 */

const localServer = {
  path: 'localhost/dist/',
  port: 3000
};

const path = require('path');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageMinPlugin = require('imagemin-webpack-plugin').default;
//const pugLoader = require('pug-loader');

const config = {
  entry: {
    app: './src/js/app.js',
  },
  output: {
    filename: 'assets/js/[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      },
	  {
		  test: /\.pug$/,
		  include: path.resolve(__dirname, "src"),
		  use: [{loader: 'pug-loader', options: {pretty: true, self: true}}],
	  },
      /*{
        test: /\.(png|gif|jpg|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            //options: { name: 'assets/images/design/[name].[hash:6].[ext]', publicPath: '../', limit: 8192 },
			options: { name: 'assets/images/design/[name].[ext]', publicPath: '../', limit: false },
          },
        ],
      },*/
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            //options: { name: 'assets/fonts/[name].[hash:6].[ext]', publicPath: '../', limit: 8192 },
            options: { name: 'assets/fonts/[name].[ext]', publicPath: '../../', limit: 8192 },
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
      new OptimizeCssAssetsPlugin({}),
    ],
  },
  plugins: [
	new BrowserSyncPlugin({
		host: "localhost",
		port: localServer.port,
		server: { baseDir: ['dist'] },
		files: [],
		ghostMode: {
			clicks: false,
			location: false,
			forms: false,
			scroll: false,
		},
		injectChanges: true,
		logFileChanges: true,
		logLevel: 'debug',
		logPrefix: 'wepback',
		notify: true,
		reloadDelay: 0,
    }),
    /*new BrowserSyncPlugin({
		host: "localhost",
		proxy: localServer.path,
		port: localServer.port,
		files: [],
		ghostMode: {
			clicks: false,
			location: false,
			forms: false,
			scroll: false,
		},
		injectChanges: true,
		logFileChanges: true,
		logLevel: 'debug',
		logPrefix: 'wepback',
		notify: true,
		reloadDelay: 0,
    }),
    new HtmlWebpackPlugin({
      inject: true,
      hash: false,
      filename: 'index.html',
      template: path.resolve(__dirname, 'src', 'index.html'),
      favicon: path.resolve(__dirname, 'src', 'images', 'favicon.ico'),
    }),*/
	new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src', 'index.pug'),
	  inject: false,
    }),
	new HtmlWebpackPlugin({
      filename: '/pages/about.html',
      template: path.resolve(__dirname, 'src', 'pages/about.pug'),
	  inject: false,
    }),
    new MiniCssExtractPlugin({
		filename: 'assets/css/[name].css',
    }),
    new ImageMinPlugin({ test: /\.(jpg|jpeg|png|gif|svg)$/i }),
    new CleanWebpackPlugin({
      /**
       * Some plugins used do not correctly save to webpack's asset list.
       * Disable automatic asset cleaning until resolved
       */
      cleanStaleWebpackAssets: false,
      // Alternative:
      // cleanAfterEveryBuildPatterns: [
      // copy-webpackPlugin:
      //   '!images/content/**/*',
      // url-loader fonts:
      //   '!**/*.+(eot|svg|ttf|woff|woff2)',
      // url-loader images:
      //   '!**/*.+(jpg|jpeg|png|gif|svg)',
      // ],
      verbose: true,
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src', 'images', 'content'),
        to: path.resolve(__dirname, 'dist', 'assets/images', 'content'),
        toType: 'dir',
      },
	  {
        from: path.resolve(__dirname, 'src', 'images', 'design'),
        to: path.resolve(__dirname, 'dist', 'assets/images', 'design'),
        toType: 'dir',
      },
    ]),
  ],
};

module.exports = config;
