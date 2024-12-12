import '@testing-library/jest-dom'
import { TextEncoder as NodeTextEncoder, TextDecoder as NodeTextDecoder } from 'util'

global.TextEncoder = NodeTextEncoder as unknown as typeof TextEncoder
global.TextDecoder = NodeTextDecoder as unknown as typeof TextDecoder
