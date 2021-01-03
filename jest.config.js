module.exports = {
    testMatch: ['**/tests/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    transform: { '^.+\\.(ts|tsx)$': 'ts-jest' },
    testEnvironment: 'node',
}
