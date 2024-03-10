<template>
  <main>
    <RouterView></RouterView>
    <div class="container" v-if="$router.currentRoute.value.matched.length == 1">
      <header>
        <h2>your tickets</h2>
        <div class="search">
          <input type="search" placeholder="Search" @input="search" v-model="searchInput" />
          <fa-icon icon="magnifying-glass" class="icon" />
        </div>
      </header>
      <div class="tickets">
        <div class="ticket" v-for="ticket in ticketsModule.tickets" :key="ticket._id">
          <div class="logo">
            <img :src="`${store.state.url}/${ticket.ticket.path}`" alt="" />
          </div>
          <div class="name">
            <span>{{ ticket.name }}</span>
          </div>
          <div class="opts">
            <div class="opt delete" @click="deleteTicket(ticket._id)">
              <fa-icon icon="trash-can" />
            </div>
            <div
              class="opt update"
              @click="
                $router.push(`/tickets/updateTicket/${ticket._id}`, {
                  name: 'updateTicket',
                  params: { ticket_id: ticket._id }
                })
              "
            >
              <fa-icon icon="pencil" />
            </div>
          </div>
        </div>
      </div>
      <h2 v-if="ticketsModule.tickets.length < 1" class="noThing">no tickets</h2>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import socket from 'socket.io-client'

const store = useStore()
const io = socket(store.state.url)
const ticketsModule = store.state.ticketsModule
const tickets = ref('')
tickets.value = store.state.ticketsModule.tickets
const searchInput = ref('')

io.on('postTicket', (ticket) => {
  ticketsModule.tickets.push(ticket)
})

io.on('ticketDeleted', (id) => {
  let tickets = ticketsModule.tickets
  let index = tickets.indexOf(tickets.find((t) => t._id == id))
  ticketsModule.tickets.splice(index, 1)
})

io.on('ticketUpdated', (ticket) => {
  let tickets = ticketsModule.tickets
  let index = tickets.indexOf(tickets.find((t) => t._id == ticket._id))
  ticketsModule.tickets[index] = ticket
})

const search = () => {
  let result = []
  if (searchInput.value.trim() != '') {
    let letters = searchInput.value
      .toLowerCase()
      .split('')
      .filter((letter) => letter.trim() !== '')
    ticketsModule.tickets.forEach((ticket) => {
      for (let letter of letters) {
        if (ticket.name.toLowerCase().includes(letter)) {
          result.push(ticket)
          break
        }
      }
    })
    result = Array.from(new Set(result))
    ticketsModule.tickets = result
  } else {
    ticketsModule.tickets = tickets.value
  }
}

const deleteTicket = (id) => {
  let data = {
    message: `this action can't be undone are you sure you want to delete this ticket`,
    id: id,
    active: true,
    returnRoute: '/tickets',
    deleteAction: 'deleteTicket'
  }
  store.commit('callDeleteOrder', data)
}
</script>

<style lang="scss" scoped>
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
.tickets {
  display: flex;
  flex-direction: column;
  width: 100%;
  .ticket {
    display: flex;
    gap: 10px;
    padding: 10px;
    .logo {
      height: 40px;
      border-radius: 4px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .name {
      flex: 1;
      span {
        font-size: 15px;
        font-weight: bold;
      }
    }
    .opts {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      gap: 10px;
      .opt {
        width: 70px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        background: #e7f0f4;
        transition: 0.2s;
        cursor: pointer;
        &:hover {
          color: white;
          &.update {
            background: rgba(20, 136, 20, 0.612);
          }
          &.delete {
            background: rgba(238, 51, 51, 0.734);
          }
        }
      }
    }
  }
}
</style>
