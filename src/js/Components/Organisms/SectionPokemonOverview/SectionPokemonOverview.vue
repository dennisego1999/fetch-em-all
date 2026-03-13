<script setup lang="ts">
import type PokemonDTO from "@/js/Classes/Pokemon/PokemonDTO";
import PokemonService from "@/js/Classes/Pokemon/PokemonService";
import { computed, onMounted, ref, type Ref } from "vue";
import Section from "@/js/Components/Fundaments/Section/Section.vue";
import Heading from "@/js/Components/Atoms/Heading/Heading.vue";
import PokemonCard from "@/js/Components/Molecules/PokemonCard/PokemonCard.vue";
import Text from "@/js/Components/Atoms/Text/Text.vue";
import Button from "@/js/Components/Atoms/Button/Button.vue";
import Loader from "@/js/Components/Atoms/Loader/Loader.vue";
import SearchBar from "@/js/Components/Organisms/SearchBar/SearchBar.vue";
import Error from "@/js/Components/Atoms/Error/Error.vue";

let offset: number = 0;
const limit: number = 12;
const results: Ref<PokemonDTO[]> = ref([]);
const hasNext: Ref<boolean> = ref(true);
const isFetching: Ref<boolean> = ref(false);
const searchQuery: Ref<string | null> = ref(null);

async function fetchPokemons(): Promise<void> {
  // Set fetching state
  isFetching.value = true;

  // Get the next batch
  const { pokemons, hasNext: next } = await PokemonService.instance.findAll(offset, limit);

  // Check if next
  hasNext.value = next;

  // Add to results list
  results.value.push(...pokemons);

  // Increment offset
  offset += limit;

  // Reset fetching state
  isFetching.value = false;
}

const displayedResults = computed<PokemonDTO[]>(() => {
  if (!searchQuery.value) {
    return results.value;
  }

  return results.value.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.value!.toLowerCase()),
  );
});

onMounted(async () => {
  await fetchPokemons();
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

    <SearchBar v-model="searchQuery" :disabled="isFetching" />

    <TransitionGroup
      v-if="displayedResults.length > 0"
      name="card"
      tag="section"
      class="section section-pokemon-overview"
      data-size="10"
      data-flex-direction="row"
      data-gap="extra-tiny"
      data-wrap="true"
      appear
    >
      <PokemonCard v-for="pokemon in displayedResults" :key="pokemon.id" :pokemon="pokemon" />
    </TransitionGroup>

    <Transition name="fade">
      <Error v-if="displayedResults.length === 0" :key="'error'">
        Failed to find a Pokémon for '{{ searchQuery }}'
      </Error>
    </Transition>

    <Transition name="fade" mode="out-in">
      <Button v-if="hasNext && displayedResults.length > 0 && !isFetching" @click="fetchPokemons">
        Load more
      </Button>

      <Loader v-else-if="isFetching" />
    </Transition>
  </Section>
</template>
