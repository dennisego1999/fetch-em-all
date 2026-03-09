<script setup lang="ts">
import type IPokemonStat from "@/js/Classes/Pokemon/IPokemonStat";
import Text from "@/js/Components/Atoms/Text/Text.vue";
import Heading from "@/js/Components/Atoms/Heading/Heading.vue";
import Section from "@/js/Components/Fundaments/Section/Section.vue";

defineProps<{
  stats: IPokemonStat[];
}>();

const maxStat = 255;
const statLabels: Record<string, string> = {
  hp: "HP",
  attack: "ATK",
  defense: "DEF",
  "special-attack": "Sp. ATK",
  "special-defense": "Sp. DEF",
  speed: "SPD",
};
</script>

<template>
  <Section class="section-pokemon-stats" gap="extra-tiny">
    <Heading font-size="4">Stats</Heading>

    <Section gap="extra-tiny" justify="start" align="center">
      <Section v-for="stat in stats" :key="stat.name" flex-direction="row">
        <Section>
          <Text class="pokemon-detail__stat-label">{{ statLabels[stat.name] ?? stat.name }}</Text>
          <Text class="pokemon-detail__stat-value">{{ stat.value }}</Text>
        </Section>

        <div
          class="pokemon-detail__stat-fill"
          :style="{ width: `${(stat.value / maxStat) * 100}%` }"
        />
      </Section>
    </Section>
  </Section>
</template>
