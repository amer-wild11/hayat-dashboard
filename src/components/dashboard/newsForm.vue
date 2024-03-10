<template>
  <div class="newsForm" v-if="newsModule.newsForm">
    <div class="form">
      <div class="close" @click="newsModule.newsForm = false">
        <fa-icon icon="xmark" />
      </div>
      <div class="thumbnail">
        <label for="image" ref="imageInputContainer" class="imageInput">
          <input type="file" id="image" ref="imageInput" @change="imageChanged" />
          <div class="text">
            <span>news image here</span>
            <fa-icon icon="image" />
          </div>
        </label>
        <img src="/travel-1.png" alt="" ref="image" />
      </div>
      <div class="content">
        <input type="text" placeholder="Title" class="title" v-model="title" ref="titleInput" />
        <textarea class="desc" placeholder="Description" v-model="desc" ref="descInput"></textarea>
        <div class="btn">
          <button v-html="upload" @click="postNews"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const newsModule = store.state.newsModule

const image = ref('')
const imageInput = ref('')
const imageInputContainer = ref('')
const title = ref('')
const titleInput = ref('')
const desc = ref('')
const descInput = ref('')
const upload = ref('upload')

const imageChanged = (e) => {
  let reader = new FileReader()
  reader.onload = (e) => {
    image.value.src = e.target.result
  }
  reader.readAsDataURL(e.target.files[0])
}

const postNews = () => {
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
  if (title.value != '' && desc.value != '' && imageInput.value.files.length > 0) {
    let formData = new FormData()
    formData.append('title', title.value)
    formData.append('desc', desc.value)
    formData.append('image', imageInput.value.files[0])
    store.commit('postNews', formData)
  }
}
</script>

<style lang="scss" scoped>
.newsForm {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: start;
  padding-top: 100px;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.205);
  .form {
    width: fit-content;
    width: 600px;
    min-height: 230px;
    display: flex;
    gap: 20px;
    background-color: white;
    color: black;
    border-radius: 10px;
    padding: 5px;
    position: relative;
    @media (max-width: 767px) {
      width: 90%;
      flex-direction: column;
    }
    .close {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      position: absolute;
      top: -24px;
      right: -24px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: white;
      color: black;
      cursor: pointer;
    }
    .thumbnail {
      padding: 10px;
      width: 200px;
      height: 200px;
      border-radius: 4px;
      overflow: hidden;
      position: relative;
      .imageInput {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: 1.7px dotted lightgray;
        background: rgba(0, 0, 0, 0.324);
        padding: 4px;
        width: 60%;
        height: 60%;
        text-transform: capitalize;
        input {
          display: none;
          appearance: none;
        }
        .text {
          display: flex;
          flex-direction: column;
          text-align: center;
          color: white;
          font-size: 20px;
          cursor: pointer;
        }
      }
      img {
        width: 100%;
        object-fit: cover;
      }
    }
    .content {
      font-family: 'Inter', sans-serif;
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 4px 4px 5px 0;
      input,
      textarea {
        border: 1px solid lightgray;
        padding: 4px;
        background: none;
        resize: none;
      }
      button {
        width: 100px;
        height: 30px;
        background: rgb(46, 145, 46);
        border: none;
        border-radius: 5px;
        color: white;
        float: right;
        cursor: pointer;
      }
      .title {
        width: 90%;
        height: 40px;
        font-size: 30px;
        font-weight: bold;
      }
      .desc {
        font-size: 14px;
        width: 90%;
        font-weight: 500;
        flex: 1;
      }
    }
  }
}
</style>
