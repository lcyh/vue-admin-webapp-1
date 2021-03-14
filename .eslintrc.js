module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'prettier/prettier': [
      'error',
      {
        semi: false, //结尾加分号 老项目默认配置
        singleQuote: true, //双引号 老项目默认配置
        quotes: true
      }
    ],
    'comma-dangle': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
