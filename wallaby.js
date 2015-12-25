module.exports = function () {
  return {
    files: [
      {pattern: 'src/tests/components/support/**', instrument: false},
      {pattern: 'node_modules/react/dist/react-with-addons.js', instrument: false},
      'src/client/components/**'
    ],
    tests: [
      'src/tests/components/ui/**'
    ],
    preprocessors: {
      '**/*.jsx': file => require('react-tools').transformWithDetails(file.content, {sourceMap: true, harmony: true})
    }
  };
};