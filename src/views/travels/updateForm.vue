<template>
  <main>
    <div class="updateTravel">
      <form class="form" @submit.prevent="update">
        <h2>update your travel</h2>
        <div class="input">
          <span>landmark</span>
          <input type="text" v-model="travelsModule.landmark" />
        </div>
        <div class="input">
          <span>country</span>
          <input type="text" v-model="travelsModule.country" />
        </div>
        <div class="input">
          <span>thumbnail</span>
          <label class="thumbInput" for="thumbnail">
            <span>choose file</span>
            <fa-icon icon="image" />
            <input type="file" id="thumbnail" @change="thumbChange" ref="thumbInput" />
          </label>
        </div>
        <div class="currentThumbnail">
          <img
            :src="
              currentTravel.thumbnail ? store.state.url + '/' + currentTravel.thumbnail.path : ''
            "
            alt=""
            ref="thumbEl"
          />
        </div>
        <div class="btn">
          <button
            v-html="store.state.travelsModule.updateButton"
            :class="['button', travelsModule.canUpdate ? '' : 'cantPost']"
          ></button>
        </div>
      </form>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()

const travelsModule = store.state.travelsModule
const currentTravel = ref({})
const thumbEl = ref('')
const thumbInput = ref('')

const thumbChange = (e) => {
  let reader = new FileReader()
  reader.onload = (e) => {
    thumbEl.value.src = e.target.result
  }
  reader.readAsDataURL(e.target.files[0])
}

currentTravel.value = store.state.travelsModule.travels.find(
  (travel) => travel._id == router.currentRoute.value.params.travel_id
)
if (!currentTravel.value) {
  router.push('/')
  currentTravel.value = {}
}
if (currentTravel.value) {
  travelsModule.landmark = currentTravel.value.landmark
  travelsModule.country = currentTravel.value.country
}

const update = () => {
  if (travelsModule.canUpdate) {
    store.commit('updateTravel', thumbInput.value.files[0])
  }
}
</script>

<style lang="scss" scoped>
.updateTravel {
  padding: 20px;
  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    max-width: 500px;
    h2 {
      font-size: 30px;
      text-transform: capitalize;
      font-weight: 600;
      margin-bottom: 20px;
    }
    .input {
      display: flex;
      flex-direction: column;
      gap: 5px;
      width: 100%;
      span {
        text-transform: capitalize;
        color: rgba(0, 0, 0, 0.413);
        font-size: 16px;
      }
      input:not([type='file']),
      .thumbInput {
        font-size: 15px;
        width: 100%;

        height: 40px;
        padding: 7px;
        background: #e7f0f4;
        border-radius: 4px;
        border: none;
        &::placeholder,
        &.thumbInput {
          text-transform: capitalize;
          color: #608ea8;
        }
      }
    }
    .thumbInput {
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      input {
        display: none;
        appearance: none;
      }
    }
    .currentThumbnail {
      height: 200px;
      border: 2px dotted lightgray;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      img {
        width: 100%;
        min-height: 100%;
        max-height: 200px;
        object-fit: cover;
      }
    }
    button {
      float: right;
    }
  }
}
</style>
