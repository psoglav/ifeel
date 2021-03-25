<template>
  <div class="container">
    <div class="container_messages">
      <div
        v-for="(stack, i) in stacks"
        :key="i"
        :class="{ opposite: me.id != stack[0].user }"
        class="container_messages-stack"
      >
        <div
          v-for="(message, k) in stack"
          :key="k"
          class="container_messages-stack_item"
          :class="{ stacked: stack.length > 1 }"
        >
          {{ message.content.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessagesBox',
  data() {
    return {
      stacks: [],
      messages: [
        {
          content: {
            text: 'привет',
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
            text: 'привет',
            attachments: [
              {
                type: 'image',
                url:
                  'https://sun9-61.userapi.com/impg/AAUWN4BdMpMFYZ2P4IcPAGmKHD85z2PoPdwBWw/uk5z5GJFvQs.jpg?size=563x751&quality=96&sign=eb6853c14b4ee76fc5517e2de382513c&type=album',
              },
            ],
          },
          user: 1,
          at: 2,
        },
        {
          content: {
            text: 'ты в порядке? я устала тебя искать',
            attachments: [
              {
                type: 'image',
                url:
                  'https://sun9-61.userapi.com/impg/AAUWN4BdMpMFYZ2P4IcPAGmKHD85z2PoPdwBWw/uk5z5GJFvQs.jpg?size=563x751&quality=96&sign=eb6853c14b4ee76fc5517e2de382513c&type=album',
              },
            ],
          },
          user: 8932489,
          at: 60003,
        },
        {
          content: {
            text: 'волнуюсь',
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
        {
          content: {
            text:
              'я волнуюсь я волнуюсь я волнуюсь я волну.юсь яшощя шьш щывашывоьащ89ывоа093оа23зх890аоывжщао90х1гш9щ1АЫВА(ШЫВА)(ШЫВА)9шлз-90шл волнуюсь ВОЛНУЮСЬ',
            attachments: [
              {
                type: 'image',
                url:
                  'https://sun9-61.userapi.com/impg/AAUWN4BdMpMFYZ2P4IcPAGmKHD85z2PoPdwBWw/uk5z5GJFvQs.jpg?size=563x751&quality=96&sign=eb6853c14b4ee76fc5517e2de382513c&type=album',
              },
            ],
          },
          user: 8932489,
          at: 61004,
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
        let prev = null

        this.stacks = []

        while (messages.length) {
          let l = this.stacks.length
          next = messages.shift()

          if (!ts || ts + 60000 <= next.at || next.user != prev?.user) {
            ts = next.at
            this.stacks.push([next])
            prev = next
          } else {
            this.stacks[l - 1].push(next)
          }
        }
      },
    },
  },
  computed: {
    me() {
      return this.$store.getters.me
    },
    user() {
      return this.$store.getters.user
    },
  },
}
</script>

<style lang="scss">
@import '@/scss/colors';

$msg-bg: linear-gradient(125deg, $darkness, $subtle-light);
$opp-msg-bg: linear-gradient(45deg, $subtle-light, $darkness);
$msg-fg: #eeeeffee;
$msg-min-radius: 5px;
$msg-max-radius: 0.9rem;
$msg-padding: 1rem;
$msg-font-size: 0.95rem;
$msg-gap: 10px;
$stacks-gap: 30px;

.container {
  position: absolute;
  padding: 80px 0;
  z-index: 0;
  top: 0;
  height: calc(100% - 80px);
  width: 100%;
  overflow: auto;
  overflow-x: hidden;

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
        background: $msg-bg;
        padding: $msg-padding;
        font-size: $msg-font-size;
        font-family: 'Open Sans', Montserrat, sans-serif;
        font-weight: 500;
        color: $msg-fg;
        align-self: flex-start;
        word-break: break-all;
        border-radius: 0 $msg-max-radius $msg-max-radius $msg-max-radius;

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
        background: $opp-msg-bg;
        border-radius: $msg-max-radius 0 $msg-max-radius $msg-max-radius;

        &.stacked {
          border-radius: $msg-min-radius 0 0 $msg-min-radius;
        }

        &.stacked:last-child {
          border-radius: $msg-min-radius 0 $msg-max-radius $msg-max-radius;
        }

        &.stacked:first-child {
          border-radius: $msg-max-radius 0 0 $msg-min-radius;
        }
      }
    }
  }
}
</style>
