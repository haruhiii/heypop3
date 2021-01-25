module.exports = {
    preset: 'ts-jest',
    roots: ['<rootDir>/test'],
    testMatch: ['<rootDir>/test/**/*.test.ts'],
    testEnvironment: 'node',
    moduleNameMapper: {
        '^src/(.*)$': '<rootDir>/src/$1'
    },
    testPathIgnorePatterns: ['/node_modules/'],
    displayName: 'TEST',
    verbose: true,
    testTimeout: 10000

}
