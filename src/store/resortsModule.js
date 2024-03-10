import axios from 'axios'
import store from '.'
import router from '@/router'

export default {
  state: {
    resorts: [],
    updateButton: 'update',
    postButton: 'upload',
    canPost: true,
    canUpdate: true
  },
  mutations: {
    getResorts(state) {
      axios
        .get(`${store.state.url}/resorts`)
        .then((res) => {
          state.resorts = res.data.resorts
          store.state.countersModule.counters.find((counter) => counter.name == 'resorts').count =
            res.data.resorts.length
        })
        .catch((err) => {
          handleError(err)
        })
    },
    postResort(state, data) {
      state.canPost = false
      state.postButton = 'uploading...'
      axios
        .post(`${store.state.url}/resorts`, data, store.state.headers)
        .then((res) => {
          store.commit('callSuccessMsg', res.data.message)
          router.push('/hotels&resorts/resorts')
          state.postButton = 'upload'
          state.canPost = true
        })
        .catch((err) => {
          state.postButton = 'upload'
          state.canPost = true
          handleError(err)
        })
    },
    updateResort(state, data) {
      state.canUpdate = false
      state.updateButton = 'updating...'
      axios
        .patch(
          `${store.state.url}/resorts/${router.currentRoute.value.params.resort_id}`,
          data,
          store.state.headers
        )
        .then((res) => {
          store.commit('callSuccessMsg', res.data.message)
          router.push('/hotels&resorts/resorts')
          state.updateButton = 'update'
          state.canUpdate = true
        })
        .catch((err) => {
          handleError(err)
          state.updateButton = 'update'
          state.canUpdate = true
        })
    },
    deleteResort() {
      axios
        .delete(`${store.state.url}/resorts/${store.state.deleteMsg.id}`, store.state.headers)
        .then((res) => {
          store.commit('callSuccessMsg', res.data.message)
          store.state.deleteMsg.active = false
          store.state.deleteMsg.canDelete = true
        })
        .catch((err) => handleError(err))
    },
    showResortsForm(state) {
      state.resortsForm = true
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
