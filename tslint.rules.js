module.exports = {
  'quotemark': [true, 'single'],
  'semicolon': [true, 'never'],
  'arrow-spacing': ['error', {'before': true, 'after': true}],
  'block-spacing': ['error', 'always'],
  'brace-style': ['error', '1tbs', {'allowSingleLine': true}],
  'camelcase': ['error', {'properties': 'never'}],
  'comma-dangle': ['error', {
    'arrays': 'never',
    'objects': 'never',
    'imports': 'never',
    'exports': 'never',
    'functions': 'never'
  }],
  'comma-spacing': ['error', {'before': false, 'after': true}],
  'comma-style': ['error', 'last'],
  'curly': ['error', 'multi-line'],
  'dot-location': ['error', 'property'],
  'eqeqeq': ['error', 'always', {'null': 'ignore'}],
  'func-call-spacing': ['error', 'never'],
  'generator-star-spacing': ['error', {
    'before': true,
    'after': true
  }],
  'handle-callback-err': ['error', '^(err|error)$'],
  'indent': ['error', 2, {'SwitchCase': 1}],
  'key-spacing': ['error', {
    'beforeColon': false,
    'afterColon': true
  }],
  'keyword-spacing': ['error', {'before': true, 'after': true}],
  'new-cap': ['error', {'newIsCap': true, 'capIsNew': false}],
  'new-parens': 'error',
  'no-constant-condition': ['error', {'checkLoops': false}],
  'no-debugger': 'error',
  'no-eval': 'error',
  'no-extra-parens': ['error', 'functions'],
  'no-inner-declarations': ['error', 'functions'],
  'no-irregular-whitespace': 'error',
  'no-labels': ['error', {
    'allowLoop': false,
    'allowSwitch': false
  }],
  'no-mixed-operators': ['error', {
    'groups': [
      ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
      ['&&', '||'],
      ['in', 'instanceof']
    ],
    'allowSamePrecedence': true
  }],
  'no-multiple-empty-lines': ['error', {'max': 1, 'maxEOF': 0}],
  'no-return-assign': ['error', 'except-parens'],
  'no-sparse-arrays': 'error',
  'no-unneeded-ternary': ['error', {'defaultAssignment': false}],
  'no-unsafe-finally': 'error',
  'no-unused-expressions': ['error', {
    'allowShortCircuit': true,
    'allowTernary': true,
    'allowTaggedTemplates': true
  }],
  'no-unused-vars': ['error', {
    'vars': 'all',
    'args': 'none',
    'ignoreRestSiblings': true
  }],
  'no-use-before-define': ['error', {
    'functions': false,
    'classes': false,
    'variables': false
  }],
  'object-property-newline': ['error', {'allowMultiplePropertiesPerLine': true}],
  'one-var': ['error', {'initialized': 'never'}],
  'operator-linebreak': ['error', 'after', {
    'overrides': {
      '?': 'before',
      ':': 'before'
    }
  }],
  'padded-blocks': ['error', {
    'blocks': 'never',
    'switches': 'never',
    'classes': 'never'
  }],
  'quotes': ['error', 'single', {
    'avoidEscape': true,
    'allowTemplateLiterals': true
  }],
  'rest-spread-spacing': ['error', 'never'],
  'semi': ['error', 'never'],
  'semi-spacing': ['error', {'before': false, 'after': true}],
  'space-before-blocks': ['error', 'always'],
  'space-before-function-paren': ['error', 'always'],
  'space-in-parens': ['error', 'never'],
  'space-unary-ops': ['error', {'words': true, 'nonwords': false}],
  'spaced-comment': ['error', 'always', {
    'line': {'markers': ['*package', '!', '/', ',', '=']},
    'block': {
      'balanced': true,
      'markers': ['*package', '!', ',', ':', '::', 'flow-include'],
      'exceptions': ['*']
    }
  }],
  'template-curly-spacing': ['error', 'never'],
  'template-tag-spacing': ['error', 'never'],
  'unicode-bom': ['error', 'never'],
  'use-isnan': 'error',
  'valid-typeof': ['error', {'requireStringLiterals': true}],
  'wrap-iife': ['error', 'any', {'functionPrototypeMethods': true}],
  'yield-star-spacing': ['error', 'both'],
  'yoda': ['error', 'never'],
  'standard/array-bracket-even-spacing': ['error', 'either'],
  'standard/computed-property-even-spacing': ['error', 'even'],
  'standard/object-curly-even-spacing': ['error', 'either']
}