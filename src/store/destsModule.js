import axios from 'axios'
import store from '.'
import router from '@/router'

export default {
  state: {
    dests: [],
    postButton: 'upload',
    updateButton: 'update',
    canPost: true,
    canUpdate: true
  },
  mutations: {
    getDestinations(state) {
      axios
        .get(`${store.state.url}/destinations`)
        .then((res) => {
          state.dests = res.data.destinations
          store.state.countersModule.counters.find(
            (counter) => counter.name == 'destinations'
          ).count = res.data.destinations.length
        })
        .catch((err) => {
          if (typeof err.response.data.message != 'object') {
            store.commit('callErrMsg', err.response.data.message)
          } else {
            store.commit('callErrMsg', err.message)
          }
        })
    },
    postDest(state, data) {
      state.canPost = false
      state.postButton = 'uploading...'
      axios
        .post(`${store.state.url}/destinations`, data, store.state.headers)
        .then((res) => {
          store.commit('callSuccessMsg', res.data.message)
          state.postButton = 'upload'
          router.push('/travel&tourism/destinations')
          state.canPost = true
        })
        .catch((err) => {
          state.postButton = 'upload'
          state.canPost = true
          if (typeof err.response.data.message != 'object') {
            store.commit('callErrMsg', err.response.data.message)
          } else {
            store.commit('callErrMsg', err.message)
          }
        })
    },
    deleteDest() {
      axios
        .delete(`${store.state.url}/destinations/${store.state.deleteMsg.id}`, store.state.headers)
        .then((res) => {
          store.commit('callSuccessMsg', res.data.message)
          store.state.deleteMsg.active = false
          store.state.deleteMsg.canDelete = true
        })
        .catch((err) => {
          store.state.deleteMsg.canDelete = true
          if (typeof err.response.data.message != 'object') {
            store.commit('callErrMsg', err.response.data.message)
          } else {
            store.commit('callErrMsg', err.message)
          }
        })
    },
    updateDest(state, data) {
      state.canUpdate = false
      state.updateButton = 'updating...'
      axios
        .patch(
          `${store.state.url}/destinations/${router.currentRoute.value.params.dest_id}`,
          data,
          store.state.headers
        )
        .then((res) => {
          store.commit('callSuccessMsg', res.data.message)
          router.push('/travel&tourism/destinations')
          state.updateButton = 'update'
          state.canUpdate = true
        })
        .catch((err) => {
          state.canUpdate = true
          state.updateButton = 'update'
          if (typeof err.response.data.message != 'object') {
            store.commit('callErrMsg', err.response.data.message)
          } else {
            store.commit('callErrMsg', err.message)
          }
        })
    }
  }
}
