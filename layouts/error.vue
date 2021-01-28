<template>
  <div class="errorContainer">
    <img
      src="https://media0.giphy.com/media/13n7XeyIXEIrbG/giphy.gif?cid=ecf05e471ttzjr1v7ul8ij0bo4idmbd82oy4dp8qnspxhtk0&rid=giphy.gif"
      alt=""
    />
    <br />
    <div class="errorMessage">
      Error Message: {{ error.message }} <br />
      Error code: {{ error.statusCode }}
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "Error",
    };
  },
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
.errorContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
.errorMessage {
  text-align: center;
}
</style>