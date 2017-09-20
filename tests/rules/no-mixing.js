var testRule = require('stylelint-test-rule-tape');
var rule = require('../../rules/no-mixing');

// Just a couple of quick tests to ensure postcss-bem-linter
// is getting the hard work done

testRule(rule.rule, {
	ruleName: rule.ruleName,

	accept: [
		{ code: '/** @define Foo */ .Foo {}' },
		{ code: '/** @define Foo */ .Foo-bar {}' },
	],

	reject: [
		{
			code: '/** @define Foo */ .false {}',
			message: 'Invalid component selector ".false" (' + selectorBemPattern.ruleName + ')',
			line: 1,
			column: 20,
		},
		{
			code: '/** @define Foo */ .Foo_bar {}',
			message: 'Invalid component selector ".Foo_bar" (' + selectorBemPattern.ruleName + ')',
			line: 1,
			column: 20,
		},
	],
});
