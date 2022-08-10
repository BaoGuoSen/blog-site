type ENV = 'mock' | 'proxy'

// 环境变量
const env: ENV = 'proxy'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const baseUrl = env === 'mock' ? 'http://localhost:4000/' : '/'
