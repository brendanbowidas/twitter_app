<template>
  <div>
    {{term}}
    <input type="text" v-model="term">
    <a class="button primary">search</a>
  </div>
</template>

<script>
import './component.scss'
export default {
  data() {
    return {
      msg: 'hello',
    }
  },
}
</script>
