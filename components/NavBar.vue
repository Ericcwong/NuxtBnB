<template>
  <div class="header">
    <nuxt-link to="/">Home</nuxt-link>
    <input type="text" ref="citySearch" @changed="changed" />
  </div>
</template>

<script>
export default {
  mounted() {
    this.$maps.makeAutoComplete(this.$refs.citySearch);
  },
  methods: {
    /*Notes:
    *Listen to input changes
    *Checks if user input has an lat and lng before searching. if not return
    *Search Page info: this.$router.push(is pushing the data to the browser search bar)
    *When things pass, the information is pushed to the search page, and everything is stored in query.
    
    */
    changed(event) {
      const place = event.detail;
      console.log(event.detail);
      if (!place.geometry) return;
      this.$router.push({
        name: "search",
        query: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          label: this.$refs.citySearch.value,
        },
      });
    },
  },
};
</script>

<style>
</style>