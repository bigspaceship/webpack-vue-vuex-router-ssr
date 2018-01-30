module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true
  }
  extends: ['airbnb-base', 'prettier'],
  // required to lint *.vue files
  plugins: [
    'html',
    'prettier'
  ],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  rules: {
    'import/no-unresolved': 0,
    'no-param-reassign': 0,
    'arrow-body-style': 0,
    'no-lonely-if': 0,
    'no-prototype-builtins': 0,
    'prefer-default-export': 0,
    'consistent-return': 0,
    'import/prefer-default-export': 0,
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'prettier/prettier': [
      'error',
      {
        semi: true,
        trailingComma: 'es5',
        singleQuote: true,
        printWidth: 100
      }
    ]
  }
};
