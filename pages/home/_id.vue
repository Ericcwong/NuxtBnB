<template>
  <div>
    <div class="images">
      <img
        v-for="image in home.images"
        :key="image"
        :src="image"
        alt="Home banner image"
        width="200"
      />
    </div>
    {{ home.title }} <br />
    $ {{ home.pricePerNight }} / night <br />
    <img src="/images/marker.svg" alt="" width="20" height="20" />
    {{ home.location.address }} {{ home.location.city }}
    {{ home.location.country }} <br />
    <img src="/images/star.svg" alt="" width="20" height="20" />
    {{ home.reviewValue }} <br />
    {{ home.guests }} guests, {{ home.bedrooms }} rooms, {{ home.beds }} beds,
    {{ home.bathroom }} bath <br />
    <div style="height: 800px; width: 800px" ref="map"></div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: this.home.title,
    };
  },
  async asyncData({ params, $dataApi, error }) {
    /*Notes: async asyncData() is an alternative to mounted. AsyncData() allows Nuxt to render
     *server side first allowing data to be retrieve to populate the dom.
     */
    const response = await $dataApi.getHome(params.id);
    if (!response.okay)
      return error({
        statusCode: response.status,
        message: response.statusText,
      });
    return {
      home: response.json,
    };
  },
  /*Note: When mounted, it will call upon the plugin maps.client.js. (That is made global within nuxt.config.js);
   * this.$refs.map is referencing the ref="map" in the DOM. This is how it knows where to mount
   * this.home._geoloc.lat and this.home._geoloc.lng is calling from the data home's inputed object.
   */
  mounted() {
    this.$maps.showMap(
      this.$refs.map,
      this.home._geoloc.lat,
      this.home._geoloc.lng
    );
  },
};
</script>

<style>
.images {
  display: flex;
}
</style>
