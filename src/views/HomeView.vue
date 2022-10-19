<template>
  <main>
    <div class="container">
      <div class="row">
          <div class="col-3" v-for="(pokemon, index) in $store.state.pokemonList" :key="index">
            <PokemonCard :data="pokemon" />
          </div>
          <div class="col-3"><button class="load_more" @click="loadMore">Load More</button></div>
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
      offset: 0,
      limit: 50
    }
  },
  computed: {
  },
  created(){
    if(this.$store.state.pokemonList.length === 0){
      this.$store.dispatch('getPokemonListOffset',`https://pokeapi.co/api/v2/pokemon?offset=${this.offset}&limit=${this.limit}`)
    }
  },
  mounted(){
  },
  methods:{
    loadMore(){
      this.offset += 15
      this.$store.dispatch('getPokemonListOffset',`https://pokeapi.co/api/v2/pokemon?offset=${this.offset}&limit=${this.limit}`)
    }
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
  .load_more{
    border: none;
    border: 1px solid #F2F2F2;
    border-radius: 10px;
    background: transparent;
    box-shadow: 0px 10px 20px 0px #f1f1f1;
    padding: 10px;
    cursor: pointer;
    width: 100%;
    min-height: 182px;
    height: 100%;
    position: relative;
  }
  .load_more:hover{
    background: rgba(0,0,0,.02);
  }
  .load_more:active{
    background: rgba(0,0,0,.05);
  }
  @media screen and (max-width: 768px) {
    .container .row .col-3{
      width: calc(50% - 10px);
      flex-basis: calc(50% - 20px);
    }
  }
</style>