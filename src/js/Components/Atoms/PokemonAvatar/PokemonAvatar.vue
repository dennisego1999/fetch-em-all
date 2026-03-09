<script setup lang="ts">
import type PokemonDTO from "@/js/Classes/Pokemon/PokemonDTO";
import Visual from "../../Molecules/Visual/Visual.vue";

defineProps<{
  pokemon: PokemonDTO;
}>();
</script>

<template>
  <div class="pokemon-avatar">
    <Visual
      v-if="pokemon.frontSprite"
      fit="contain"
      :src="pokemon.frontSprite"
      :alt="pokemon.name"
    />
  </div>
</template>
