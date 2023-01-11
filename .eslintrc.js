module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: ['eslint:recommended', 'plugin:vue/vue3-essential', 'plugin:@typescript-eslint/recommended'],
    overrides: [],
    // "parser": "@typescript-eslint/parser",
    // "parserOptions": {
    //     "ecmaVersion": "latest",
    //     "sourceType": "module"
    // },
    parser: 'vue-eslint-parser',
    parserOptions: { parser: '@typescript-eslint/parser' },
    plugins: ['vue', '@typescript-eslint'],

    // "off"或0-关闭规则
    // "warn"或1-将该规则作为警告打开（不影响退出代码）
    // "error"或2-将规则作为错误打开（退出代码将为1）

    // 第二个参数
    // always（默认）：在语句末尾需要分号
    // never：不允许加分号
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        semi: [1, 'always'],
        'vue/multi-word-component-names': 'off',
        'vue/no-unused-vars': 0,
        '@typescript-eslint/no-unused-vars': 'off', //未使用的变量
        '@typescript-eslint/no-explicit-any': 'off',
        'no-redeclare': 'off',
        'no-empty': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        'no-constant-condition': 'off',
        'no-plusplus': 0, //不允许使用++ --运算符
        '@typescript-eslint/no-namespace': 'off', //namespace 命名空间关闭
        'no-undef': 'off',
    },
};
