const path  = require('path');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {
    console.log('env',env);
    const MiniCssExtractPlugin = require("mini-css-extract-plugin");
    

    const isProduction = env.production === true;

    return {
        mode : 'development',
        entry : './src/app.js',
        output : {
            path : path.join(__dirname, 'public'),
            filename : 'bundle.js' 
        },
        module : {
            rules : [
                {
                    loader : 'babel-loader',
                    test : /\.js$/,
                    exclude : /node_modules/
                },
                {
                    test : /\.s?css$/,
                    use: [MiniCssExtractPlugin.loader, 
                        {
                            loader : "css-loader",
                            options : {
                                sourceMap : true
                            }
                        },
                        {
                            loader : 'sass-loader',
                            options : {
                                sourceMap : true
                            }
                        }
                    ],
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({ 
                filename: 'styles.css'
            })
        ],
        'devtool' : isProduction ? 'source-map' : 'inline-source-map',
        'devServer' : {
            static : path.join(__dirname, 'public'),
            historyApiFallback: true
        }
    }
    
};