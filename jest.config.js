module.exports = {
  roots: [
    `<rootDir>/src`
  ],
  transform: {
    "^.+\\.tsx?$": `ts-jest`,
    "^.+\\.js?$": `babel-jest`,
  },
  testRegex: `.test.(js?|jsx?|tsx?)$`,
  globals: {
    'ts-jest': {
      diagnostics: false
    }
  },
  moduleFileExtensions: [
    `ts`,
    `tsx`,
    `js`,
    `jsx`,
    `json`,
    `node`
  ],
};
