<template>
  <div class="container">
    <div class="card" v-for="home in homes" :key="home.objectID">
      <HomeCards :home="home" />
    </div>
  </div>
</template>

<script>
import homes from "~/data/homes.json";
export default {
  head() {
    return {
      title: "Home page",
      meta: [
        {
          name: "description",
          content: "This is a home page!",
          hid: "description",
        },
      ],
    };
  },
  data() {
    return {
      homes: homes.slice(0, 3),
    };
  },
};
</script>

<style>
.container {
  display: flex;
  flex-wrap: wrap;
}
</style>