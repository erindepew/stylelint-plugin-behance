var stylelint = require("stylelint")

var ruleName = "stylelint-no-mixing-vars-and-declarations/no-mixing";
var messages =  stylelint.utils.ruleMessages(ruleName, {
	expected: (file) => {
		return `Expected no mixing of declarations and rules in ${file}`;
	},
})

module.exports = stylelint.createPlugin(ruleName, function(primaryOption, secondaryOptionObject) {
	return function(postcssRoot, postcssResult) {
		var validOptions = stylelint.utils.validateOptions(postcssResult, ruleName)
		if (!validOptions) { return }

		const decl = postcssRoot.nodes.filter((node) => node.type == 'decl');
		const rule = postcssRoot.nodes.filter((node) => node.type == 'rule');

		if (decl.length && rule.length) {
			stylelint.utils.report({
				message: messages.expected(postcssResult.opts.from),
				ruleName,
				node: decl[0],
				result: postcssResult,
			});
		}
	}
})

module.exports.ruleName = ruleName
module.exports.messages = messages
