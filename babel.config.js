// babel.config.js
module.exports = {
    presets: [
        '@babel/preset-env',
        '@vue/babel-preset-jsx',
    ],
    plugins: [
        [
            'import',
            {
                libraryName: 'element-plus',
                libraryDirectory: 'es',
                style: (name) => `${name}/style/index.js`, // `style: true` 会加载 css 文件
            },
            'element-plus',
        ],
    ],
};