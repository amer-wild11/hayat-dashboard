<template>
  <div class="successMsgs">
    <div class="successMsg" v-for="msg in store.state.successMsg.msgs" :key="msg">
      <div class="msg">
        <div class="icon">
          <fa-icon icon="check" />
        </div>
        <span class="content">{{ msg.content }}</span>
        <span class="destroy">{{ msg.timeout }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'

const store = useStore()
</script>

<style lang="scss" scoped>
.successMsgs {
  min-width: 250px;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 999;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  pointer-events: none;
  .successMsg {
    min-width: 200px;
    height: 70px;
    display: flex;
    align-items: center;
    padding: 5px;
    background: rgb(255, 255, 255);
    border: 1px solid lightgray;
    border-radius: 4px;
    font-size: 17px;
    .msg {
      display: flex;
      align-items: center;
      gap: 10px;
      text-transform: capitalize;
      .icon {
        width: 30px;
        height: 30px;
        background: rgb(21, 183, 6);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
      }
      .content {
        flex: 1;
      }
      .destroy {
        font-size: 18px;
        border-left: 1px solid lightgray;
        padding-left: 10px;
        color: rgba(0, 0, 0, 0.327);
      }
    }
  }
}
</style>
