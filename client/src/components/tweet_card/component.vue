<template>
  <div class="tweet-card small-12 large-4 columns align-middle">
    <div class="row align-middle">
      <div class="small-2 medium-1 large-2 columns align-left text-center" id="profile-image">
        <img :src="data.image" alt="">
      </div>
      <div class="name-container columns align-middle">
        <h3 class="name columns">{{data.name}}</h3>
        <h6 class="screen-name columns">@{{data.screen_name}}</h6>
      </div>

    </div>
    <div class="text-container align-middle">
      <p>{{data.text}}</p>
    </div>
    <div><i class="fa fa-retweet"></i> {{data.retweets}}</div>
    <div><i class="fa fa-heart"></i> {{data.favorites}}</div>
  </div>
</template>

<script>
import './component.scss'
export default {
  props: ['data'],
}
</script>
