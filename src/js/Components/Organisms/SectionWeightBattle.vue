<script setup lang="ts">
import { onMounted, ref, type Ref } from "vue";
import type PokemonDTO from "@/js/Classes/Pokemon/PokemonDTO";
import PokemonService from "@/js/Classes/Pokemon/PokemonService";
import HttpError from "@/js/Classes/Errors/HttpError";
import InvalidPokemonError from "@/js/Classes/Pokemon/InvalidPokemonError";
import Section from "@/js/Components/Fundaments/Section/Section.vue";
import Text from "@/js/Components/Atoms/Text/Text.vue";
import Heading from "@/js/Components/Atoms/Heading/Heading.vue";

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
  <Section>
    <Heading>Weight Battle</Heading>

    <Text v-if="error">{{ error }}</Text>

    <template v-else-if="pokemonA && pokemonB">
      <Text>{{ pokemonA.name }} ({{ pokemonA.weight }}kg)</Text>
      <Text>{{ pokemonB.name }} ({{ pokemonB.weight }}kg)</Text>

      <Text v-if="weightComparison" variant="strong">{{ weightComparison }}</Text>
    </template>
  </Section>
</template>
