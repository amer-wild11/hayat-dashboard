<template>
  <div :class="['deleteAlert', deleteMsg.active != '' ? 'show' : '']">
    <div class="msg">
      <h3>are you sure?</h3>
      <p>{{ deleteMsg.message }}</p>
    </div>
    <div class="options">
      <div class="option cancel" @click="cancel">
        <span>cancle</span>
      </div>
      <div :class="['option delete', deleteMsg.canDelete ? '' : 'cantDelete']" @click="deleteThing">
        <span>delete</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'

const store = useStore()
const deleteMsg = store.state.deleteMsg

const cancel = () => {
  deleteMsg.active = false
  deleteMsg.message = ''
  deleteMsg.id = ''
}

const deleteThing = () => {
  if (deleteMsg.canDelete) {
    deleteMsg.canDelete = false
    store.commit(deleteMsg.deleteAction, deleteMsg.id)
  }
}
</script>

<style lang="scss" scoped>
.deleteAlert {
  width: 96%;
  max-width: 440px;
  height: 150px;
  position: fixed;
  top: 2%;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  box-shadow: 0 0 10px 0 #139ceb47;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 999;
  transform: translateY(-50%) translateX(-50%);
  opacity: 0;
  transition: 0.4s;
  visibility: hidden;
  &.show {
    opacity: 1;
    transform: translate(-50%, 0);
    visibility: visible;
  }
  .msg {
    h3 {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 10px;
      &::first-letter {
        text-transform: uppercase;
      }
    }
    p {
      font-size: 15px;
      font-weight: 400;
    }
  }
  .options {
    width: 100%;
    gap: 10px;
    .option,
    & {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    justify-content: end !important;
    .option {
      width: 70px;
      height: 30px;
      border-radius: 5px;
      cursor: pointer;
      text-transform: capitalize;
      font-size: 13px;
      &.cancel {
        background: #e7f0f4;
      }
      &.delete {
        color: white;
        background: #139deb;
        &.cantDelete {
          background: lightblue;
          cursor: not-allowed;
        }
      }
    }
  }
}
</style>
