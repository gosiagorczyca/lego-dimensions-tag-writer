module.exports = {
    presets: ['module:metro-react-native-babel-preset', '@babel/preset-typescript'],
    plugins: [
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['babel-plugin-transform-typescript-metadata'],
        ['babel-plugin-parameter-decorator'],
        ['react-native-reanimated/plugin'],
    ],
};
