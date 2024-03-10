<template>
  <div class="postTicket" v-if="currentTicket">
    <h2>add new ticket</h2>
    <form @submit.prevent="update">
      <div class="input">
        <span>ticket name</span>
        <input type="text" placeholder="name" v-model="name" required />
      </div>
      <div class="logo">
        <span>company logo</span>
        <div class="group">
          <label class="logoInput" for="logoInput">
            <span>choose logo</span>
            <fa-icon icon="image" />
            <input type="file" id="logoInput" @change="logoChanged" ref="logoInput" />
          </label>
          <div class="logoContainer" ref="logoContainer">
            <img :src="`${store.state.url}/${currentTicket.ticket.path}`" alt="" ref="logoEl" />
          </div>
        </div>
      </div>
      <div class="btn">
        <button
          :class="['button', ticketsModule.canUpdate ? '' : 'cantpost']"
          v-html="ticketsModule.updateButton"
          style="float: right"
        ></button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const ticketsModule = store.state.ticketsModule
const name = ref('')
const logoInput = ref('')
const logoEl = ref('')
const logoContainer = ref('')

const router = useRouter()
const currentRoute = router.currentRoute.value

const currentTicket = ticketsModule.tickets.find((t) => t._id == currentRoute.params.ticket_id)

if (currentTicket) {
  name.value = currentTicket.name
} else {
  router.push('/tickets')
}

const logoChanged = (e) => {
  let reader = new FileReader()
  reader.onload = (e) => {
    logoEl.value.src = e.target.result
  }
  reader.readAsDataURL(e.target.files[0])
}

const update = () => {
  if (ticketsModule.canUppdate) {
    let data = new FormData()
    data.append('name', name.value)
    data.append('ticket', logoInput.value.files[0])
    store.commit('updateTicket', data)
  }
}
</script>

<style lang="scss" scoped>
.postTicket {
  display: flex;
  flex-direction: column;
  gap: 20px;
  h2 {
    font-size: 30px;
    font-weight: bold;
    text-transform: capitalize;
  }
  form {
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    .input {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 10px;
      span {
        font-size: 15px;
        font-weight: bold;
        text-transform: capitalize;
      }
      input {
        padding: 5px;
        width: 100%;
        height: 35px;
        border-radius: 3px;
        border: 1px solid rgba(31, 162, 222, 0.092);
        background: rgba(0, 166, 255, 0.08);
        &::placeholder {
          text-transform: capitalize;
        }
      }
    }
    .logo {
      display: flex;
      flex-direction: column;
      gap: 10px;
      > span {
        font-size: 15px;
        font-weight: bold;
        text-transform: capitalize;
      }
      .group {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .logoInput {
        width: 160px;
        height: 50px;
        border: 1px solid rgba(0, 166, 255, 0.08);
        background: rgba(31, 162, 222, 0.092);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 4px;
        text-transform: capitalize;
        border-radius: 4px;
        color: rgba(43, 110, 146, 0.824);
        cursor: pointer;
        input {
          display: none;
          appearance: none;
        }
      }
      .logoContainer {
        width: 200px;
        height: 50px;
        background: rgba(31, 199, 215, 0.107);
        border: 1px dotted rgba(0, 166, 255, 0.08);
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
}
</style>
