import request from '@/utils/request'

export const register = (data: any) =>
  request({
    url: '/register',
    method: 'post',
    data
  })
export const login = (data: any) => {
  request({
    url: '/login',
    method: 'post',
    data
  })
}
