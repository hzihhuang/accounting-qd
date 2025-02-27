import { CustomRequestOptions } from '@/interceptors/request'
import { useUserStore } from '@/store'
import { showToast } from './globalToast'

export const http = <T>(options: CustomRequestOptions) => {
  const { clearUserInfo } = useUserStore()
  // 1. 返回 Promise 对象
  return new Promise<IResData<T>>((resolve, reject) => {
    uni.request({
      ...options,
      dataType: 'json',
      // #ifndef MP-WEIXIN
      responseType: 'json',
      // cookie
      withCredentials: true,
      header: {
        Authorization: `Bearer ${uni.getStorageSync('token')}`,
      },
      // #endif
      // 响应成功
      success(res) {
        // 状态码 2xx，参考 axios 的设计
        if (res.statusCode >= 200 && res.statusCode < 300) {
          // 2.1 提取核心数据 res.data
          resolve(res.data as IResData<T>)
        } else if (res.statusCode === 401) {
          // 401错误  -> 清理用户信息，跳转到登录页1
          clearUserInfo()
          reject(res)
        } else {
          // 其他错误 -> 根据后端错误信息轻提示
          if (!options.hideErrorToast) {
            showToast().error((res.data as any).message || '请求错误')
          }
          reject(res)
        }
      },
      // 响应失败
      fail(err) {
        showToast().error('网络错误，换个网络试试')
        reject(err)
      },
    })
  })
}

/**
 * GET 请求
 * @param url 后台地址
 * @param query 请求query参数
 * @returns
 */
export const httpGet = <T>(url: string, data?: Record<string, any>) => {
  return http<T>({
    url,
    data,
    method: 'GET',
  })
}

/**
 * POST 请求
 * @param url 后台地址
 * @param data 请求body参数
 * @param query 请求query参数，post请求也支持query，很多微信接口都需要
 * @returns
 */
export const httpPost = <T>(url: string, data?: Record<string, any>) => {
  return http<T>({
    url,
    data,
    method: 'POST',
  })
}

export const httpDelete = <T>(url: string, id: number) => {
  return http<T>({
    url: `${url}/${id}`,
    method: 'DELETE',
  })
}

http.get = httpGet
http.post = httpPost
http.delete = httpDelete
