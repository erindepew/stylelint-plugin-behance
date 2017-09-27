var testRule = require('stylelint-test-rule-tape');
var rule = require('../../rules/no-mixing');

testRule(rule.rule, {
  ruleName: rule.ruleName,
  accept: [
    { code: '.foo {}' },
    { code: '$variable: 24' },
    { code: '@mixin bar() {}' },
    { code: '.foo {}; .bar {};' },
    { code: '$variable: 24; $variable2: #fff;' },
    { code: '@mixin bar() {}; @mixin baz() {};' },
    { code: '$variable: 24; @mixin baz() {};' },
    { code: '.foo{}; @mixin baz() {};' },
    { code: '@mixin baz() {}; $variable: 24;' },
    { code: '@mixin baz() { $variable: 24; };' },
    { code: '@mixin baz() { &:hover { color: red; };}' },
    { code: '.foo { color: $colorVar};' },
    { code: '@import "foo"; .foo {};' },
    { code: '@media print {}; .foo {};' },
    { code: '.foo { color: red; }' },
  ],
  reject: [
    {
      code: '.foo {}; $variable: 24;',
      message: 'Expected no mixing of variables and rules in undefined (stylelint-plugin-behance/no-mixing)',
      line: 1,
      column: 10,
    },
    {
      code: '$variable: 24; .foo {};',
      message: 'Expected no mixing of variables and rules in undefined (stylelint-plugin-behance/no-mixing)',
      line: 1,
      column: 16,
    },
    {
      code: '.foo { $variable: 24; display: inline-block;}; ',
      message: 'Expected no mixing of variables and rules in undefined (stylelint-plugin-behance/no-mixing)',
      line: 1,
      column: 8,
    },
    {
      code: '$variable: 24; @mixin baz() { .foo {} }',
      message: 'Expected no mixing of variables and rules in undefined (stylelint-plugin-behance/no-mixing)',
      line: 1,
      column: 31,
    },
  ],
});
