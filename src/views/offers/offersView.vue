<template>
  <main>
    <RouterView></RouterView>
    <div class="container" v-if="router.currentRoute.value.matched.length == 1">
      <header>
        <h2>special offers</h2>
        <div class="search">
          <input type="search" placeholder="Search" @input="search" v-model="searchInput" />
          <fa-icon icon="magnifying-glass" class="icon" />
        </div>
      </header>
      <div class="offers" v-if="offersModule.offers.length > 0">
        <div
          class="offer"
          v-for="offer in offersModule.offers.sort((a, b) => b.created_at - a.created_at)"
          :key="offer._id"
          @click="
            router.push(`/offers/offerDetails/${offer._id}`, {
              name: 'offerDetails',
              params: { offer_id: offer._id }
            })
          "
        >
          <div class="thumbnail">
            <img :src="store.state.url + '/' + offer.images[0].path" alt="" />
          </div>
          <div class="content">
            <span class="title">{{ offer.title }}</span>
            <div class="offer-location">
              <span class="location">{{ offer.location }}</span>
              <span class="off">{{ offer.offer }}%off</span>
            </div>
          </div>
          <div class="seeMore">
            <div class="icon">
              <fa-icon icon="angle-right" />
            </div>
          </div>
        </div>
      </div>
      <h2 v-if="offersModule.offers.length < 1" class="noThing noOffers">no offers</h2>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import socket from 'socket.io-client'

const router = useRouter()
const store = useStore()
const offersModule = store.state.offersModule
const offers = store.state.offersModule.offers
const searchInput = ref('')
const io = socket(store.state.url)

io.on('postOffer', (offer) => {
  offersModule.offers.push(offer)
})

io.on('offerDeleted', (id) => {
  let offerIndex = offersModule.offers.indexOf(offersModule.offers.find((of) => of._id == id))
  offersModule.offers.splice(offerIndex, 1)
})

io.on('offerUpdated', (offer) => {
  let offerIndex = offersModule.offers.indexOf(
    offersModule.offers.find((of) => of._id == offer._id)
  )
  offersModule.offers[offerIndex] = offer
})

const search = () => {
  let result = []
  if (searchInput.value.trim() != '') {
    let letters = searchInput.value
      .toLowerCase()
      .split('')
      .filter((letter) => letter.trim() !== '')
    offersModule.offers.forEach((off) => {
      for (let letter of letters) {
        if (off.title.toLowerCase().includes(letter)) {
          result.push(off)
          break
        }
      }
    })
    result = Array.from(new Set(result))
    offersModule.offers = result
  } else {
    offersModule.offers = offers
  }
}
</script>

<style lang="scss" scoped>
.container {
  width:100%;
}
header {
  width: 100%;
  margin-bottom: 30px;
  h2 {
    font-size: 35px;
    font-weight: 600;
    text-transform: capitalize;
    margin-bottom: 30px;
  }
  input {
    width: 100%;
    height: 40px;
    background: none;
    border: 1px solid lightgray;
    padding: 5px;
    border-radius: 5px;
    background: #e7f0f4;
    padding-left: 30px;
  }
  .search {
    position: relative;
    .icon {
      position: absolute;
      top: 50%;
      left: 10px;
      transform: translateY(-50%);
      z-index: 1;
      color: rgba(0, 0, 0, 0.507);
    }
  }
}
.offers {
  width: 100%;
  .offer {
    width: 100%;
    padding: 30px 10px;
    display: flex;
    justify-content: space-between;
    gap: 10px;
    transition: 0.2s;
    cursor: pointer;
    &:hover {
      background: rgba(0, 0, 0, 0.035);
    }
    // .opts {
    //   position: absolute;
    //   top: -10px;
    //   right: -10px;
    //   > .icon {
    //     width: 30px;
    //     height: 30px;
    //     border-radius: 50%;
    //     background-color: white;
    //     color: black;
    //     display: flex;
    //     align-items: center;
    //     justify-content: center;
    //     cursor: pointer;
    //   }
    //   .dropdown {
    //     position: absolute;
    //     top: 100%;
    //     right: 10px;
    //     background: white;
    //     border-radius: 2px;
    //     box-shadow: 0 0 4px 0 rgb(87, 87, 87);
    //     display: flex;
    //     flex-direction: column;
    //     width: 140px;
    //     .opt {
    //       display: flex;
    //       align-items: center;
    //       gap: 10px;
    //       padding: 6px;
    //       transition: 0.2s;
    //       cursor: pointer;
    //       &:hover {
    //         color: white;
    //         &.delete {
    //           background: red;
    //         }
    //         &.update {
    //           background: green;
    //         }
    //       }
    //     }
    //   }
    // }
    .thumbnail {
      width: 70px;
      height: 50px;
      border-radius: 4px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    // .name-offer {
    //   display: flex;
    //   justify-content: space-between;
    //   align-items: center;
    //   padding: 30px 10px;
    //   .name {
    //     font-size: 24px;
    //     font-weight: bold;
    //     font-family: 'inter', sans-serif;
    //   }
    //   .off {
    //     font-size: 20px;
    //     color: #8b2cf5;
    //   }
    // }
    // .location {
    //   display: flex;
    //   align-items: center;
    //   gap: 10px;
    //   font-size: 17px;
    //   font-family: 'Inter', sans-serif;
    //   img {
    //     width: 27px;
    //   }
    // }
    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .title {
        font-size: 20px;
        text-transform: capitalize;
        font-weight: 600;
      }
      .offer-location {
        display: flex;
        align-items: center;
        font-size: 16px;
        font-weight: 300;
        color: #5c8aa1;
        gap: 10px;
        text-transform: capitalize;
      }
    }
    .seeMore {
      display: flex;
      align-items: center;
      justify-content: center;
      .icon {
        width: 50px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(35, 144, 217, 0.1);
        border-radius: 5px;
      }
    }
  }
}
</style>
