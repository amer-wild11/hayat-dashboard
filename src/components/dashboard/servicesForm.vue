<template>
  <div class="servicesForm" v-if="servicesModule.servicesForm">
    <div class="form">
      <div class="close" @click="servicesModule.servicesForm = false">
        <fa-icon icon="xmark" />
      </div>
      <div class="image">
        <label for="imageInput" ref="imageInputContainer" class="imageInputContainer">
          <input type="file" id="imageInput" ref="imageInput" @change="imageChanged" />
          <span>service icon here</span>
          <fa-icon icon="image" />
        </label>
        <img src="" alt="" ref="image" />
      </div>
      <input type="text" v-model="title" ref="titleInput" class="title" placeholder="Title" />
      <textarea v-model="desc" ref="descInput" class="desc" placeholder="Description"></textarea>
      <div class="btn">
        <button v-html="upload" @click="postService"></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const servicesModule = store.state.servicesModule
const upload = ref('upload')
const image = ref('')
const imageInputContainer = ref('')
const title = ref('')
const titleInput = ref('')
const desc = ref('')
const descInput = ref('')

const imageInput = ref('')

const imageChanged = (e) => {
  let reader = new FileReader()
  reader.onload = (e) => {
    image.value.src = e.target.result
  }
  reader.readAsDataURL(e.target.files[0])
}

const postService = () => {
  if (title.value == '') {
    titleInput.value.style.borderColor = 'red'
  } else {
    titleInput.value.style.borderColor = 'lightgray'
  }
  if (desc.value == '') {
    descInput.value.style.borderColor = 'red'
  } else {
    descInput.value.style.borderColor = 'lightgray'
  }
  if (imageInput.value.files.length < 1) {
    imageInputContainer.value.style.borderColor = 'red'
  } else {
    imageInputContainer.value.style.borderColor = 'lightgray'
  }
  if(title.value != '' && desc.value != '' && imageInput.value.files.length > 0) {
    let formData = new FormData()
    formData.append('title', title.value)
    formData.append('desc', desc.value)
    formData.append('image', imageInput.value.files[0])
    store.commit('postService', formData)
  }
}
</script>

<style scoped lang="scss">
.servicesForm {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding-top: 100px;
  background: rgba(0, 0, 0, 0.296);
  .form {
    width: 400px;
    height: 300px;
    background: rgb(40, 40, 40);
    border: 1px solid lightgray;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    position: relative;
    @media (max-width: 500px) {
      width: 86%;
    }
    .close {
      width: 30px;
      height: 30px;
      position: absolute;
      top: -30px;
      right: -30px;
      border-radius: 50%;
      background: white;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: black;
    }
    .image {
      max-width: 100px;
      min-height: 100px;
      position: relative;
      .imageInputContainer {
        display: flex;
        cursor: pointer;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        width: 80%;
        height: 80%;
        border: 1.6px dotted lightgray;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 16px;
        text-transform: capitalize;
        z-index: 1;
        input {
          appearance: none;
          display: none;
        }
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0.5;
      }
    }
    input,
    textarea {
      padding: 4px;
      resize: none;
      width: 100%;
      border: 1px solid lightgray;
      background: none;
      color: white;
      border-radius: 5px;
      &::placeholder {
        color: lightgray;
      }
    }
    textarea {
      height: 100%;
    }
    button {
      float: right;
      width: 100px;
      height: 30px;
      border: none;
      background-color: green;
      color: white;
      border-radius: 2px;
      text-transform: capitalize;
      cursor: pointer;
    }
  }
}
</style>
