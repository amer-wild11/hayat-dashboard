import axios from 'axios'
import store from '.'
import router from '@/router'

export default {
  state: {
    trips: [],
    updateButton: 'update',
    postButton: 'upload',
    canUpdate: true,
    canPost: true
  },
  mutations: {
    getTrips(state) {
      axios
        .get(`${store.state.url}/trips`)
        .then((res) => {
          state.trips = res.data.trips
          store.state.countersModule.counters.find((counter) => counter.name == 'trips').count =
            res.data.trips.length
        })
        .catch((err) => {
          handleError(err)
        })
    },
    postTrip(state, data) {
      state.canPost = false
      state.postButton = 'uploading...'
      axios
        .post(`${store.state.url}/trips`, data, store.state.headers)
        .then((res) => {
          store.commit('callSuccessMsg', res.data.message)
          state.postButton = 'upload'
          router.push('/travel&tourism/trips')
          state.canPost = true
        })
        .catch((err) => {
          state.canPost = true
          state.postButton = 'upload'
          handleError(err)
        })
    },
    deleteTrip() {
      axios
        .delete(`${store.state.url}/trips/${store.state.deleteMsg.id}`, store.state.headers)
        .then((res) => {
          store.commit('callSuccessMsg', res.data.message)
          store.state.deleteMsg.active = false
          store.state.deleteMsg.canDelete = true
        })
        .catch((err) => {
          handleError(err)
        })
    },
    updateTrip(state, data) {
      state.canUpdate = false
      state.updateButton = 'updating...'
      axios
        .patch(
          `${store.state.url}/trips/${router.currentRoute.value.params.trip_id}`,
          data,
          store.state.headers
        )
        .then((res) => {
          store.commit('callSuccessMsg', res.data.message)
          router.push('/travel&tourism/trips')
          state.updateButton = 'update'
          state.canUpdate = true
        })
        .catch((err) => {
          state.canUpdate = true
          state.updateButton = 'update'
          handleError(err)
        })
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
