<template>
  <div class="error small-4 columns">
    <p>{{msg}}</p>
  </div>
</template>

<script>
import './component.scss'

export default {
  props: ['msg'],
}
</script>
