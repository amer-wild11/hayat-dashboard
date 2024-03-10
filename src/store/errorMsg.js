import generateUniqueId from '@/helpfulFunctions/makeId'

export default {
  state: {
    errors: []
  },
  mutations: {
    callErrMsg(state, content) {
      let id = generateUniqueId()
      setTimeout(() => {
        let error = {
          content: content,
          timeout: 3,
          id: id
        }
        state.errors.push(error)
        let currentMsg = state.errors.find((msg) => msg.id == id)
        let int = setInterval(() => {
          if (currentMsg.timeout != 0) {
            currentMsg.timeout -= 1
          } else {
            clearInterval(int)
          }
        }, 1000)
        setTimeout(() => {
          state.errors.splice(state.errors.indexOf(currentMsg), 1)
        }, currentMsg.timeout * 1000)
      }, 200)
    }
  }
}
