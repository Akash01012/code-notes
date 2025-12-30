import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: "./public/src/main.jsx",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true
  },

  devServer: {
  port: 3000,
  historyApiFallback: true,
  proxy: [
    {
      context: ["/api"],
      target: "http://localhost:8000",
      changeOrigin: true
    }
  ]
},

  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },

  resolve: {
    extensions: [".js", ".jsx"]
  }
};
