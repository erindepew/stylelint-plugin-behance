const stylelint = require('stylelint');

const ruleName = 'stylelint-plugin-behance/no-mixing';
const messages = stylelint.utils.ruleMessages(ruleName, {
  expected: (file) => {
    return `Expected no mixing of variables and rules in ${file}`;
  },
});

module.exports = stylelint.createPlugin(ruleName, function() {
  return function(postcssRoot, postcssResult) {
    const validOptions = stylelint.utils.validateOptions(postcssResult, ruleName);
    if (!validOptions) { return; };

    let hasDeclaration = false;
    let hasRule = false;
    let lastNode = null;

    postcssRoot.walk((node) => {
      if (hasDeclaration && hasRule) {
        return;
      }
      else {
        lastNode = node;

        if (node.type === 'rule' && !hasRule && !(node.selector.substring(0, 2) === '&:')) {
          hasRule = true;
        }

        else if (node.type === 'decl' && node.prop.substring(0, 1) === '$' && !hasDeclaration) {
          hasDeclaration = true;
        }
      }
    });
    if (hasDeclaration && hasRule) {
      stylelint.utils.report({
        message: messages.expected(postcssResult.opts.from),
        ruleName,
        node: lastNode,
        result: postcssResult,
      });
    }
  };
});

module.exports.ruleName = ruleName;
module.exports.messages = messages;
