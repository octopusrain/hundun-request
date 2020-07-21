# hundun-request

## usage

### 基于 axios 请求库封装，其它请求库 待扩展

示例代码

```
import hundunRequest from 'hundun-request'
import axios from 'axios'
const requestConfig = {
  requestLib: axios,
}
const request = hundunRequest(requestConfig)

export const getUserInfo = (user_id) => {
  return request
    .get('https://tuser.hundun.cn/get_user_info', {
      params: {
        uid: user_id,
      },
    })
    .then((res) => {
      if (res.error_no === 0) {
        return Promise.resolve(res.data)
      } else {
        return Promise.reject(res)
      }
    })
    .catch((err) => Promise.reject(err))
}
```

### tips

1. requestConfig 目前支持参数 requestLib:请求库（如 axios）,clientType:请求终端（如 h5,pcweb）,versionName:app 版本号
2. 公共请求不做 403，405 的登录处理，放在项目业务中处理，catch(error.error_no===403,405),可调用 hundun-ui login 组件
3. hundun-ui UI 库，hundun-utils 工具库，hundun-request 请求库；hdLogin 组件：有业务代码依赖 hundun-utils

### 示例代码

main.js

```
import {hdLogin,hdToast,hdConfirm} from hundun-ui
Vue.use(hdToast)
Vue.use(hdConfirm)
Vue.use(hdLogin)

```

业务代码

```
await getUserInfo(query('user_id')).catch((e) => {
  if (e.error_no === 403 || e.error_no === 405) {
    this.$login({ user_info: userInfo, channel: 'test-sdk' }).then(
      (user_info) => {
        console.log('user_info', user_info)
      }
    )
  }
  this.$toast(e.error_msg)
})
```
