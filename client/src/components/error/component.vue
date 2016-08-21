<template>
  <div class="row">
    <div class="error medium-4 medium-offset-4 columns">
      <p>{{msg}}</p>
    </div>
  </div>

</template>

<script>
import './component.scss'

export default {
  props: ['msg'],
}
</script>
