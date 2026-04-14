<script setup>
import DietPlateFilter from './DietPlateFilter.vue'
import { buildPlateQuery } from '../../lib/dietPlate'

const props = defineProps({
  navigate: {
    type: Function,
    required: true,
  },
})

function handleApply(payload) {
  const query = new URLSearchParams({
    plate: buildPlateQuery(payload.plateComposition),
    needs: payload.selectedNeeds.join(','),
  })

  props.navigate(`/map?${query.toString()}`, { payload })
}
</script>

<template>
  <div class="plate-page">
    <header class="plate-hero">
      <div class="plate-hero__copy">
        <p class="plate-hero__eyebrow">Diet Plate Filter</p>
        <h1>Build a nutrition profile visually, then route it to restaurant discovery.</h1>
        <p>
          Version 1 uses three editable plate sections, per-section nutrient filters, and global
          dietary needs. Applying the filter sends a structured payload to the map view.
        </p>
      </div>

      <div class="plate-hero__brief">
        <h2>MVP scope</h2>
        <ul>
          <li>Protein, vegetables, and carbohydrates as editable slices</li>
          <li>Nutrient chips such as iron, fibre, calcium, low sugar, and low sodium</li>
          <li>Map-ready payload with restaurant and meal tag mappings</li>
        </ul>
      </div>
    </header>

    <DietPlateFilter @apply="handleApply" />
  </div>
</template>

<style scoped>
.plate-page {
  display: grid;
  gap: 1.5rem;
}

.plate-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(280px, 0.8fr);
  gap: 1.25rem;
  padding: 1.6rem;
  border-radius: 1.7rem;
  background:
    radial-gradient(circle at top left, rgba(242, 183, 92, 0.18), transparent 35%),
    radial-gradient(circle at bottom right, rgba(117, 173, 105, 0.18), transparent 30%),
    linear-gradient(180deg, rgba(255, 252, 246, 0.98) 0%, rgba(255, 247, 235, 0.96) 100%);
  border: 1px solid rgba(91, 68, 40, 0.08);
  box-shadow: 0 24px 44px rgba(81, 61, 34, 0.08);
}

.plate-hero__eyebrow {
  margin: 0 0 0.4rem;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #8b5a24;
}

.plate-hero h1,
.plate-hero h2 {
  margin: 0;
  color: #2a2015;
}

.plate-hero h1 {
  max-width: 13ch;
  font-size: clamp(2.6rem, 5vw, 4.6rem);
  line-height: 0.94;
  letter-spacing: -0.04em;
}

.plate-hero p,
.plate-hero li {
  color: #6d614f;
}

.plate-hero__copy,
.plate-hero__brief {
  display: grid;
  gap: 0.8rem;
}

.plate-hero__brief {
  align-content: start;
  padding: 1.1rem;
  border-radius: 1.35rem;
  background: rgba(255, 255, 255, 0.72);
}

.plate-hero__brief ul {
  margin: 0;
  padding-left: 1.1rem;
}

@media (max-width: 900px) {
  .plate-hero {
    grid-template-columns: 1fr;
  }

  .plate-hero h1 {
    max-width: none;
  }
}
</style>
