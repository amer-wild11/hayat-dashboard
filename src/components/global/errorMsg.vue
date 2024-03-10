<template>
  <div class="errors">
    <div class="error" v-for="err in store.state.errorMsg.errors" :key="err.id">
      <div class="err-icon">
        <div class="icon">
          <fa-icon icon="xmark" />
        </div>
      </div>
      <span class="msg">{{ err.content }}</span>
      <span class="timeout">{{ err.timeout }}</span>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'

const store = useStore()
</script>

<style scoped lang="scss">
.errors {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  z-index: 999;
  padding: 10px;
  .error {
    width: 100%;
    height: 60px;
    border: 1px solid rgb(247, 70, 70);
    background: white;
    color: rgb(250, 76, 76);
    display: flex;
    gap: 10px;
    padding: 4px;
    .err-icon {
      display: flex;
      align-items: center;
    }
    .icon {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgb(236, 74, 74);
      color: white;
    }
    .msg {
      font-size: 12px;
      font-weight: bold;
      text-transform: capitalize;
      flex: 1;
      border-right: 1px solid lightgray;
      display: flex;
      align-items: center;
    }
    .timeout {
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
    }
  }
}
</style>
