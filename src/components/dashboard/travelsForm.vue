<template>
  <div class="travelsForm" v-if="store.state.travelsModule.travelsForm">
    <div class="form">
      <div class="close" @click="store.state.travelsModule.travelsForm = false">
        <fa-icon icon="xmark" />
      </div>
      <label for="imageInput" class="imgInput" ref="thumbCont">
        <span>thumbnail here <fa-icon icon="image" /></span>
        <div class="input">
          <input type="file" id="imageInput" @change="thumbChange" ref="thumbInput" />
        </div>
      </label>
      <div class="thumbnail">
        <img src="/travel-1.png" alt="" ref="thumbnail" />
      </div>
      <div class="content">
        <input class="landmark" value="landmark" ref="landmarkInput" v-model="landmark" />
        <input class="country" value="country" ref="countryInput" v-model="country" />
      </div>
    </div>
    <div class="btn">
      <button v-html="uploadBtnContent" @click="upload"></button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'

const thumbnail = ref('')
const store = useStore()

const landmarkInput = ref('')
const countryInput = ref('')
const thumbInput = ref('')
const thumbCont = ref('')

const landmark = ref('')
const country = ref('')

const thumbChange = (e) => {
  let reader = new FileReader()
  reader.onload = (event) => {
    thumbnail.value.src = event.target.result
  }
  reader.readAsDataURL(e.target.files[0])
}

const upload = () => {
  if (landmark.value == '') {
    landmarkInput.value.style.borderColor = '#f04444'
  } else {
    landmarkInput.value.style.borderColor = 'lightgray'
  }
  if (country.value == '') {
    countryInput.value.style.borderColor = '#f04444'
  } else {
    countryInput.value.style.borderColor = 'lightgray'
  }
  if (thumbInput.value.files.length < 1) {
    thumbCont.value.style.borderColor = '#f04444'
  } else {
    thumbCont.value.style.borderColor = 'lightgray'
  }
  if (landmark.value != '' && country.value != '' && thumbInput.value.files.length > 0) {
    let formData = new FormData()
    formData.append('landmark', landmark.value)
    formData.append('country', country.value)
    formData.append('image', thumbInput.value.files[0])
    landmark.value = ''
    country.value = ''
    store.commit('postTravel', formData)
  }
}

const uploadBtnContent = ref('upload')
</script>

<style lang="scss" scoped>
.travelsForm {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.379);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  z-index: 999;
  padding-top: 50px;
  gap: 10px;
  .form {
    width: 400px;
    height: 600px;
    border-radius: 34px;
    background: rgb(32, 84, 101);
    position: relative;
    @media (max-width: 767px) {
      width: 300px;
      height: 500px;
    }
    @media (max-width: 400px) {
      width: 90%;
    }
    .close {
      position: absolute;
      top: -14px;
      right: -14px;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: white;
      color: black;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 99;
      cursor: pointer;
    }
    .imgInput {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, 0.397);
      border-radius: 10px;
      border: 2px dotted lightgray;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      span {
        display: flex;
        flex-direction: column;
        font-size: 23px;
        color: white;
        text-transform: capitalize;
        font-weight: 500;
      }
      input {
        appearance: none;
        display: none;
      }
    }
    .thumbnail {
      width: 100%;
      height: 100%;
      overflow: hidden;
      border-radius: 34px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .content {
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 10px;
      width: 80%;
      .landmark,
      .country {
        font-family: 'DM Serif Text';
        background: none;
        border: 1.5px dotted lightgray;
        width: 100%;
        height: 70px;
        resize: none;
        color: white;
        text-align: center;
      }
      .landmark {
        font-size: 40px;
        font-weight: 500;
      }
      .country {
        font-size: 25px;
        font-weight: 300;
        height: 50px;
      }
    }
  }
  .btn {
    button {
      width: 200px;
      height: 40px;
      font-size: 23px;
      background: rgb(11, 109, 44);
      border: none;
      border-radius: 3px;
      color: white;
      text-transform: capitalize;
      font-weight: 500;
      cursor: pointer;
    }
  }
}
</style>
