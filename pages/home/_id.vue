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
      // Note: Putting the script in the head tag allows the DOM to load first and then execute the script function
      // ----> in this case, it is loading the Google places API
      // Note: hid and defer are required from Google for the API to work
      // Note: Within the script src: there is a callback function. Callback function makes it so the browser only
      // ----> reads the script once. If it is read multiple times, the browser will return an error.
      // Note: Now that initMap is called set the mapLoaded to true. When mapLoaded and the client are matched as true. Skip loading the script
      script: [
        {
          src:
            "https://maps.googleapis.com/maps/api/js?key=AIzaSyDktFtQpoBrueyMxtQphlntzRA1iegjGzc&libraries=places&callback=initMap",
          hid: "map",
          defer: true,
          skip: process.client && window.mapLoaded,
        },
        {
          innerHTML: "window.initMap =  function(){ window.mapLoaded = true }",
          hid: "map-init",
        },
      ],
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
  mounted() {
    //Note: This mapOption zoom is set to 18 and 20 is the farthest zoom back
    //----> center is calling the data from the json file. Saving it to mapOptions
    //Note: Map is not declared but is still used via ref="map" in the template section.
    //----> Map also displays the map into the DOM
    //Note: setMap() function adds the red marker to the map.
    const mapOptions = {
      zoom: 18,
      center: new window.google.maps.LatLng(
        this.home._geoloc.lat,
        this.home._geoloc.lng
      ),
      disableDefaultUI: true,
      zoomControl: true,
    };
    const map = new window.google.maps.Map(this.$refs.map, mapOptions);
    const position = new window.google.maps.LatLng(
      this.home._geoloc.lat,
      this.home._geoloc.lng
    );
    const marker = new window.google.maps.Marker({ position });
    marker.setMap(map);
  },
};
</script>

<style>
.images {
  display: flex;
}
img {
  /* width: 200px;
  height: 150px; */
}
</style>
