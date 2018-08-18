import axios from '@/libs/api.request'

export const getAllRole = () => {
  return axios.request({
    url: '/acl/role/all',
    params: {},
    method: 'get'
  })
}

export const getList = (key, current, pageSize) => {
  return axios.request({
    url: '/acl/role/list',
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
    url: '/acl/role/save',
    data: form,
    method: 'post'
  })
}

export const remove = (id) => {
  return axios.request({
    url: '/acl/role/delete',
    params: {id},
    method: 'get'
  })
}

export const getById = (roleId) => {
  return axios.request({
    url: 'acl/role/getById',
    params: {roleId},
    method: 'get'
  })
}
