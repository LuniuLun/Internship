import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util'
import { config } from 'dotenv'

config({ path: '.env.development.local' })
Object.assign(global, { TextDecoder, TextEncoder })

// Object.defineProperty(global, 'import', {
//   value: {
//     meta: {
//       env: {
//         VITE_APP_BASE_URL: 'https://669e22209a1bda368005842c.mockapi.io/api/v1/',
//         VITE_APP_USER_ENDPOINT: 'users'
//       }
//     }
//   }
// })
