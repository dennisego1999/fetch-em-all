<script setup lang="ts">
import { onMounted, ref, type Ref } from "vue";
import type PokemonDTO from "@/js/Classes/Pokemon/PokemonDTO";
import PokemonService from "@/js/Classes/Pokemon/PokemonService";
import HttpError from "@/js/Classes/Errors/HttpError";
import InvalidPokemonError from "@/js/Classes/Pokemon/InvalidPokemonError";
import Section from "@/js/Components/Fundaments/Section/Section.vue";
import Text from "@/js/Components/Atoms/Text/Text.vue";
import Heading from "@/js/Components/Atoms/Heading/Heading.vue";
import PokemonCard from "../../Molecules/PokemonCard/PokemonCard.vue";

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
  <Section
    class="section-weight-battle"
    theme="dark"
    padding="both"
    gutter="both"
    align="center"
    :background="true"
  >
    <Heading>Weight battle</Heading>

    <Text v-if="error">{{ error }}</Text>

    <Section class="section-weight-battle__inner" align="center">
      <Section
        v-if="pokemonA && pokemonB"
        class="section-weight-battle__cards"
        flex-direction="row"
        justify="center"
        padding="both"
        gap="tiny"
        wrap="wrap"
        :size="6"
      >
        <PokemonCard :pokemon="pokemonA" />
        <PokemonCard :pokemon="pokemonB" />
      </Section>

      <Text v-if="weightComparison" variant="strong">{{ weightComparison }}</Text>
    </Section>
  </Section>
</template>
