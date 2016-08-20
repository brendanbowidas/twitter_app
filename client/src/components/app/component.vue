<template>
  <div>
    <h1 class="text-center">{{msg}}</h1>
    <div class="red text-center">hi</div>
    <test></test>
  </div>
</template>

<script>
import test from '../test/component.vue'
export default {
  data() {
    return {
      msg: 'hello world',
    }
  },
  components: { test },
}
</script>
