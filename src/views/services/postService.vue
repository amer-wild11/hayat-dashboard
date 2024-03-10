<template>
  <div class="postService">
    <h2>post a new service</h2>
    <form @submit.prevent="upload">
      <div class="input">
        <span>service title</span>
        <input type="text" placeholder="title" required v-model="title" />
      </div>
      <div class="input">
        <span>service description</span>
        <textarea type="text" placeholder="description" required v-model="desc"></textarea>
      </div>
      <div class="servIcon">
        <span>service icon</span>
        <label class="input serviceIcon" for="servIcon">
          <span>your service icon</span>
          <fa-icon icon="image" />
          <input type="file" id="servIcon" ref="iconInput" @change="iconChanged" />
        </label>
        <div class="iconContainer" ref="iconContainerWrapper">
          <img src="" alt="" ref="iconContainer" />
        </div>
      </div>
      <div class="btn">
        <button
          v-html="servicesModule.postButton"
          :class="['button', servicesModule.canPost ? '' : 'cantPost']"
          style="float: right"
        ></button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const servicesModule = store.state.servicesModule
const iconContainer = ref('')
const iconContainerWrapper = ref('')
const iconInput = ref('')
const title = ref('')
const desc = ref('')

const iconChanged = (e) => {
  let reader = new FileReader()
  reader.onload = (e) => {
    iconContainer.value.src = e.target.result
  }
  reader.readAsDataURL(e.target.files[0])
}

const upload = () => {
  if (servicesModule.canPost) {
    if (iconInput.value.files.length < 1) {
      iconContainerWrapper.value.style.borderColor = 'red'
    } else {
      iconContainerWrapper.value.style.borderColor = 'lightgray'
    }
    if (iconInput.value.files.length > 0) {
      let formData = new FormData()
      formData.append('title', title.value)
      formData.append('desc', desc.value)
      formData.append('image', iconInput.value.files[0])
      store.commit('postService', formData)
    }
  }
}
</script>

<style lang="scss" scoped>
.postService {
  h2 {
    text-transform: capitalize;
    font-size: 30px;
    font-weight: bold;
  }
  form {
    width: 90%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 60px;
    .input {
      display: flex;
      flex-direction: column;
      gap: 10px;
      span {
        font-size: 15px;
        font-weight: bold;
        text-transform: capitalize;
      }
      input,
      textarea {
        resize: none;
        width: 100%;
        height: 35px;
        border-radius: 5px;
        background: #92caff11;
        border: #0084ffd9 1px solid;
        padding: 5px;
        &::placeholder {
          color: #0084ff8f;
          text-transform: capitalize;
        }
      }
      textarea {
        height: 100px;
      }
    }
    .servIcon {
      display: flex;
      flex-direction: column;
      gap: 10px;
      span {
        text-transform: capitalize;
        font-weight: bold;
        font-size: 15px;
      }
      .serviceIcon {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 35px;
        padding: 5px;
        background: #92caff11;
        border: #0084ffd9 1px solid;
        color: #0084ff8f;
        text-transform: capitalize;
        cursor: pointer;
        input {
          display: none;
          appearance: none;
        }
      }
      .iconContainer {
        width: 70px;
        height: 70px;
        float: left;
        border: 2px dotted lightgray;
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
