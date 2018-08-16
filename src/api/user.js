import axios from '@/libs/api.request'

export const login = ({ userName, password }) => {
  // const data = {
  //   userName,
  //   password
  // }
  return axios.request({
    url: '/acl/user/login',
    params: {
      userName,
      password
    },
    method: 'get'
  })
}

export const getUserInfo = (token) => {
  return axios.request({
    url: '/acl/user/getUserInfo',
    params: {
      token
    },
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    url: '/acl/user/logout',
    method: 'post'
  })
}

export const getList = (key, current, pageSize) => {
  return axios.request({
    url: '/acl/user/list',
    params: {
      key,
      current,
      pageSize
    },
    method: 'get'
  })
}

export const save = (form) => {
  return axios.request({
    url: '/acl/user/save',
    data: form,
    method: 'post'
  })
}

export const remove = (id) => {
  return axios.request({
    url: '/acl/user/remove',
    params: {id},
    method: 'get'
  })
}

export const getById = (userId) => {
  return axios.request({
    url: 'acl/user/getById',
    params: {userId},
    method: 'get'
  })
}
