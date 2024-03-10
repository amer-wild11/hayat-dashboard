<template>
  <div class="postOffer">
    <h2>post new offer</h2>
    <form @submit.prevent="postOffer">
      <div class="input">
        <span>title</span>
        <input type="text" placeholder="Offer Title" required v-model="title" />
      </div>
      <div class="group">
        <div class="input">
          <span>location</span>
          <input type="text" placeholder="Location" required v-model="location" />
        </div>
        <div class="input">
          <span>offer</span>
          <input
            type="number"
            placeholder="Offer"
            required
            v-model="offer"
            @input="validateOffer"
          />
        </div>
      </div>
      <div class="input">
        <span>offer description</span>
        <textarea
          type="text"
          placeholder="Descripe your offer for more details"
          required
          v-model="desc"
        ></textarea>
      </div>
      <!-- <div class="thumbnailContainer">
        <label for="thumbnail" class="input thumbnail">
          <span>thumbnail</span>
          <fa-icon icon="image" />
          <input type="file" id="thumbnail" ref="thumbnailInput" @change="thumbnailChanged" />
        </label>
        <div class="thumb" ref="thumbnailContainer">
          <img src="" alt="" ref="thumbnail" />
        </div>
      </div> -->
      <div class="imagesDisplayContainer">
        <span>images to display & thumbnail</span>
        <div class="imagesDisplay">
          <label class="input" for="display_images_input">
            <span>choose 6 images</span>
            <fa-icon icon="images" />
            <input
              type="file"
              id="display_images_input"
              ref="display_images_input"
              multiple
              @change="setDimages"
            />
          </label>
          <div class="container">
            <div
              :for="`displayImage-${image.id}`"
              v-for="image in displayImages"
              :key="image"
              class="image"
            >
              <img :src="image.src" alt="" v-if="image.src != ''" />
            </div>
          </div>
        </div>
      </div>
      <div class="btn">
        <button v-html="offersModule.postButton" class="button"></button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const offersModule = store.state.offersModule
const title = ref('')
const desc = ref('')
const location = ref('')
const offer = ref('')
const display_images_input = ref('')

const validateOffer = () => {
  if (offer.value > 100) {
    offer.value = 100
  }
  if (offer.value < 0) {
    offer.value = 0
  }
  if (typeof offer.value == 'string') {
    offer.value = 0
  }
}

const displayImages = ref([])

const setDimages = (e) => {
  if (e.target.files.length == 6) {
    const images = Array.from(e.target.files).slice(0, 6)

    images.forEach((im) => {
      let reader = new FileReader()
      reader.onload = (e) => {
        im.src = e.target.result
        displayImages.value.push(im)
      }
      reader.readAsDataURL(im)
    })
    console.log(displayImages.value)
  } else {
    alert('please choose just 6 images')
  }
}

const postOffer = async () => {
  if (display_images_input.value.files.length == 6) {
    let formData = new FormData()
    formData.append('title', title.value)
    formData.append('desc', desc.value)
    formData.append('location', location.value)
    formData.append('offer', offer.value)
    for (let i = 0; i < display_images_input.value.files.length; i++) {
      formData.append('images', display_images_input.value.files[i])
    }
    store.commit('postOffer', formData)
  }
}
</script>

<style lang="scss" scoped>
h2 {
  text-transform: capitalize;
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 20px;
}
form {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 700px;
  .group {
    display: flex;
    align-items: center;
    gap: 30px;
  }
  .input {
    display: flex;
    flex-direction: column;
    gap: 4px;
    span {
      text-transform: capitalize;
      font-weight: 600;
      font-size: 15px;
    }
    input,
    textarea,
    &.thumbnail {
      height: 30px;
      padding: 4px;
      border: 1px solid #5c8aa1;
      border-radius: 5px;
      background-color: rgba(209, 231, 251, 0.135);
      resize: none;
      &::placeholder {
        color: rgba(0, 0, 0, 0.522);
      }
    }
    textarea {
      height: 140px;
    }
    &.thumbnail {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
      padding: 0 10px;
      height: 40px;
      background-color: rgba(173, 216, 230, 0.152);
      cursor: pointer;
    }
    #thumbnail {
      display: none;
      appearance: none;
    }
  }
  .thumbnailContainer {
    display: flex;
    flex-direction: column;
    gap: 10px;
    .thumb {
      width: 100%;
      height: 300px;
      border: 2px dotted lightgray;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .imagesDisplayContainer {
    display: flex;
    flex-direction: column;
    gap: 10px;
    > span {
      text-transform: capitalize;
      font-weight: 600;
      font-size: 20px;
    }
    .imagesDisplay {
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 100%;
      .input {
        width: 100%;
        height: 40px;
        background: #5c8aa129;
        border: 1px solid #5c8aa1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
        padding: 0 10px;
        border-radius: 10px;
        color: #5c8aa1;
        cursor: pointer;
        span {
          font-weight: 100;
          font-size: 14px;
        }
        input {
          display: none;
          appearance: none;
        }
      }
      .container {
        display: flex;
        align-items: center;
        gap: 10px;
        .image {
          width: 100px;
          height: 100px;
          border: 2px dotted lightgray;
          cursor: pointer;
          input {
            appearance: none;
            display: none;
          }
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
    }
  }
  .btn {
    height: 30px;
    button {
      float: right;
    }
  }
}
</style>
