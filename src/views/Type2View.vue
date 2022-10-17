<template>
  <main>
    <div class="container">
      <div class="row">
          <div class="col-3" v-for="(pokemon, index) in pokemonList" :key="index">
            <PokemonCard :data="pokemon" />
          </div>
      </div>
      <div class="navigation">
        <button class="previous" :disabled="!previousUrl" @click="previous">Previous</button>
        <button class="next" :disabled="!nextUrl" @click="next">Next</button>
      </div>
    </div>    
  </main>
</template>

<script>
/* 
1) The end-user is able to navigate through a list of the first 150 Pokemons.
2) For each Pokémon, display the following: name, image, height and weight.
3) At first load do not display more than 50 Pokemons.
4) The editor should be able to choose between two types of navigation:
  1. By having a load more button which load the next 15 Pokemons.
  2. By having a pagination (30 Pokemons maximum per page).
Use this API: https://pokeapi.co/ */
import PokemonCard from "../components/PokemonCard.vue";
import axios from 'axios'

export default {
  components: {
    PokemonCard
  },
  data(){
    return {
      pokemonList: [],
      previousUrl: null,
      nextUrl: null
    }
  },
  created(){
    this.getPokemonListOffset('https://pokeapi.co/api/v2/pokemon?offset=0&limit=30')
  },
  methods:{
    previous(){
      this.pokemonList = []
      this.getPokemonListOffset(this.previousUrl)
    },
    next(){
      this.getPokemonListOffset(this.nextUrl)
    },
    getPokemonListOffset(url){
      const self = this
      axios.get(url).then(result => {
        console.log(result)
        self.previousUrl = result.data.previous
        self.nextUrl = result.data.next
        let list = result.data.results
        list.map(p=>{
          axios.get(p.url).then(pokemon => {
            // console.log(pokemon.data)
            if(!self.pokemonList.find((pk) => pk.name === p.name)){
              self.pokemonList.push({
                name: p.name,
                url: p.url,
                height: pokemon.data.height,
                weight: pokemon.data.weight,
                image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + pokemon.data.id + '.png'
              })
            }
          })
        })
        // console.log(result.data);
      })
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
</style>