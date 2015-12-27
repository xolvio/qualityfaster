module.exports = function () {
  return {
    files: [
      {pattern: 'src/tests/components/support/**', instrument: true},
      {pattern: 'node_modules/react/dist/react-with-addons.js', instrument: false},
      'src/client/**'
    ],
    tests: [
      'src/tests/components/**'
    ],
    preprocessors: {
      '**/*.jsx': file => require('react-tools').transformWithDetails(file.content, {sourceMap: true, harmony: true})
    }
  };
};