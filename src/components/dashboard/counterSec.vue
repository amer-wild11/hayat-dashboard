<template>
  <div class="counter">
    <!-- <Tilt
      :options="TiltOptions"
      v-for="count in store.state.countersModule.counters"
      :key="count.id"
      class="countContainer count"
    >
      <div class="header">
        <h3>{{ count.name }}</h3>
        <div class="icon" @click="store.commit(count.action)">
          <fa-icon icon="plus" />
        </div>
      </div>
      <div class="stuff_count">
        <span>{{ count.count }}</span>
      </div>
    </Tilt> -->
  </div>
</template>

<!-- <script setup>
import Tilt from 'vanilla-tilt-vue'
import { useStore } from 'vuex'

const TiltOptions = {
  reverse: true,
  max: 10,
  scale: 1.02,
  transition: true,
  reset: true,
  glare: true,
  'max-glare': 0.1
}

const store = useStore()
</script> -->

<style lang="scss" scoped>
.counter {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
  .count {
    background: #111111;
    padding: 10px;
    border-radius: 10px;
    overflow: hidden;
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      h3 {
        text-transform: capitalize;
        font-size: 30px;
      }
      .icon {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 1px solid lightgray;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: 0.2s;
        &:hover {
          color: black;
          background: white;
        }
      }
    }
    .stuff_count {
      font-size: 40px;
    }
  }
}
</style>
