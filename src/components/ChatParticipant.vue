<template>
  <div class="chat-participant">
    <div v-show="!me" ref="pName" class="chat-participant-name">{{ name }}</div>
    <div
      ref="pAvatar"
      :class="{ online }"
      class="chat-participant-avatar"
    ></div>
    <div v-show="!me" ref="pStatus" class="chat-participant-status">
      {{ computedStatus }}
      <div
        v-show="waiting"
        ref="pStatusWaitingSuffix"
        class="chat-participant-status_waiting-suffix"
      >
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </div>
      <div
        v-show="!waiting"
        ref="pStatusIdleSuffix"
        class="chat-participant-status_idle-suffix"
      >
        <span>.</span>
      </div>
    </div>
  </div>
</template>

<script>
import anime from 'animejs'

export default {
  name: 'ChatParticipant',
  props: {
    name: {
      type: String,
      default: 'Stranger',
    },
    me: {
      type: Boolean,
      default: false,
    },
    // status: {
    // type: String,
    // default: 'out',
    // },
  },
  data: () => ({
    statuses: {
      typing: 'is typing',
      out: 'is out',
      staring: 'is staring',
    },
    status: 'typing',
    handledStatus: '',
    waitingStatuses: ['typing'],
    waitingAnimation: null,
    idleAnimation: null,
  }),
  watch: {
    status: {
      immediate: true,
      handler(val) {
        const self = this

        anime({
          targets: self.$refs.pStatus,
          opacity: 0,
          scale: 0.5,
          translateY: [0, -15],
          duration: 100,
          complete() {
            // if (oldVal == 'out') {
            // anime({
            // targets: self.$refs.pAvatar,
            // scaleY: [0, 1],
            // filter: ['blur(40px)', 'blur(0px)'],
            // duration: 1700,
            // })
            // } else if(oldVal != 'out' && val == 'out') {
            // anime({
            // targets: self.$refs.pAvatar,
            // scaleY: [0, 1],
            // filter: ['blur(40px)', 'blur(0px)'],
            // duration: 1700,
            // })
            // }

            self.handledStatus = val
            self.$refs.pStatus.className = 'chat-participant-status ' + val

            anime({
              targets: self.$refs.pStatus,
              opacity: 1,
              scale: [1.1, 1],
              translateY: [15, 0],
              duration: 400,
            })

            self.waitingAnimation.restart()

            if (val != 'staring') {
              self.idleAnimation.restart()
              self.idleAnimation.pause()
            } else {
              self.idleAnimation.restart()
            }
          },
        })
      },
    },
  },
  computed: {
    online() {
      return this.status != 'out'
    },
    computedStatus() {
      return this.statuses[this.handledStatus]
    },
    waiting() {
      return this.waitingStatuses.includes(this.status)
    },
  },
  methods: {
    defineAnimations() {
      let self = this

      this.waitingAnimation = anime({
        targets: self.$refs.pStatusWaitingSuffix.children,
        opacity: [0, 1, 0],
        duration: 2000,
        delay: anime.stagger(150),
        loop: true,
      })

      this.idleAnimation = anime({
        targets: self.$refs.pStatusIdleSuffix.children,
        opacity: [0, 1, 0, 1, 1, 1, 1],
        duration: 2000,
        loop: true,
      })
    },
  },
  mounted() {
    this.status = 'out'

    let self = this

    setTimeout(function() {
      self.status = 'staring'
      setTimeout(function() {
        self.status = 'typing'
        setTimeout(function() {
          self.status = 'staring'
          setTimeout(function() {
            self.status = 'typing'
            setTimeout(function() {
              self.status = 'out'
            }, 5000)
          }, 1000)
        }, 5000)
      }, 1000)
    }, 3000)

    this.defineAnimations()
  },
}
</script>

<style lang="scss">
@import '@/scss/colors';

.chat-participant {
  display: grid;
  width: 300px;
  margin: auto;
  grid-template-areas: 'name avatar status';
  grid-template-columns: 1fr 90px 1fr;
  color: white;
  align-items: center;
  justify-items: center;
  font-family: Montserrat;

  &-name {
    grid-area: name;
    width: 100%;
    font-weight: 500;
    text-align: right;
  }

  &-avatar {
    grid-area: avatar;
    width: 60px;
    height: 60px;
    border-radius: 100%;
    background-color: #fff;
    transition: box-shadow 0.4s;

    &.online {
      box-shadow: 0 0 15px 3px #bbbbff;
    }
  }

  &-status {
    grid-area: status;
    opacity: 1;
    width: 100%;
    text-align: left;

    &.typing {
      // text-shadow: #fff 0 0 5px, white 0 0 15px, white 0 0 20px;
    }

    &_idle-suffix,
    &_waiting-suffix {
      margin-left: -3px;
      display: inline;
    }

    &.out {
      color: #ccccff88;
    }
  }
}
</style>
