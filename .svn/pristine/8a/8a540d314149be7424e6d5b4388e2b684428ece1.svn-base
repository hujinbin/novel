import axios from 'axios'
import { message } from 'antd'

const defaultAxiosConf = {
  timeout: 5000
}

const _request = (params = {}, fn = () => {}) => {
  return axios({ ...defaultAxiosConf, ...params })
    .then(res => {
      const { success, data, errMsg, errCode } = res.data
      if (errCode === 401) {
        window.location.href = '/'
        return
      }
      if (success) {
        fn(false)
        return data
      }
      throw errMsg
    })
    .catch(err => {
      fn(false)
      message.error(String(err || '网络错误'))
      console.error(err)
      throw err
    })
}

export default (param) => {
  const typeRes = typeof param
  if (typeRes === 'function') {
    param(true)
    return (obj) => _request(obj, param)
  }
  if (typeRes === 'object' && typeRes !== null) return _request(param)
}
