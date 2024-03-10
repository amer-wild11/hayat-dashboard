<template>
  <main>
    <div class="updateTravel">
      <form class="form" action="POST" @submit.prevent="upload">
        <h2>post new travel</h2>
        <div class="input">
          <span>landmark</span>
          <input type="text" placeholder="e.g. paris" v-model="landmark" ref="landmarkInput" />
        </div>
        <div class="input">
          <span>country</span>
          <input type="text" placeholder="e.g. france" v-model="country" ref="countryInput" />
        </div>
        <div class="input">
          <span>thumbnail</span>
          <label class="thumbInput" for="thumbnail" ref="thumbInputer">
            <span>choose file</span>
            <fa-icon icon="image" />
            <input type="file" id="thumbnail" @change="thumbChange" ref="thumbInput" />
          </label>
        </div>
        <div class="currentThumbnail">
          <img src="" alt="" ref="thumbEl" />
        </div>
        <div class="btn">
          <button
            v-html="travelsModule.postButton"
            :class="['button', travelsModule.canPost ? '' : 'cantPost']"
          ></button>
        </div>
      </form>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const travelsModule = store.state.travelsModule
const thumbEl = ref('')
const thumbInput = ref('')
const thumbInputer = ref('')
const landmark = ref('')
const country = ref('')
const landmarkInput = ref('')
const countryInput = ref('')

const thumbChange = (e) => {
  let reader = new FileReader()
  reader.onload = (e) => {
    thumbEl.value.src = e.target.result
  }
  reader.readAsDataURL(e.target.files[0])
}

const upload = () => {
  if (landmark.value == '') {
    landmarkInput.value.style.borderColor = '#f55757'
  } else {
    landmarkInput.value.style.borderColor = 'transparent'
  }
  if (country.value == '') {
    countryInput.value.style.borderColor = '#f55757'
  } else {
    countryInput.value.style.borderColor = 'transparent'
  }
  if (thumbInput.value.files.length < 1) {
    thumbInputer.value.style.borderColor = '#f55757'
  } else {
    thumbInputer.value.style.borderColor = 'transparent'
  }
  if (
    landmark.value != '' &&
    country.value != '' &&
    thumbInput.value.files.length > 0 &&
    travelsModule.canPost
  ) {
    let formData = new FormData()
    formData.append('thumbnail', thumbInput.value.files[0])
    formData.append('landmark', landmark.value)
    formData.append('country', country.value)
    store.commit('postTravel', formData)
    store.state.travelsModule.canPost = false
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
        border: 1px solid transparent;
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
        height: 100%;
        object-fit: cover;
      }
    }
    button {
      float: right;
    }
  }
}
</style>
