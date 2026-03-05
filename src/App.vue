<script setup lang="ts">
import { onMounted, ref, type Ref } from "vue";
import type PokemonDTO from "./Pokemon/PokemonDTO";
import PokemonService from "./Pokemon/PokemonService";
import HttpError from "./Errors/HttpError";
import InvalidPokemonError from "./Errors/InvalidPokemonError";

const pokemonA: Ref<PokemonDTO | null> = ref(null);
const pokemonB: Ref<PokemonDTO | null> = ref(null);
const weightComparison: Ref<string | null> = ref(null);
const error: Ref<string | null> = ref(null);

onMounted(async () => {
  try {
    pokemonA.value = await PokemonService.instance.findRandom();
    pokemonB.value = await PokemonService.instance.findRandom();
    weightComparison.value = PokemonService.instance.compareWeight(pokemonA.value, pokemonB.value);
  } catch (e) {
    if (e instanceof HttpError || e instanceof InvalidPokemonError) {
      error.value = e.message;
      console.error(e);
    } else {
      throw e;
    }
  }
});
</script>

<template>
  <section>
    <h1>Weight Battle</h1>

    <p v-if="error">{{ error }}</p>

    <div v-else-if="pokemonA && pokemonB">
      <p>{{ pokemonA.name }} ({{ pokemonA.weight }}kg)</p>
      <p>{{ pokemonB.name }} ({{ pokemonB.weight }}kg)</p>

      <p v-if="weightComparison">
        <strong>{{ weightComparison }}</strong>
      </p>
    </div>
  </section>
</template>
