<template>
  <div class="intro">
    <h1 class="orange">{{ msg }}</h1>
    <h3>Serving over 250,000,000 API calls each month!</h3>
  </div>
</template>

<script>
export default{
  props:{
    msg: {
      type: String,
      required: true,
    }
  },
  data(){
    return{

    }
  }
}

</script>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.intro h1,
.intro h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .intro h1,
  .intro h3 {
    text-align: left;
  }
}
</style>
