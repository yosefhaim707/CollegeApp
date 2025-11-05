const shared = require('@f1-stats-suite/config/tailwind');

module.exports = {
  ...shared,
  content: ['index.html', './src/**/*.{ts,tsx}', '../ui/src/**/*.{ts,tsx}'],
};
