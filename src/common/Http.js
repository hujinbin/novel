import axios from 'axios';
import config from '../../config/index';

// axios 配置
axios.defaults.timeout = 8000
axios.defaults.baseURL = config.backendUrl
// axios.defaults.withCredentials = true

function Http(method, url, params) {
    return new Promise((resolve, reject) => {
      switch (method) {
        case 'post':
          axios.post(url, params)
            .then(response => {
              resolve(response.data)
            }, err => {
              reject(err)
            })
            .catch((error) => {
              reject(error)
            })
          break
        case 'get':
          axios.get(url, {
              params: params
            })
            .then(response => {
              resolve(response.data)
            }, err => {
              reject(err)
            })
            .catch((error) => {
              reject(error)
            })
          break
        default:
          reject('method出错！')
          break
      }
    })
  }

  export default Http;