import axios from '@/libs/api.request'

export const getTree = () => {
  return axios.request({
    url: '/acl/resource/getTree',
    params: {
    },
    method: 'get'
  })
}

export const getResource = (resourceId) => {
  return axios.request({
    url: 'acl/resource/getResource',
    params: { resourceId },
    method: 'get'
  })
}

export const save = (form) => {
  return axios.request({
    url: '/acl/resource/save',
    data: form,
    method: 'post'
  })
}

export const remove = (id) => {
  return axios.request({
    url: '/acl/resource/delete',
    params: {id},
    method: 'get'
  })
}
