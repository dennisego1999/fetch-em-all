import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import PokemonClient from "./Pokemon/PokemonClient";
import PokemonRepository from "./Pokemon/PokemonRepository";
import PokemonService from "./Pokemon/PokemonService";

const app = createApp(App);

app.use(router);

app.config.errorHandler = (error) => {
  console.error("Unhandled error:", error);
};

const pokeClient = new PokemonClient();
const pokemonRepo = new PokemonRepository(pokeClient);
PokemonService.init(pokemonRepo);

app.mount("#app");
