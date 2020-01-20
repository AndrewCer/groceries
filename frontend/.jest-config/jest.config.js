// https://jestjs.io/docs/en/configuration.html
const { defaults } = require('jest-config');

module.exports = {
	verbose: true,
	preset: 'jest-preset-angular',
	coveragePathIgnorePatterns: ['/.jest-config/', '/node_modules/'],
	setupFilesAfterEnv: ['<rootDir>.jest-config/setupJest.ts'],
	globals: {
		__TRANSFORM_HTML__: true
	},
	rootDir: '../',
	transform: {
		'^.+\\.(ts|html)$': '<rootDir>node_modules/jest-preset-angular/preprocessor.js'
	},
	moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
	collectCoverage: true,
	coverageReporters: ['cobertura', 'html', 'json']
};
