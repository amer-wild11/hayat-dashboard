<template>
  <div class="updateOffer">
    <h2>update offer your offer</h2>
    <form @submit.prevent="update">
      <div class="input">
        <span>offer title</span>
        <input type="text" v-model="title" />
      </div>
      <div class="group">
        <div class="input">
          <span>location</span>
          <input type="text" v-model="location" />
        </div>
        <div class="input">
          <span>offer</span>
          <input type="number" @input="validateOffer" v-model="offer" />
        </div>
      </div>
      <div class="input">
        <span>offer description</span>
        <textarea type="text" v-model="desc"></textarea>
      </div>
      <div class="offerImages">
        <label
          :for="`imageInput-${i}`"
          class="image"
          v-for="(image, i) in currentOffer.images"
          :key="image"
        >
          <input type="file" :id="`imageInput-${i}`" @change="setNewImage(i, $event, image)" />
          <img :src="store.state.url + '/' + image.path" alt="" :id="`image-${i}`" />
        </label>
      </div>
      <div class="btn">
        <button v-html="store.state.offersModule.updateButton" class="button"></button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()
const offer = ref('')
const title = ref('')
const location = ref('')
const desc = ref('')
const currentOffer = ref('')
const imagesToUpdate = ref([])

currentOffer.value = store.state.offersModule.offers.find(
  (of) => of._id == router.currentRoute.value.params.offer_id
)
if (!currentOffer.value) {
  router.push('/offers')
} else {
  title.value = currentOffer.value.title
  desc.value = currentOffer.value.desc
  offer.value = currentOffer.value.offer
  location.value = currentOffer.value.location
}

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

// const setNewImage = (i, e) => {
//   let reader = new FileReader()
//   reader.onload = (e) => {
//     document.querySelector(`#image-${i}`).src = e.target.result
//   }
//   reader.readAsDataURL(e.target.files[0])
//   e.target.files[0].filename = currentOffer.value.images[i].filename
//   imagesToUpdate.value = currentOffer.value.images
//   imagesToUpdate.value[i] = e.target.files[0]
// }

const update = () => {
  let imageInputs = document.querySelectorAll('.image > input[type=file]')
  if (Array.from(imageInputs).every((input) => input.files.length < 1)) {
    imagesToUpdate.value = currentOffer.value.images
  }
  let formData = new FormData()
  formData.append('title', title.value)
  formData.append('desc', desc.value)
  formData.append('location', location.value)
  formData.append('offer', offer.value)
  store.commit('updateOffer', formData)
}
</script>

<style lang="scss" scoped>
.updateOffer {
  h2 {
    text-transform: capitalize;
    font-weight: bold;
    font-size: 30px;
  }
  form {
    max-width: 700px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 40px;
    .group {
      display: flex;
      gap: 20px;
    }
    .input {
      display: flex;
      flex-direction: column;
      gap: 6px;
      span {
        font-size: 15px;
        font-weight: bold;
        text-transform: capitalize;
      }
      input,
      textarea {
        resize: none;
        padding: 4px;
        height: 35px;
        background: #2c82b10f;
        border: 1px solid #2c82b18b;
        border-radius: 4px;
        &::placeholder {
          color: #2c82b1f8;
          text-transform: capitalize;
        }
      }
      textarea {
        height: 100px;
      }
    }
    .offerImages {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 30px;
      .image {
        width: 80px;
        height: 80px;
        border: 2px dotted lightgray;
        cursor: pointer;
        input {
          display: none;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
    button {
      float: right;
    }
  }
}
</style>
