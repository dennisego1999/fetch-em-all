<script setup lang="ts">
import type IPokemonStat from "@/js/Classes/Pokemon/IPokemonStat";
import Text from "@/js/Components/Atoms/Text/Text.vue";
import Heading from "@/js/Components/Atoms/Heading/Heading.vue";
import Section from "@/js/Components/Fundaments/Section/Section.vue";
import ProgressBar from "../../Molecules/ProgressBar/ProgressBar.vue";

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
      <Section
        v-for="stat in stats"
        :key="stat.name"
        flex-direction="row"
        gap="extra-tiny"
        align="center"
        class="section-pokemon-stats__stat"
      >
        <div>
          <Text class="pokemon-detail__stat-label">{{ statLabels[stat.name] ?? stat.name }}</Text>
          <Text class="pokemon-detail__stat-value">{{ stat.value }}</Text>
        </div>

        <ProgressBar :value="stat.value" :max="maxStat" />
      </Section>
    </Section>
  </Section>
</template>
