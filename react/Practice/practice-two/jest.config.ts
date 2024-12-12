export default {
  setupFilesAfterEnv: ['@testing-library/jest-dom', '<rootDir>/jest.setup.ts'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleNameMapper: {
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@assets/icons(.*)$': '<rootDir>/src/assets/icons$1',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@type/(.*)$': '<rootDir>/src/types/$1'
  },
  moduleDirectories: ['node_modules', 'src']
}
