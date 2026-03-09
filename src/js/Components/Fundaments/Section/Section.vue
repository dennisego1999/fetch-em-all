<script setup lang="ts">
import { useAttrs } from "vue";

interface Props {
  tag?: string;
  container?: string | null;
  size?: number | null;
  minSize?: string | null;
  flexDirection?: string;
  gutter?: string | null;
  gutterSize?: string | null;
  padding?: string | null;
  paddingSize?: string | null;
  theme?: string | null;
  background?: boolean;
  align?: string | null;
  justify?: string | null;
  aspectRatio?: string | null;
  borderRadius?: string | null;
  breakOut?: string | null;
  gap?: string | null;
  wrap?: boolean;
  flow?: string | null;
  flex?: string | null;
  clip?: string | null;
}

const props = withDefaults(defineProps<Props>(), {
  tag: "section",
  container: null,
  size: 10,
  minSize: null,
  flexDirection: "column",
  gutter: null,
  gutterSize: null,
  padding: null,
  paddingSize: null,
  theme: null,
  background: false,
  align: null,
  justify: null,
  aspectRatio: null,
  borderRadius: null,
  breakOut: null,
  gap: null,
  wrap: false,
  flow: null,
  flex: null,
  clip: null,
});

const { class: _, ...filteredAttrs } = useAttrs() as Record<string, unknown>;
</script>

<template>
  <component
    :is="props.tag"
    class="section"
    v-bind="{
      ...filteredAttrs,
      'data-align': props.align,
      'data-justify': props.justify,
      'data-size': props.size,
      'data-min-size': props.minSize,
      'data-flex-direction': props.flexDirection,
      'data-gutter': props.gutter,
      'data-gutter-size': props.gutterSize,
      'data-padding': props.padding,
      'data-padding-size': props.paddingSize,
      'data-theme': props.theme,
      'data-background': props.background,
      'data-aspect-ratio': props.aspectRatio,
      'data-border-radius': props.borderRadius,
      'data-break-out': props.breakOut,
      'data-container': props.container,
      'data-gap': props.gap,
      'data-wrap': props.wrap,
      'data-flow': props.flow,
      'data-flex': props.flex,
      'data-clip': props.clip,
    }"
    ><slot
  /></component>
</template>
