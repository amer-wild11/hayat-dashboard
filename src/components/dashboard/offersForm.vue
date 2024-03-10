<template>
  <div class="offersForm" v-if="store.state.offersModule.offersForm">
    <div class="form">
      <div class="close" @click="store.state.offersModule.offersForm = false">
        <fa-icon icon="xmark" />
      </div>
      <div class="upload">
        <button @click="upload">upload</button>
      </div>
      <label for="thumbnail" class="image" ref="thumbEl">
        <span>upload your thumbnail</span>
        <fa-icon icon="image" />
        <input type="file" id="thumbnail" @change="setThumb" ref="thumbInput" />
      </label>
      <div class="thumbnail">
        <img src="/offer.png" alt="" ref="thumbnailImg" />
      </div>
      <div class="content">
        <div class="name-offer">
          <input type="text" class="name" v-model="name" ref="nameInput" />
          <div class="offer">
            <input type="number" max="100" min="0" v-model="offer" />
            %off
          </div>
        </div>
        <div class="location">
          <img src="/Location-offer.png" alt="" />
          <input type="text" id="location" v-model="location" ref="locationInput" />
        </div>
        <textarea
          name="desc"
          id="desc"
          v-model="desc"
          ref="descInput"
          placeholder="offer description"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const thumbEl = ref('')

const thumbnailImg = ref('')
const thumbInput = ref('')

const setThumb = (e) => {
  let reader = new FileReader()
  reader.onload = (e) => {
    thumbnailImg.value.src = e.target.result
  }
  reader.readAsDataURL(e.target.files[0])
}

const nameInput = ref('')
const locationInput = ref('')
const descInput = ref('')

const name = ref('')
const offer = ref('')
const location = ref('')
const desc = ref('')

const upload = () => {
  if (name.value == '') {
    nameInput.value.style.borderColor = 'red'
  } else {
    nameInput.value.style.borderColor = 'black'
  }
  if (desc.value == '') {
    descInput.value.style.borderColor = 'red'
  } else {
    descInput.value.style.borderColor = 'black'
  }
  if (location.value == '') {
    locationInput.value.style.borderColor = 'red'
  } else {
    locationInput.value.style.borderColor = 'black'
  }
  if (thumbInput.value.files.length < 1) {
    thumbEl.value.style.borderColor = 'red'
    thumbEl.value.style.color = 'red'
  } else {
    thumbEl.value.style.color = 'white'
    thumbEl.value.style.borderColor = 'lightgray'
  }
  if (name.value != '' && location.value != '' && thumbInput.value.files.length > 0) {
    let formData = new FormData()
    formData.append('title', name.value)
    formData.append('location', location.value)
    formData.append('offer', offer.value)
    formData.append('desc', desc.value)
    formData.append('thumbnail', thumbInput.value.files[0])
    store.commit('postOffer', formData)
  }
}
</script>

<style scoped lang="scss">
.offersForm {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.369);
  .form {
    background: white;
    width: 380px;
    height: 420px;
    border-top-right-radius: 40px;
    display: flex;
    flex-direction: column;
    position: relative;
    @media (max-width: 440px) {
      width: 90%;
    }
    .close {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      position: absolute;
      top: -20px;
      right: -20px;
      background: white;
      color: black;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .upload {
      position: absolute;
      bottom: -40px;
      right: 0px;
      button {
        width: 100px;
        height: 30px;
        border: none;
        background: rgb(26, 136, 42);
        color: white;
        cursor: pointer;
        border-radius: 2px;
      }
    }
    textarea {
      width: 98%;
      padding: 4px;
      background-color: none;
      border: 1px solid rgba(23, 23, 23, 0.418);
      max-height: 100px;
      min-height: 40px;
      border-radius: 5px;
      resize: vertical;
    }
    .image {
      position: absolute;
      top: 30px;
      left: 50%;
      transform: translate(-50%);
      border: 1px dotted lightgray;
      width: 170px;
      height: 150px;
      background: rgba(0, 0, 0, 0.341);
      display: flex;
      flex-direction: column;
      text-align: center;
      padding: 4px;
      text-transform: capitalize;
      font-size: 15px;
      cursor: pointer;
      input {
        appearance: none;
        display: none;
      }
    }
    .thumbnail {
      width: 100%;
      height: 60%;
      overflow: hidden;
      border-top-right-radius: 40px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .content {
      padding: 20px 10px 10px 10px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      input {
        border: 1px solid lightgray;
        padding: 3px;
        background-color: none;
      }
      .name-offer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
        .name {
          font-family: 'Inter', sans-serif;
          font-size: 20px;
          font-weight: bold;
          min-width: 100px;
        }
        .offer {
          display: flex;
          align-items: center;
          color: #8b2cf5;
          font-size: 15px;
          input {
            text-align: center;
            font-weight: bold;
            width: 50px;
          }
        }
      }
      .location {
        display: flex;
        align-items: center;
        gap: 10px;
        img {
          width: 30px;
        }
      }
    }
  }
}
</style>
