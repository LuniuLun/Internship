export default {
  setupFilesAfterEnv: ['@testing-library/jest-dom', '<rootDir>/jest.setup.ts'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleNameMapper: {
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@type/(.*)$': '<rootDir>/src/types/$1',
    '^@layout(.*)$': '<rootDir>/src/layout$1',
    '^@pages(.*)$': '<rootDir>/src/pages$1',
    '^@constants(.*)$': '<rootDir>/src/constants$1',
    '^@hooks(.*)$': '<rootDir>/src/hooks$1',
    '^@services(.*)$': '<rootDir>/src/services$1'
  },
  moduleDirectories: ['node_modules', 'src']
}
