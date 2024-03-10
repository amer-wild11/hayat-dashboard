import successSound from '/sounds/successSound.mp3'
import generateUniqueId from '@/helpfulFunctions/makeId'

export default {
  state: {
    msgs: []
  },
  mutations: {
    callSuccessMsg(state, content) {
      let sound = new Audio(successSound)
      sound.play()
      let id = generateUniqueId()
      setTimeout(() => {
        let message = {
          content: content,
          timeout: 3,
          id: id
        }
        state.msgs.push(message)
        let currentMsg = state.msgs.find((msg) => msg.id == id)
        let int = setInterval(() => {
          if (currentMsg.timeout != 0) {
            currentMsg.timeout -= 1
          } else {
            clearInterval(int)
          }
        }, 1000)
        setTimeout(() => {
          state.msgs.splice(state.msgs.indexOf(currentMsg), 1)
        }, currentMsg.timeout * 1000)
      }, 200)
    }
  }
}
