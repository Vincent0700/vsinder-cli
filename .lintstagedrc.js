module.exports = {
  '*.{ts,tsx}': ['eslint --fix'],
  '*.{js,jsx}': ['eslint --fix'],
  '*.{md,html,json}': ['prettier --write'],
  '*.{css,scss,less}': ['prettier --write']
};
