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
import homes from "~/data/homes";
export default {
  head() {
    return {
      title: this.home.title,
    };
  },
  data() {
    return {
      home: {},
    };
  },
  created() {
    //Note: Taking import homes and find as instructed.
    //Note: home will be what home.object (Quick note: the home.objectID is inside the homes.json file) ---
    //----> equals to the route parameters.
    //Note: The tutorial explains that when you search up the url localhost:3000/home/a "Cozy Cabin in the Woods" would show up
    //----> Now whatever the objectID is and you type it as a route parameter, it would redirect you to the desired home!
    //Note: assigns the data home to the const home.
    const home = homes.find((home) => home.objectID == this.$route.params.id);
    this.home = home;
  },
  //Note: When mounted, it will call upon the plugin maps.client.js. (That is made global within nuxt.config.js);
  //----> this.$refs.map is referencing the ref="map" in the DOM. This is how it knows where to mount
  //----> this.home._geoloc.lat and this.home._geoloc.lng is calling from the data home's inputed object.
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
