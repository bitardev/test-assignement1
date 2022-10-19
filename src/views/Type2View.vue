<template>
  <main>
    <div class="container">
      <div class="row">
          <div class="col-3" v-for="(pokemon, index) in $store.state.pokemonList" :key="index">
            <PokemonCard :data="pokemon" />
          </div>
      </div>
      <div class="navigation">
        <button class="previous" :disabled="!$store.state.previousUrl" @click="previous">Previous</button>
        <button class="next" :disabled="!$store.state.nextUrl" @click="next">Next</button>
      </div>
    </div>    
  </main>
</template>

<script>

import PokemonCard from "../components/PokemonCard.vue";

export default {
  components: {
    PokemonCard
  },
  data(){
    return {
    }
  },
  created(){
    if(this.$store.state.pokemonList.length === 0){
      this.$store.dispatch('getPokemonListOffset','https://pokeapi.co/api/v2/pokemon?offset=0&limit=30')
    }
  },
  methods:{
    previous(){
      if(this.$store.state.pokemonList.length > 50){
        this.$store.commit('remove30PokemonFromTheList')
      }
      this.$store.dispatch('getPokemonListOffset',this.$store.state.previousUrl)
    },
    next(){
      this.$store.dispatch('getPokemonListOffset',this.$store.state.nextUrl)
    },
  }
}

</script>

<style scoped>
  .container{
    padding: 20px 0px;
  }
  .container .row{
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .container .row .col-3{
    /* flex: 1 0 20%; */
    margin: 10px;
    width: calc(25% - 10px);
    flex-basis: calc(25% - 20px);
  }
  .navigation{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 20px;
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
    position: sticky;
    bottom: 20px;
  }
  .previous,.next{
    border: none;
    /* border: 1px solid #F2F2F2; */
    border-radius: 6px;
    background: rgb(243, 220, 9);
    box-shadow: 0px 10px 20px 0px #afafaf;
    padding: 10px;
    cursor: pointer;
    width: 48%;
    min-height: 50px;
    position: relative;
    font-size: 18px;
  }
  .previous:not([disabled]):hover,.next:hover{
    /* background: rgba(0,0,0,.02); */
    opacity: .9;
  }
  .previous:not([disabled]):active,.next:active{
    /* background: rgba(0,0,0,.05); */
    opacity: .8;
  }
  .previous{
    background: rgb(228, 228, 228);
  }
  @media screen and (max-width: 768px) {
    .container .row .col-3{
      width: calc(50% - 10px);
      flex-basis: calc(50% - 20px);
    }
  }
</style>