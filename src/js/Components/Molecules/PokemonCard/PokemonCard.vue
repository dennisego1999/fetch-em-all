<script setup lang="ts">
import type PokemonDTO from "@/js/Classes/Pokemon/PokemonDTO";
import Card from "@/js/Components/Molecules/Card/Card.vue";
import Text from "@/js/Components/Atoms/Text/Text.vue";
import Visual from "@/js/Components/Molecules/Visual/Visual.vue";
import Heading from "@/js/Components/Atoms/Heading/Heading.vue";
import PokemonIdentifier from "@/js/Components/Atoms/PokemonIdentifier/PokemonIdentifier.vue";
import Section from "../../Fundaments/Section/Section.vue";

defineProps<{
  pokemon: PokemonDTO;
}>();
</script>

<template>
  <Card class="pokemon-card" :href="`/pokemon/${pokemon.name}`">
    <template #header>
      <Section flex-direction="row" justify="between" gap="extra-tiny">
        <PokemonIdentifier font-size="4" :id="pokemon.id" />

        <Text class="pokemon-card__type" font-size="4">
          <strong>POKéMON</strong>
        </Text>
      </Section>
    </template>

    <template #content>
      <Visual
        v-if="pokemon.frontSprite"
        class="pokemon-card__sprite"
        fit="contain"
        :src="pokemon.frontSprite"
        :alt="pokemon.name"
      />

      <Heading v-else class="pokemon-card__sprite-placeholder">?</Heading>
    </template>

    <template #footer>
      <Heading class="pokemon-card__name" font-size="6">{{ pokemon.name }}</Heading>

      <div class="pokemon-card__stats">
        <div class="pokemon-card__stat">
          <Text class="pokemon-card__stat-label" font-size="5">HT</Text>

          <Text class="pokemon-card__stat-value" font-size="3">
            {{ (pokemon.height / 10).toFixed(1) }}m
          </Text>
        </div>

        <div class="pokemon-card__divider" />

        <div class="pokemon-card__stat">
          <Text class="pokemon-card__stat-label" font-size="5">WT</Text>

          <Text class="pokemon-card__stat-value" font-size="3">
            {{ (pokemon.weight / 10).toFixed(1) }}kg
          </Text>
        </div>
      </div>
    </template>
  </Card>
</template>
