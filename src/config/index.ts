type ENV = 'mock' | 'proxy';

// 环境变量
const env: ENV = 'mock';

export const baseUrl = env === 'mock' ? 'http://localhost:4000/' : '/';