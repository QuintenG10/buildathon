<script setup>
import { computed } from 'vue'
import { GLOBAL_NEEDS, NUTRIENT_DETAILS, SECTION_CONFIG, getSectionNeeds } from '../../lib/dietPlate'

const props = defineProps({
  activeSection: {
    type: String,
    required: true,
  },
  selectedNeeds: {
    type: Object,
    required: true,
  },
  globalNeeds: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['toggle-section-need', 'toggle-global-need'])

const activeSectionConfig = computed(() => SECTION_CONFIG[props.activeSection])
const activeSectionNeeds = computed(() => getSectionNeeds(props.activeSection))

function isSelected(need) {
  return props.selectedNeeds[props.activeSection]?.includes(need)
}

function isGlobalSelected(need) {
  return props.globalNeeds.includes(need)
}
</script>

<template>
  <section class="selector-panel" :aria-labelledby="`${activeSection}-title`">
    <div class="selector-heading">
      <p class="selector-kicker">Active section</p>
      <h2 :id="`${activeSection}-title`">{{ activeSectionConfig.label }}</h2>
      <p>{{ activeSectionConfig.description }}</p>
    </div>

    <div class="selector-group">
      <div class="selector-group__head">
        <h3>Section nutrients</h3>
        <p>Select multiple priorities for this plate area.</p>
      </div>
      <div class="chip-grid">
        <button
          v-for="need in activeSectionNeeds"
          :key="need"
          type="button"
          class="filter-chip"
          :class="{ 'filter-chip--active': isSelected(need) }"
          @click="emit('toggle-section-need', activeSection, need)"
        >
          <strong>{{ NUTRIENT_DETAILS[need].label }}</strong>
          <span>{{ NUTRIENT_DETAILS[need].description }}</span>
        </button>
      </div>
    </div>

    <div class="selector-group">
      <div class="selector-group__head">
        <h3>Global filters</h3>
        <p>Cross-category needs that affect the whole search.</p>
      </div>
      <div class="chip-grid">
        <button
          v-for="need in GLOBAL_NEEDS"
          :key="need"
          type="button"
          class="filter-chip filter-chip--soft"
          :class="{ 'filter-chip--active': isGlobalSelected(need) }"
          @click="emit('toggle-global-need', need)"
        >
          <strong>{{ NUTRIENT_DETAILS[need].label }}</strong>
          <span>{{ NUTRIENT_DETAILS[need].description }}</span>
        </button>
      </div>
    </div>

    <div class="examples-card">
      <h3>Food examples</h3>
      <div class="examples-list">
        <span v-for="example in activeSectionConfig.examples" :key="example">{{ example }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.selector-panel {
  display: grid;
  gap: 1.35rem;
}

.selector-heading {
  display: grid;
  gap: 0.45rem;
}

.selector-kicker {
  margin: 0;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #8b5a24;
}

.selector-heading h2,
.selector-group h3,
.examples-card h3 {
  margin: 0;
  color: #2d2416;
}

.selector-heading p,
.selector-group__head p {
  margin: 0;
  color: #6d614f;
}

.selector-group {
  display: grid;
  gap: 0.85rem;
}

.selector-group__head {
  display: grid;
  gap: 0.25rem;
}

.chip-grid {
  display: grid;
  gap: 0.8rem;
}

.filter-chip {
  display: grid;
  gap: 0.3rem;
  text-align: left;
  border-radius: 1.1rem;
  border: 1px solid rgba(95, 73, 44, 0.12);
  background: #fffdfa;
  padding: 0.95rem 1rem;
  color: #413625;
  transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.filter-chip strong {
  font-size: 0.96rem;
}

.filter-chip span {
  color: #6d614f;
  font-size: 0.9rem;
}

.filter-chip:hover,
.filter-chip:focus-visible {
  transform: translateY(-1px);
  border-color: rgba(95, 73, 44, 0.28);
  box-shadow: 0 12px 24px rgba(95, 73, 44, 0.08);
  outline: none;
}

.filter-chip--soft {
  background: rgba(255, 249, 239, 0.72);
}

.filter-chip--active {
  background: linear-gradient(180deg, #fff4de 0%, #fff8ee 100%);
  border-color: #d88d29;
  box-shadow: 0 16px 28px rgba(191, 127, 39, 0.12);
}

.examples-card {
  display: grid;
  gap: 0.8rem;
  border-radius: 1.2rem;
  background: rgba(255, 251, 243, 0.88);
  padding: 1rem;
  border: 1px solid rgba(95, 73, 44, 0.08);
}

.examples-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}

.examples-list span {
  border-radius: 999px;
  background: #ffffff;
  padding: 0.45rem 0.75rem;
  color: #5b4a32;
  border: 1px solid rgba(95, 73, 44, 0.08);
}
</style>
