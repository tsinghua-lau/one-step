module.exports = {
  singleQuote: true, // 使用单引号而不是双引号
  // semi: false, // 句尾是否加;
  proseWrap: 'never', // 换行,always：超过printWidth就换行，never：不换行，preserve：按照原样处理
  arrowParens: 'avoid', // allow paren-less arrow functions 箭头函数的参数使用圆括号
  jsxBracketSameLine: true, // #多行JSX中的>放置在最后一行的结尾，而不是另起一行（默认false）
  tabWidth: 4, //空格
  trailingComma: 'es5', // es5多行时，尽可能打印尾随的逗号
  useTabs: false, // 是否利用tab替代空格
  printWidth: 220,
};
