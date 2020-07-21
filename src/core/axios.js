import signParams from '../utils/getSign'
export default function (options) {
  const clientType = options.clientType || 'pcweb'
  const versionName = options.versionName || ''
  const axios = axios || options.requestLib
  // API请求公参
  const publicParams = {
    clientType,
    versionName,
    user_id: '',
  }
  // 需要添加自定义header的域名
  const customHeaderDomainList = ['user.hundun.cn', 'course.hundun.cn']
  const isNeedCustomHeader = (url) =>
    customHeaderDomainList.some((item) => url.includes(item))
  axios.defaults.timeout = 20000 // 超时时间20s
  // 设置全局的请求次数，请求的间隙
  axios.defaults.retry = 3
  axios.defaults.retryDelay = 2000

  // 添加请求拦截器
  axios.interceptors.request.use(
    function (config) {
      // 在发送请求之前做些什么
      let token = window.localStorage.getItem('token') || ''
      let Sid = window.localStorage.getItem('Sid') || ''
      let user_id = window.localStorage.getItem('user_id') || ''
      let Sign = ''
      publicParams.user_id = user_id
      const requestMethod = config.method.toLowerCase()
      if (requestMethod === 'post') {
        config.data = Object.assign(
          { ts: new Date().getTime() },
          publicParams,
          config.data
        )
        Sign = signParams(token, config.data)
      }
      // params are the URL parameters to be sent with the request
      if (requestMethod === 'get') {
        config.params = Object.assign(
          { ts: new Date().getTime() },
          publicParams,
          config.params
        )
        Sign = signParams(token, config.params)
      }
      // 增加headers
      if (isNeedCustomHeader(config.url)) {
        config.headers.common.Sign = Sign || ''
        config.headers.common.Sid = Sid || ''
        config.headers.common.SignVersion = 'V2'
      }
      return config
    },
    function (error) {
      // 对请求错误做些什么
      return Promise.reject(error)
    }
  )
  // 添加响应拦截器
  // axios.interceptors.response.use(
  //   function (response) {
  //     // 对响应数据做点什么
  //     return response.data
  //   },
  //   function (error) {
  //     // 对响应错误做点什么
  //     return Promise.reject(error)
  //   }
  // )
  return axios
}
