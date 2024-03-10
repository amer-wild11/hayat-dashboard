<template>
  <div class="postHotel">
    <h2>create a new hotel</h2>
    <form @submit.prevent="upload">
      <div class="input">
        <span>hotel name</span>
        <input type="text" placeholder="name" v-model="name" required />
      </div>
      <div class="input">
        <span>hotel location</span>
        <input type="text" placeholder="location" v-model="location" required />
      </div>
      <div class="input">
        <span>hotel description</span>
        <textarea type="text" placeholder="description" v-model="desc" required></textarea>
      </div>
      <div class="rating">
        <span>hotel rating</span>
        <div class="stars">
          <fa-icon
            icon="star"
            :class="['star', star.choosen ? 'active' : '']"
            v-for="star in stars"
            :key="star"
            @click="setRate(star.index)"
          />
        </div>
      </div>
      <div class="thumbnail">
        <span>hotel thumbnail</span>
        <label class="thumbInput" ref="thumbContainer" for="thumbInput">
          <span>thumbnail</span>
          <fa-icon icon="image" />
          <input type="file" id="thumbInput" ref="thumbInput" @change="thumbChanged" />
        </label>
        <div class="thumbEl" ref="thumbWrapper">
          <img src="" alt="" ref="thumbEl" />
        </div>
      </div>
      <div class="disImages">
        <span>images for display just 5 required</span>
        <label class="disImagesInput" for="imagesInput">
          <span>images here</span>
          <fa-icon icon="images" />
          <input type="file" id="imagesInput" ref="imagesInput" @change="setImages" multiple />
        </label>
        <div class="images" ref="imagesContainer">
          <img :src="img.src" v-for="img in images" :key="img" alt="" />
        </div>
      </div>
      <div class="btn">
        <button
          :class="['button', hotelsMd.canPost ? '' : 'cantPost']"
          v-html="hotelsMd.postButton"
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
const hotelsMd = store.state.hotelsModule
const location = ref('')
const name = ref('')
const desc = ref('')
const thumbInput = ref('')
const thumbContainer = ref('')
const thumbWrapper = ref('')
const thumbEl = ref('')
const stars = ref('')
const imagesInput = ref('')
const imagesContainer = ref('')
const images = ref([])

stars.value = [
  {
    index: 1,
    choosen: true
  },
  {
    index: 2,
    choosen: false
  },
  {
    index: 3,
    choosen: false
  },
  {
    index: 4,
    choosen: false
  },
  {
    index: 5,
    choosen: false
  }
]

const thumbChanged = (e) => {
  let reader = new FileReader()
  reader.onload = (e) => {
    thumbEl.value.src = e.target.result
  }
  reader.readAsDataURL(e.target.files[0])
}

const setImages = (e) => {
  if (e.target.files.length == 5) {
    let files = Array.from(e.target.files)
    files.forEach((file) => {
      let reader = new FileReader()
      reader.onload = (e) => {
        let img = {
          src: e.target.result
        }
        images.value.push(img)
      }
      reader.readAsDataURL(file)
    })
  } else {
    alert('5 images required')
  }
}

const setRate = (i) => {
  let active = stars.value.slice(0, i)
  let notActive = stars.value.slice(i)
  active.forEach((a) => {
    a.choosen = true
  })
  notActive.forEach((n) => {
    n.choosen = false
  })
}

const upload = () => {
  if (hotelsMd.canPost) {
    if (thumbInput.value.files.length < 1) {
      thumbWrapper.value.style.borderColor = 'red'
    } else {
      thumbWrapper.value.style.borderColor = 'lightgray'
    }
    if (imagesInput.value.files.length < 1) {
      imagesContainer.value.style.borderColor = 'red'
    } else {
      imagesContainer.value.style.borderColor = 'lightgray'
    }
    if (thumbInput.value.files.length > 0 && imagesInput.value.files.length > 0) {
      let data = new FormData()
      data.append('name', name.value)
      data.append('desc', desc.value)
      data.append('location', location.value)
      data.append('rate', stars.value.filter((st) => st.choosen == true).length)
      data.append('thumbnail', thumbInput.value.files[0])
      for (let i = 0; i < imagesInput.value.files.length; i++) {
        data.append('display_images', imagesInput.value.files[i])
      }
      store.commit('postHotel', data)
    }
  }
}
</script>

<style lang="scss" scoped>
.postHotel {
  width: 100%;
  max-width: 500px;
  h2 {
    font-weight: bold;
    font-size: 30px;
    text-transform: capitalize;
    margin-bottom: 30px;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    .input {
      display: flex;
      flex-direction: column;
      gap: 15px;
      span {
        font-size: 15px;
        font-weight: bold;
        text-transform: capitalize;
      }
      input,
      textarea {
        padding: 5px;
        width: 100%;
        height: 35px;
        border-radius: 5px;
        background: #faac6d27;
        color: rgb(103, 91, 69);
        border: 1px solid rgb(235, 194, 118);
        &::placeholder {
          color: #e6bc92;
          text-transform: capitalize;
        }
      }
      textarea {
        width: 100%;
        height: 100px;
        resize: none;
      }
    }
    .rating {
      display: flex;
      flex-direction: column;
      gap: 10px;
      > span {
        font-weight: bold;
        font-size: 15px;
        text-transform: capitalize;
      }
      .stars {
        display: flex;
        align-items: center;
        gap: 5px;
        .star {
          font-size: 20px;
          cursor: pointer;
          color: rgba(246, 215, 39, 0.554);
          &.active {
            color: rgb(246, 182, 19);
          }
        }
        .rate {
          font-size: 15px;
        }
      }
    }
    .thumbnail {
      display: flex;
      flex-direction: column;
      gap: 10px;
      > span {
        font-weight: bold;
        font-size: 15px;
        text-transform: capitalize;
      }
      .thumbInput {
        width: 100%;
        height: 36px;
        border-radius: 5px;
        background: #faac6d27;
        padding: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        span {
          font-size: 15px;
          text-transform: capitalize;
        }
        input {
          display: none;
          appearance: none;
        }
      }
      .thumbEl {
        width: 100%;
        height: 200px;
        border: 3px dotted lightgray;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
    .disImages {
      display: flex;
      flex-direction: column;
      gap: 10px;
      > span {
        font-weight: bold;
        font-size: 15px;
        text-transform: capitalize;
      }
      .disImagesInput {
        width: 100%;
        height: 36px;
        border-radius: 5px;
        background: #faac6d27;
        padding: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        span {
          font-size: 15px;
          text-transform: capitalize;
        }
        input {
          display: none;
          appearance: none;
        }
      }
      .images {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;
        height: 100px;
        overflow: auto;
        img {
          width: calc(20% - 10px);
          min-width: 80px;
          height: 80px;
          object-fit: cover;
          border: 2px dotted lightgray;
        }
      }
    }
  }
}
</style>
