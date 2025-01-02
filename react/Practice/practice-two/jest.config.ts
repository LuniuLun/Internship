export default {
  setupFilesAfterEnv: ['@testing-library/jest-dom', '<rootDir>/jest.setup.ts'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        diagnostics: {
          ignoreCodes: [1343]
        },
        astTransformers: {
          before: [
            {
              path: 'node_modules/ts-jest-mock-import-meta',
              options: {
                metaObjectReplacement: {
                  VITE_APP_BASE_URL: 'https://669e22209a1bda368005842c.mockapi.io/api/v1/',
                  VITE_APP_USER_ENDPOINT: 'users'
                }
              }
            }
          ]
        }
      }
    ]
  },
  moduleNameMapper: {
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@types/(.*)$': '<rootDir>/src/types$1',
    '^@layout(.*)$': '<rootDir>/src/layout$1',
    '^@pages(.*)$': '<rootDir>/src/pages$1',
    '^@constants(.*)$': '<rootDir>/src/constants$1',
    '^@hooks(.*)$': '<rootDir>/src/hooks$1',
    '^@services(.*)$': '<rootDir>/src/services$1',
    '^@contexts(.*)$': '<rootDir>/src/contexts$1'
  },
  moduleDirectories: ['node_modules', 'src']
}
