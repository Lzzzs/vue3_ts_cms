/**
 * 对于不同的开发环境可以自动更换不同的BASE_URL
 * development -> 生产环境
 * production -> 线上环境
 * test -> 测试环境
 */
let BASE_URL: string
if (process.env.NODE_ENV === 'development') {
  BASE_URL = '/api'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = ''
} else {
  BASE_URL = ''
}

export { BASE_URL }
