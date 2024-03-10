<template>
  <div class="updateTrip" v-if="currentTrip">
    <h2>update trip</h2>
    <form @submit.prevent="upload">
      <div class="input">
        <span>trip name</span>
        <input type="text" name="name" id="name" v-model="name" />
      </div>
      <div class="input">
        <span>trip location</span>
        <input type="text" name="location" id="location" v-model="loc" />
      </div>
      <div class="input">
        <span>trip description</span>
        <textarea name="desc" id="desc" v-model="desc"></textarea>
      </div>
      <div class="stars">
        <fa-icon
          icon="star"
          :class="['star', star.choosen ? 'active' : '']"
          v-for="star in stars"
          :key="star"
          @click="setRate(star.id)"
        />
      </div>
      <div class="thumbnail">
        <span>thumbnail</span>
        <label for="thumbInput" class="thumbInput">
          <span>new thumbnail here</span>
          <fa-icon icon="image" />
          <input type="file" ref="thumbInput" id="thumbInput" @change="setThumb" />
        </label>
        <div class="thumbEl">
          <img :src="store.state.url + '/' + currentTrip.thumbnail.path" ref="thumbEl" alt="" />
        </div>
      </div>
      <div class="btn">
        <button
          class="button"
          @click="[router.push('/travel&tourism/trips'), (shouldUpload = false)]"
        >
          cancel
        </button>
        <button
          v-html="store.state.tripsModule.updateButton"
          :class="['button', tripsMd.canUpdate ? '' : 'cantPost']"
        ></button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()
const currentRoute = useRouter().currentRoute.value
const trips = store.state.tripsModule.trips
const tripsMd = store.state.tripsModule
const currentTrip = trips.find((t) => t._id == currentRoute.params.trip_id)
const stars = ref('')
const name = ref('')
const loc = ref('')
const desc = ref('')
const thumbInput = ref('')
const thumbEl = ref('')
const shouldUpload = ref(true)

stars.value = [
  {
    choosen: true,
    id: 1
  },
  {
    choosen: false,
    id: 2
  },
  {
    choosen: false,
    id: 3
  },
  {
    choosen: false,
    id: 4
  },
  {
    choosen: false,
    id: 5
  }
]

if (currentTrip) {
  loc.value = currentTrip.location
  name.value = currentTrip.name
  desc.value = currentTrip.desc
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

const setThumb = (e) => {
  let reader = new FileReader()
  reader.onload = (e) => {
    thumbEl.value.src = e.target.result
  }
  reader.readAsDataURL(e.target.files[0])
}

const upload = () => {
  if (shouldUpload.value) {
    if (tripsMd.canUpdate) {
      let data = new FormData()
      data.append('name', name.value)
      data.append('desc', desc.value)
      data.append('location', loc.value)
      data.append('rate', stars.value.filter((s) => s.choosen == true).length)
      data.append('thumbnail', thumbInput.value.files[0])
      store.commit('updateTrip', data)
    }
  }
}
</script>

<style lang="scss" scoped>
.updateTrip {
  h2 {
    font-size: 30px;
    font-weight: bold;
    text-transform: capitalize;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 40px;
    width: 100%;
    max-width: 600px;
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
        padding: 5px;
        width: 100%;
        height: 30px;
        border: 1px solid rgba(196, 136, 26, 0.664);
        background: rgba(255, 166, 0, 0.109);
        border-radius: 5px;
        resize: none;
      }
      textarea {
        height: 100px;
      }
    }
    .stars {
      display: flex;
      align-items: center;
      gap: 6px;
      .star {
        font-size: 20px;
        color: rgba(255, 208, 0, 0.171);
        cursor: pointer;
        &.active {
          color: rgb(255, 208, 0);
        }
      }
    }
    .btn {
      display: flex;
      align-items: center;
      justify-content: end;
      gap: 10px;
      button:first-child {
        background-color: rgba(0, 162, 255, 0.13);
        color: black;
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
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5px;
        text-transform: capitalize;
        background: rgba(255, 166, 0, 0.109);
        border-radius: 4px;
        border: 1px solid rgba(196, 136, 26, 0.664);
        cursor: pointer;
        color: rgb(169, 144, 6);
        input {
          display: none;
          appearance: none;
        }
      }
      .thumbEl {
        width: 100%;
        height: 250px;
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
