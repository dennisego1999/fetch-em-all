<script setup lang="ts">
import type PokemonDTO from "@/js/Classes/Pokemon/PokemonDTO";
import PokemonService from "@/js/Classes/Pokemon/PokemonService";
import { onMounted, ref, watch, type Ref } from "vue";
import Section from "@/js/Components/Fundaments/Section/Section.vue";
import Heading from "@/js/Components/Atoms/Heading/Heading.vue";
import PokemonCard from "@/js/Components/Molecules/PokemonCard/PokemonCard.vue";
import Text from "@/js/Components/Atoms/Text/Text.vue";
import Button from "@/js/Components/Atoms/Button/Button.vue";
import Loader from "@/js/Components/Atoms/Loader/Loader.vue";
import SearchBar from "@/js/Components/Organisms/SearchBar/SearchBar.vue";
import Error from "@/js/Components/Atoms/Error/Error.vue";
import HttpError from "@/js/Classes/Errors/HttpError";
import PokemonNotFoundError from "@/js/Classes/Pokemon/PokemonNotFoundError";

let offset: number = 0;
const limit: number = 12;
const pageResults: Ref<PokemonDTO[]> = ref([]);
const displayedResults: Ref<PokemonDTO[]> = ref([]);
const hasNext: Ref<boolean> = ref(true);
const isFetching: Ref<boolean> = ref(false);
const searchQuery: Ref<string | null> = ref(null);
const isSearchError: Ref<boolean> = ref(false);

async function fetchPokemons(): Promise<void> {
  // Set fetching state
  isFetching.value = true;

  // Get the next batch
  const { pokemons, hasNext: next } = await PokemonService.instance.findAll(offset, limit);

  // Check if next
  hasNext.value = next;

  // Add to results list
  pageResults.value.push(...pokemons);

  // Increment offset
  offset += limit;

  // Reset fetching state
  isFetching.value = false;
}

async function submit(): Promise<void> {
  if (!searchQuery.value) {
    // Reset to full local results when query is cleared
    displayedResults.value = pageResults.value;
    return;
  }

  // Filter already-loaded results first
  const localMatches = pageResults.value.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.value!.toLowerCase()),
  );

  if (localMatches.length > 0) {
    // Use local matches if found
    displayedResults.value = localMatches;
    return;
  }

  // Set fetching state
  isFetching.value = true;
  isSearchError.value = false;

  try {
    // Search via API as fallback
    const result = await PokemonService.instance.search(searchQuery.value);
    displayedResults.value = [result];
  } catch (e) {
    isSearchError.value = true;
    displayedResults.value = [];

    if (e instanceof HttpError || e instanceof PokemonNotFoundError) {
      console.error(e);
    } else {
      throw e;
    }
  }

  // Reset fetching state
  isFetching.value = false;
}

// Reset error when query changes
watch(searchQuery, () => {
  isSearchError.value = false;
});

onMounted(async () => {
  await fetchPokemons();

  // Initialize displayed results with local results
  displayedResults.value = pageResults.value;
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
      crammed into one scrollable fever dream. PApparently someone had to catalogue 1000+ creatures
      and it wasn't going to be me.
    </Text>

    <SearchBar v-model="searchQuery" :disabled="isFetching" @submit="submit" />

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
      <Error
        v-if="(isSearchError || displayedResults.length === 0) && !isFetching && searchQuery"
        :key="'error'"
      >
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
