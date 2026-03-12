<script setup lang="ts">
import type PokemonDTO from "@/js/Classes/Pokemon/PokemonDTO";
import PokemonService from "@/js/Classes/Pokemon/PokemonService";
import { onMounted, ref, type Ref } from "vue";
import Section from "@/js/Components/Fundaments/Section/Section.vue";
import Heading from "@/js/Components/Atoms/Heading/Heading.vue";
import PokemonCard from "@/js/Components/Molecules/PokemonCard/PokemonCard.vue";
import Text from "@/js/Components/Atoms/Text/Text.vue";

let offset: number = 0;
const results: Ref<PokemonDTO[] | null> = ref(null);

onMounted(async () => {
  results.value = await PokemonService.instance.findAll(offset);
});
</script>

<template>
  <Section
    class="section-pokemon-overview"
    theme="dark"
    gap="tiny"
    padding="both"
    gutter="both"
    :background="true"
  >
    <Heading>A list of all pokemon</Heading>

    <Text>
      Every. Single. One. From the iconic to the "why does this exist," here's every Pokémon ever
      crammed into one scrollable fever dream. Pulled fresh from PokéAPI, because apparently someone
      had to catalogue 1000+ creatures and it wasn't going to be us.
    </Text>

    <Section
      v-if="results && Array.isArray(results) && results.length"
      class="section-pokemon-overview"
      flex-direction="row"
      gap="extra-tiny"
      :wrap="true"
    >
      <PokemonCard v-for="pokemon in results" :pokemon="pokemon" />
    </Section>
  </Section>
</template>
