import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
    namespaced: true,
    state() { 
        return {
            pokemonList: [],
            selectedPokemonID: null,
            previousUrl: null,
            nextUrl: null
        }
    },
    mutations: { 
        updatePokemonList(state, pokemon) {
            state.pokemonList.push(pokemon)
        },
        remove30PokemonFromTheList(state){
            state.pokemonList.splice(state.pokemonList.length - 31, state.pokemonList.length - 1)
        },
        updateSelectedPokemonID(state) {
            state.selectedPokemonID = ID
        },
        updatePreviousUrl(state, url) {
            state.previousUrl = url
        },
        updateNextUrl(state, url) {
            state.nextUrl = url
        }
    },
    actions: { 
        getPokemonListOffset({commit, getters},url){
            axios.get(url).then(result => {
              commit('updatePreviousUrl', result.data.previous)
              commit('updateNextUrl', result.data.next)
              let list = result.data.results
              list.map(p=>{
                axios.get(p.url).then(pokemon => {
                  if(!getters.pokemonList.find((pk) => pk.name === p.name)){
                    commit('updatePokemonList', {
                      name: p.name,
                      url: p.url,
                      height: pokemon.data.height,
                      weight: pokemon.data.weight,
                      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + pokemon.data.id + '.png'
                    })
                  }
                })
              })
            })
          }
    },
    getters: {
        pokemonList(state) {
            return state.pokemonList
        },
        selectedPokemonID(state) {
            return state.selectedPokemonID
        },
        previousUrl(state) {
            return state.previousUrl
        },
        nextUrl(state) {
            return state.nextUrl
        }
    }
  })