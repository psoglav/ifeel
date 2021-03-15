<template>
  <div class="home">
    <Dealers>
      <Dealer status="typing" />
      <Dealer />
    </Dealers>
  </div>
</template>

<script>
import Dealer from '@/components/connection/Dealer'
import Dealers from '@/components/connection/Dealers.vue'

export default {
  name: 'Home',
  components: {
    Dealer,
    Dealers,
  },
}
</script>
