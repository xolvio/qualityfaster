module.exports = function () {
  return {
    files: [
      {pattern: 'tests/components/_support/**', instrument: true},
      {pattern: 'node_modules/react/dist/react-with-addons.js', instrument: false},
      'src/client/**'
    ],
    tests: [
      'tests/components/ui/**'
    ],
    testFramework: 'jasmine',
    preprocessors: {
      '**/*.jsx': file => require('react-tools').transformWithDetails(file.content, {sourceMap: true, harmony: true})
    }
  };
};