import axios from 'axios'
import store from '.'
import router from '@/router'

export default {
  state: {
    news: [],
    postButton: 'upload',
    updateButton: 'update',
    canPost: true,
    canUpdate: true,
    currentNews: {}
  },
  mutations: {
    getNews(state) {
      axios
        .get(`${store.state.url}/news`)
        .then((res) => {
          state.news = res.data.news
          store.state.countersModule.counters.find((counter) => counter.name == 'news').count =
            res.data.news.length
        })
        .catch((err) => {
          handleError(err)
        })
    },
    postNews(state, data) {
      state.canPost = false

      state.postButton = 'uploading...'
      axios
        .post(`${store.state.url}/news`, data, store.state.headers)
        .then((res) => {
          state.postButton = 'uploade'
          store.commit('callSuccessMsg', res.data.message)
          state.canPost = true
          router.push('/news')
        })
        .catch((err) => {
          state.canPost = true
          state.postButton = 'uploade'
          handleError(err)
        })
    },
    deleteNews() {
      axios
        .delete(`${store.state.url}/news/${store.state.deleteMsg.id}`, store.state.headers)
        .then((res) => {
          store.state.deleteMsg.active = false
          store.state.deleteMsg.canDelete = true

          store.commit('callSuccessMsg', res.data.message)
        })
        .catch((err) => {
          store.state.deleteMsg.canDelete = true
          handleError(err)
        })
    },
    updateNews(state, data) {
      state.canUpdate = false
      state.updateButton = 'updating...'
      axios
        .patch(
          `${store.state.url}/news/${router.currentRoute.value.params.news_id}`,
          data,
          store.state.headers
        )
        .then((res) => {
          state.canUpdate = true
          store.commit('callSuccessMsg', res.data.message)
          state.updateButton = 'update'
          router.push('/news')
        })
        .catch((err) => {
          state.canUpdate = true
          state.updateButton = 'update'
          handleError(err)
        })
    },
    showNewsForm(state) {
      state.newsForm = true
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
