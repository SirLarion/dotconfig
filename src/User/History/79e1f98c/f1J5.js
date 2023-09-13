const path = require('path');

module.exports = {
  setupFiles: ['react-app-polyfill/jsdom'],
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    // .cjs file extension is required as some dependencies export in the format
    // @apollo/client at least uses it
    // If the file extension is not present the test will blow up with nondescriptive errors
    '^.+\\.(js|jsx|cjs|ts|tsx)$': [
      'babel-jest',
      // This is required as our bazel test rule does not place
      // the config file to root but needs it to apply to node modules as well
      {
        configFile: path.join(process.cwd(), '[[ROOT_DIR]]', 'babel.config.js'),
      },
    ],
    '^.+\\.css$': path.join(
      process.cwd(),
      '[[ROOT_DIR]]',
      'jest.csstransform.js'
    ),
    '^(?!.*\\.(js|jsx|cjs|ts|tsx|css|json)$)': path.join(
      process.cwd(),
      '[[ROOT_DIR]]',
      'jest.filetransform.js'
    ),
  },
  transformIgnorePatterns: [
    // Compile all @hox-modules which may be built by bazel to esnext modules
    '/node_modules/(?!(@hox/)|uuid/|d3-shape/|d3-path/).+\\.(js|jsx|ts|tsx)$',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  moduleNameMapper: {
    '^[[MODULE_NAME]]/(.*)$': path.join(process.cwd(), '[[ROOT_DIR]]', '$1'),
  },
  moduleFileExtensions: ['cjs', 'js', 'jsx', 'ts', 'tsx'],
};
