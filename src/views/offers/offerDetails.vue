<template>
  <div class="offerDetails" v-if="currentOffer">
    <h2>offer details</h2>
    <div class="offer">
      <div class="main">
        <div class="thumbnail">
          <img :src="store.state.url + '/' + currentOffer.images[0].path" alt="" />
        </div>
        <div class="content">
          <span class="title">{{ currentOffer.title }}</span>
          <div class="location-off">
            <span class="location">{{ currentOffer.location }}</span>
            <span class="off">{{ currentOffer.offer }}%off</span>
          </div>
        </div>
      </div>
      <div class="display_images">
        <div class="first">
          <img :src="store.state.url + '/' + currentOffer.images[1].path" alt="" />
        </div>
        <div class="sub">
          <div class="img">
            <img :src="store.state.url + '/' + currentOffer.images[2].path" alt="" />
          </div>
          <div class="img">
            <img :src="store.state.url + '/' + currentOffer.images[3].path" alt="" />
          </div>
          <div class="img">
            <img :src="store.state.url + '/' + currentOffer.images[4].path" alt="" />
          </div>
          <div class="img">
            <img :src="store.state.url + '/' + currentOffer.images[5].path" alt="" />
          </div>
        </div>
      </div>
      <div class="options">
        <div
          class="opt update"
          @click="
            router.push(`/offers/updateOffer/${currentOffer._id}`, {
              name: 'updateOffer',
              params: { offer_id: currentOffer._id }
            })
          "
        >
          <span>update</span>
        </div>
        <div class="opt delete" @click="deleteOffer">
          <span>delete</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const currentOffer = ref('')
const store = useStore()
const router = useRouter()

currentOffer.value = store.state.offersModule.offers.find(
  (of) => of._id == router.currentRoute.value.params.offer_id
)
if (!currentOffer.value) {
  router.push('/offers')
}

const deleteOffer = () => {
  let data = {
    active: true,
    message: 'your about to delete that offer!',
    deleteAction: 'deleteOffer',
    id: router.currentRoute.value.params.offer_id,
    returnPath: '/offers'
  }
  store.commit('callDeleteOrder', data)
}
</script>

<style lang="scss" scoped>
.offerDetails {
  width: 90%;
  h2 {
    text-transform: capitalize;
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 30px;
  }
  .offer {
    width: 600px;
    overflow: hidden;
    .main {
      display: flex;
      gap: 6px;
      .thumbnail {
        width: 100px;
        height: 70px;
        border-radius: 5px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .content {
        text-transform: capitalize;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 0 0 10px 0;
        .title {
          font-size: 20px;
          font-weight: 500;
        }
        .location-off {
          font-size: 15px;
          display: flex;
          align-items: center;
          gap: 10px;
          color: rgb(43, 157, 163);
        }
      }
    }
    .display_images {
      display: flex;
      width: 100%;
      height: 300px;
      gap: 10px;
      margin-top: 20px;
      img {
        object-fit: cover;
      }
      .first {
        width: 200px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .sub {
        display: flex;
        flex-wrap: wrap;
        flex: 1;
        gap: 10px;
        .img {
          width: calc(50% - 5px);
          height: 140px;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .options {
      display: flex;
      align-items: center;
      justify-content: end;
      gap: 10px;
      height: 100px;
      .opt {
        width: 100px;
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        background: #e7f0f4;
        transition: 0.2s;
        cursor: pointer;
        span {
          font-weight: 600;
          text-transform: capitalize;
        }
        &:hover {
          color: white;
          &.update {
            background-color: rgb(40, 126, 40);
          }
          &.delete {
            background-color: rgb(179, 48, 48);
          }
        }
      }
    }
  }
}
</style>
