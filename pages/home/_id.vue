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
    <div v-for="review in reviews" :key="review.objectID">
      <img :src="review.reviewer.image" alt="" /> <br />
      {{ review.reviewer.name }} <br />
      {{ formatDate(review.date) }} <br />
      <ShortText :text="review.comment" :target="150" /><br />
    </div>
    <div>
      <img :src="user.image" alt="" /><br />
      {{ user.name }} <br />
      {{ formatDate(user.joined) }} <br />
      {{ user.reviewCount }} <br />
      {{ user.description }}
    </div>
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
    const responses = await Promise.all([
      $dataApi.getHome(params.id),
      $dataApi.getReviewsByHomeId(params.id),
      $dataApi.getUserByHomeId(params.id),
    ]);
    const badResponse = responses.find((response) => !response.ok);
    if (badResponse)
      return error({
        statusCode: badResponse.status,
        message: badResponse.statusText,
      });
    return {
      home: responses[0].json,
      reviews: responses[1].json.hits,
      user: responses[2].json.hits[0],
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
  methods: {
    formatDate(dataStr) {
      const date = new Date(dataStr);
      return date.toLocaleDateString(undefined, {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    },
  },
};
</script>

<style>
.images {
  display: flex;
}
</style>
