const CryptoJS = require('crypto-js')
/**
 * 使用token对params进行签名
 * @param token 签名token，登录时由服务端返回
 * @param params 待签名的参数对象
 */
const signParams = (token, params = {}) => {
  if (!token) return null
  let paramStr = ''
  Object.entries(params).forEach(
    ([key, value]) => (paramStr += `${key}=${value}&`)
  )
  paramStr = paramStr.slice(0, -1)

  const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA1, token)
  hmac.update(paramStr)
  const sign = hmac.finalize().toString()
  return sign
}
export default signParams
