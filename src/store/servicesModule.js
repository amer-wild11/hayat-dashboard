import axios from 'axios'
import store from '.'
import router from '@/router'

export default {
  state: {
    services: [],
    postButton: 'upload',
    updateButton: 'update',
    canPost: true,
    canUpdate: true
  },
  mutations: {
    getServices(state) {
      axios
        .get(`${store.state.url}/services`)
        .then((res) => {
          state.services = res.data.services
          store.state.countersModule.counters.find((counter) => counter.name == 'services').count =
            res.data.services.length
        })
        .catch((err) => {
          handleError(err)
        })
    },
    postService(state, data) {
      state.canPost = false
      state.postButton = 'uploading...'
      axios
        .post(`${store.state.url}/services`, data, store.state.headers)
        .then((res) => {
          state.canPost = true
          store.commit('callSuccessMsg', res.data.message)
          router.push('/services')
          state.postButton = 'upload'
        })
        .catch((err) => {
          state.canPost = true
          handleError(err)
          state.postButton = 'upload'
        })
    },
    deleteService() {
      axios
        .delete(`${store.state.url}/services/${store.state.deleteMsg.id}`, store.state.headers)
        .then((res) => {
          store.commit('callSuccessMsg', res.data.message)
          store.state.deleteMsg.active = false
          store.state.deleteMsg.canDelete = true
        })
        .catch((err) => {
          store.state.deleteMsg.canDelete = true
          handleError(err)
        })
    },
    updateService(state, data) {
      state.canUpdate = false
      state.updateButton = 'updating...'
      axios
        .patch(
          `${store.state.url}/services/${router.currentRoute.value.params.serv_id}`,
          data,
          store.state.headers
        )
        .then((res) => {
          state.updateButton = 'update'
          state.canUpdate = true
          router.push('/services')
          store.commit('callSuccessMsg', res.data.message)
        })
        .catch((err) => {
          state.canUpdate = true
          state.updateButton = 'update'
          handleError(err)
        })
    },
    showServicesForm(state) {
      state.servicesForm = true
    }
  }
}

function handleError(err) {
  if (typeof err.response.data.message != 'object') {
    store.commit('callErrMsg', err.response.data.message)
  } else if (!err.response || typeof err.response.data.message == 'object') {
    store.commit('callErrMsg', err.message)
  }
}
