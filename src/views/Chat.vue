<template>
  <div class="chat">
    <div class="chat_participants">
      <chat-participant :profile="profile2" status="typing" />
      <connection />
      <chat-participant :profile="profile1" me status="typing" />
    </div>
    <div class="chat-container">
      <div class="chat-container_messages">
        <div
          v-for="(stack, i) in stacks"
          :key="i"
          class="chat-container_messages-stack"
        >
          <div
            v-for="(message, k) in stack"
            :key="k"
            class="chat-container_messages-stack_item"
            :class="{ stacked: stack.length > 1 }"
          >
            {{ message.content.text }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Connection from '~/Connection'
import ChatParticipant from '~/ChatParticipant'

export default {
  name: 'Chat',
  components: {
    Connection,
    ChatParticipant,
  },
  data() {
    return {
      connectionSegments: 10,
      stacks: [],
      profile1: {
        id: 1,
        me: true,
        status: 'staring',
      },
      profile2: {
        id: 8932489,
        name: 'wwwolfie',
        status: 'staring',
      },
      messages: [
        {
          content: {
            text: 'я был на море',
            attachments: [
              {
                type: 'image',
                url:
                  'https://sun9-61.userapi.com/impg/AAUWN4BdMpMFYZ2P4IcPAGmKHD85z2PoPdwBWw/uk5z5GJFvQs.jpg?size=563x751&quality=96&sign=eb6853c14b4ee76fc5517e2de382513c&type=album',
              },
            ],
          },
          user: 8932489,
          at: 1,
        },
        {
          content: {
            text: 'я был на море',
            attachments: [
              {
                type: 'image',
                url:
                  'https://sun9-61.userapi.com/impg/AAUWN4BdMpMFYZ2P4IcPAGmKHD85z2PoPdwBWw/uk5z5GJFvQs.jpg?size=563x751&quality=96&sign=eb6853c14b4ee76fc5517e2de382513c&type=album',
              },
            ],
          },
          user: 8932489,
          at: 2,
        },
        {
          content: {
            text: 'я был на море',
            attachments: [
              {
                type: 'image',
                url:
                  'https://sun9-61.userapi.com/impg/AAUWN4BdMpMFYZ2P4IcPAGmKHD85z2PoPdwBWw/uk5z5GJFvQs.jpg?size=563x751&quality=96&sign=eb6853c14b4ee76fc5517e2de382513c&type=album',
              },
            ],
          },
          user: 8932489,
          at: 3,
        },
        {
          content: {
            text: 'я был на море',
            attachments: [
              {
                type: 'image',
                url:
                  'https://sun9-61.userapi.com/impg/AAUWN4BdMpMFYZ2P4IcPAGmKHD85z2PoPdwBWw/uk5z5GJFvQs.jpg?size=563x751&quality=96&sign=eb6853c14b4ee76fc5517e2de382513c&type=album',
              },
            ],
          },
          user: 8932489,
          at: 60004,
        },
      ],
    }
  },
  watch: {
    messages: {
      immediate: true,
      handler(v) {
        let messages = [...v].sort((a, b) => a.at - b.at)

        let ts = 0
        let next = null

        this.stacks = []

        while (messages.length) {
          let l = this.stacks.length
          next = messages.shift()

          if (!ts || ts + 60000 <= next?.at) {
            ts = next.at
            this.stacks.push([next])
          } else {
            this.stacks[l - 1].push(next)
          }
        }
      },
    },
  },
}
</script>

<style lang="scss">
@import '@/scss/colors';

$msg-bg: $subtle-light;
$msg-fg: $primary-foreground;
$msg-min-radius: 5px;
$msg-max-radius: 0.9rem;
$msg-padding: 1rem;
$msg-font-size: 0.95rem;
$msg-gap: 10px;
$stacks-gap: 30px;

.chat {
  position: relative;
  height: 100vh;
  margin: 0 auto;
  max-width: 1300px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100px;
    z-index: 9;
    background: linear-gradient(0deg, transparent, black);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 80px;
    left: 0;
    width: 100%;
    height: 100px;
    z-index: 9;
    background: linear-gradient(0deg, black, transparent);
  }

  &_participants {
    position: relative;
    display: grid;
    min-height: 500px;
    height: 100%;
    align-content: space-between;
    padding: 60px 0;
  }

  &-container {
    position: absolute;
    padding: 80px 0;
    z-index: 0;
    top: 0;
    height: calc(100% - 80px);
    width: 100%;
    overflow: auto;

    &_messages {
      width: 100%;
      grid-gap: $stacks-gap;
      padding: 10px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;

      &-stack {
        width: 43%;
        display: flex;
        flex-direction: column;
        grid-gap: $msg-gap;

        &.opposite {
          align-self: flex-end;
        }

        &_item {
          max-width: 400px;
          text-align: left;
          background-color: $msg-bg;
          padding: $msg-padding;
          color: $msg-fg;
          font-size: $msg-font-size;
          font-family: Montserrat;
          align-self: flex-start;
          border-radius: 0 $msg-max-radius $msg-max-radius $msg-max-radius;
          border: 1px solid $subtle-light;

          &.stacked {
            border-radius: 0 $msg-min-radius $msg-min-radius 0;
          }

          &.stacked:last-child {
            border-radius: 0 $msg-min-radius $msg-max-radius $msg-max-radius;
          }

          &.stacked:first-child {
            border-radius: 0 $msg-max-radius $msg-min-radius 0;
          }
        }

        &.opposite &_item {
          align-self: flex-end;
          border-radius: $msg-min-radius 0 0 $msg-min-radius;

          &:last-child {
            border-radius: $msg-min-radius 0 $msg-max-radius $msg-max-radius;
          }

          &:first-child {
            border-radius: $msg-max-radius 0 0 $msg-min-radius;
          }
        }
      }
    }
  }
}
</style>
