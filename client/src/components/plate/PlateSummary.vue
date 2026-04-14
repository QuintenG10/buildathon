<script setup>
import { computed } from 'vue'
import { getNeedLabel } from '../../lib/dietPlate'

const props = defineProps({
  plate: {
    type: Object,
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
  payload: {
    type: Object,
    required: true,
  },
})

const sectionSummary = computed(() =>
  Object.entries(props.plate).map(([key, value]) => ({
    key,
    label: key === 'vegetables' ? 'Vegetables' : key === 'protein' ? 'Protein' : 'Carbohydrates',
    value,
  })),
)

const selectedTags = computed(() => [
  ...Object.values(props.selectedNeeds).flat(),
  ...props.globalNeeds,
].map(getNeedLabel))
</script>

<template>
  <section class="summary-card">
    <div class="summary-card__head">
      <div>
        <p class="summary-kicker">Current profile</p>
        <h3>Diet filter summary</h3>
      </div>
      <span class="summary-intent">Map-ready</span>
    </div>

    <div class="summary-grid">
      <article class="summary-block">
        <h4>Plate composition</h4>
        <div class="meter-list">
          <div v-for="item in sectionSummary" :key="item.key" class="meter-row">
            <div class="meter-row__label">
              <span>{{ item.label }}</span>
              <strong>{{ item.value }}%</strong>
            </div>
            <div class="meter-track">
              <span class="meter-fill" :style="{ width: `${item.value}%` }"></span>
            </div>
          </div>
        </div>
      </article>

      <article class="summary-block">
        <h4>Selected needs</h4>
        <div class="summary-tags">
          <span v-for="tag in selectedTags" :key="tag">{{ tag }}</span>
          <p v-if="!selectedTags.length">No nutrient priorities selected yet.</p>
        </div>
      </article>

      <article class="summary-block">
        <h4>Generated tags</h4>
        <div class="payload-preview">
          <p><strong>Restaurant:</strong> {{ payload.restaurantTags.slice(0, 3).join(', ') || 'None yet' }}</p>
          <p><strong>Meals:</strong> {{ payload.mealTags.slice(0, 4).join(', ') || 'None yet' }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.summary-card {
  display: grid;
  gap: 1rem;
  padding: 1.2rem;
  border-radius: 1.35rem;
  background: linear-gradient(180deg, rgba(255, 248, 235, 0.92) 0%, rgba(255, 255, 255, 0.96) 100%);
  border: 1px solid rgba(103, 79, 48, 0.1);
}

.summary-card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.summary-kicker {
  margin: 0 0 0.25rem;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #8b5a24;
}

.summary-card__head h3,
.summary-block h4 {
  margin: 0;
  color: #2d2416;
}

.summary-intent {
  border-radius: 999px;
  background: #ffffff;
  padding: 0.45rem 0.75rem;
  color: #7d5624;
  font-size: 0.85rem;
  font-weight: 700;
  border: 1px solid rgba(125, 86, 36, 0.12);
}

.summary-grid {
  display: grid;
  gap: 1rem;
}

.summary-block {
  display: grid;
  gap: 0.8rem;
}

.meter-list {
  display: grid;
  gap: 0.8rem;
}

.meter-row {
  display: grid;
  gap: 0.35rem;
}

.meter-row__label {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  color: #5b4a32;
}

.meter-track {
  height: 0.65rem;
  border-radius: 999px;
  background: rgba(103, 79, 48, 0.08);
  overflow: hidden;
}

.meter-fill {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #db8a29 0%, #efb44f 100%);
}

.summary-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}

.summary-tags span {
  border-radius: 999px;
  padding: 0.48rem 0.72rem;
  background: #ffffff;
  color: #5a4931;
  border: 1px solid rgba(103, 79, 48, 0.08);
}

.summary-tags p,
.payload-preview p {
  margin: 0;
  color: #6d614f;
}

.payload-preview {
  display: grid;
  gap: 0.45rem;
}
</style>
