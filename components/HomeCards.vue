<template>
  <div class="cards">
    <img :src="home.images[0]" width="200" /><br />
    <div class="description">
      {{ home.title }} <br />
      {{ home.location.address }} {{ home.location.city }}
      {{ home.location.state }} <br />
      {{ home.guests }} guests <br />
      {{ home.pricePerNight }} / night <br />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    home: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
/* img {
  width: 200px;
  margin: 10px;
}
.description {
  margin: 10px;
} */
</style>