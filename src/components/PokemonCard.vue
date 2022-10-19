<template>
  <div class="pokemon">
    <img :src="data.image" alt="">
    <h5>{{data.name}}</h5>
    <div class="specs">
      <span class="height">Height: <b>{{data.height}}</b></span>
      <span class="weight">Weight:<b>{{data.weight}}</b></span>
    </div>
  </div>
</template>

<script>
  export default{
    props:['data'],
    data(){
      return{

      }
    }
  }
</script>

<style scoped>
.pokemon{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #F2F2F2;
  border-radius: 10px;
  box-shadow: 0px 10px 20px 0px #f1f1f1;
  padding: 10px;
  cursor: pointer;
}
.pokemon:hover{
  background: rgba(0,0,0,.02);
}
h5{
  text-transform: capitalize;    
  font-size: 16px;
}
.specs{
  display: flex;
  flex-direction: column;
  font-size: 12px;
  text-align: center;
  font-family: 'Arial';
  color: #444;
  font-weight: 100;
}
.specs .height b{
  color: red;
  font-weight: bold;
}
.specs .weight b{
  color: green;
  font-weight: bold;
}
</style>