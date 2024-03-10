import axios from 'axios'
import store from './index.ts'
import router from '@/router/index.js'

export default {
  state: {
    travels: [],
    updateButton: 'update',
    landmark: '',
    country: '',
    postButton: 'upload',
    canPost: true,
    canUpdate: true
  },
  mutations: {
    getTravels(state) {
      axios
        .get(`${store.state.url}/travels`)
        .then((res) => {
          state.travels = res.data.travels
          store.state.countersModule.counters.find((counter) => counter.name == 'travels').count =
            res.data.travels.length
        })
        .catch((err) => {
          handleError(err)
        })
    },
    postTravel(state, data) {
      state.postButton = 'uploading...'
      axios
        .post(`${store.state.url}/travels`, data, store.state.headers)
        .then((res) => {
          store.commit('callSuccessMsg', res.data.message)
          router.push('/travels')
          state.postButton = 'upload'
          state.canPost = true
        })
        .catch((err) => {
          state.postButton = 'upload'
          if (err.response) {
            handleError(err.response.data.message)
          } else {
            handleError(err)
          }
        })
    },
    updateTravel(state, thumbnail) {
      state.canUpdate = false
      let formData = new FormData()
      formData.append('thumbnail', thumbnail)
      formData.append('landmark', state.landmark)
      formData.append('country', state.country)

      state.updateButton = 'updating...'

      axios
        .patch(
          `${store.state.url}/travels/${router.currentRoute.value.params.travel_id}`,
          formData,
          store.state.headers
        )
        .then((res) => {
          state.landmark = ''
          state.country = ''
          state.updateButton = 'update'
          store.commit('callSuccessMsg', res.data.message)
          router.push('/')
          state.canUpdate = true
        })
        .catch((err) => {
          state.updateButton = 'update'
          state.canUpdate = true
          handleError(err)
        })
    },
    deleteTravel(state, id) {
      axios
        .delete(`${store.state.url}/travels/${id}`, store.state.headers)
        .then((res) => {
          store.commit('callSuccessMsg', res.data.message)
          store.state.deleteMsg.active = false
          store.state.deleteMsg.canDelete = true
        })
        .catch((err) => {
          handleError(err.response.data.message)
        })
    },
    showTravelsForm(state) {
      state.travelsForm = true
    }
  }
}

function handleError(err) {
  if (typeof err === 'string') {
    store.commit('callErrMsg', err)
  } else if (err.response && err.response.data && err.response.data.message) {
    store.commit('callErrMsg', err.response.data.message)
  } else {
    store.commit('callErrMsg', 'An unknown error occurred.')
  }
}
