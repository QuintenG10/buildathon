<script setup>
import { computed, ref } from 'vue'
import PlateGraphic from './PlateGraphic.vue'
import NutrientSelector from './NutrientSelector.vue'
import PlateSummary from './PlateSummary.vue'
import {
  DEFAULT_PLATE,
  SECTION_CONFIG,
  SECTION_ORDER,
  buildFilterPayload,
  rebalancePlate,
} from '../../lib/dietPlate'

const emit = defineEmits(['apply'])

const activeSection = ref('protein')
const plate = ref({ ...DEFAULT_PLATE })
const selectedNeeds = ref({
  protein: ['iron', 'high-protein'],
  vegetables: ['fibre'],
  carbs: ['low-sugar'],
})
const globalNeeds = ref(['calcium'])

const payload = computed(() =>
  buildFilterPayload(plate.value, selectedNeeds.value, globalNeeds.value),
)

function setSectionValue(section, value) {
  plate.value = rebalancePlate(plate.value, section, value)
}

function nudgeSection(section, direction) {
  setSectionValue(section, plate.value[section] + direction * 5)
}

function toggleSectionNeed(section, need) {
  const current = selectedNeeds.value[section] ?? []

  selectedNeeds.value = {
    ...selectedNeeds.value,
    [section]: current.includes(need) ? current.filter((item) => item !== need) : [...current, need],
  }
}

function toggleGlobalNeed(need) {
  globalNeeds.value = globalNeeds.value.includes(need)
    ? globalNeeds.value.filter((item) => item !== need)
    : [...globalNeeds.value, need]
}

function resetPlate() {
  plate.value = { ...DEFAULT_PLATE }
  activeSection.value = 'protein'
  selectedNeeds.value = {
    protein: ['iron', 'high-protein'],
    vegetables: ['fibre'],
    carbs: ['low-sugar'],
  }
  globalNeeds.value = ['calcium']
}

function applyFilter() {
  emit('apply', payload.value)
}
</script>

<template>
  <div class="diet-plate-filter">
    <section class="plate-stage">
      <div class="plate-stage__head">
        <div>
          <p class="plate-stage__kicker">Visual filter</p>
          <h2>The plate is the filter</h2>
          <p>Adjust proportions, pick nutrient priorities, and send the profile straight to the map.</p>
        </div>
        <div class="plate-stage__meta">
          <span>Always totals 100%</span>
          <span>Minimum slice 10%</span>
        </div>
      </div>

      <PlateGraphic
        :plate="plate"
        :active-section="activeSection"
        @select-section="activeSection = $event"
      />

      <div class="controls-grid">
        <article v-for="section in SECTION_ORDER" :key="section" class="control-card">
          <div class="control-card__head">
            <button type="button" class="control-title" @click="activeSection = section">
              <span class="control-dot" :style="{ backgroundColor: SECTION_CONFIG[section].color }"></span>
              {{ SECTION_CONFIG[section].label }}
            </button>
            <strong>{{ plate[section] }}%</strong>
          </div>

          <input
            :id="`${section}-range`"
            :value="plate[section]"
            type="range"
            min="10"
            max="80"
            step="5"
            @input="setSectionValue(section, Number($event.target.value))"
          />

          <div class="control-actions">
            <button type="button" @click="nudgeSection(section, -1)">-5%</button>
            <button type="button" @click="nudgeSection(section, 1)">+5%</button>
          </div>
        </article>
      </div>
    </section>

    <section class="side-panel">
      <NutrientSelector
        :active-section="activeSection"
        :selected-needs="selectedNeeds"
        :global-needs="globalNeeds"
        @toggle-section-need="toggleSectionNeed"
        @toggle-global-need="toggleGlobalNeed"
      />

      <PlateSummary
        :plate="plate"
        :selected-needs="selectedNeeds"
        :global-needs="globalNeeds"
        :payload="payload"
      />

      <div class="action-row">
        <button type="button" class="action-button action-button--primary" @click="applyFilter">
          Find matching restaurants
        </button>
        <button type="button" class="action-button action-button--secondary" @click="resetPlate">
          Reset plate
        </button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.diet-plate-filter {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr);
  gap: 1.5rem;
}

.plate-stage,
.side-panel {
  display: grid;
  gap: 1.25rem;
  padding: 1.35rem;
  border-radius: 1.5rem;
  background: rgba(255, 252, 245, 0.92);
  border: 1px solid rgba(94, 72, 44, 0.08);
  box-shadow: 0 28px 50px rgba(78, 57, 28, 0.08);
}

.plate-stage__head {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 1rem;
}

.plate-stage__kicker {
  margin: 0 0 0.25rem;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #8b5a24;
}

.plate-stage__head h2 {
  margin: 0;
  font-size: clamp(2rem, 3vw, 2.8rem);
  line-height: 0.98;
  color: #271f15;
}

.plate-stage__head p {
  margin: 0.55rem 0 0;
  color: #6d614f;
  max-width: 30rem;
}

.plate-stage__meta {
  display: grid;
  gap: 0.45rem;
  min-width: 9rem;
}

.plate-stage__meta span {
  display: inline-flex;
  justify-content: center;
  border-radius: 999px;
  background: rgba(255, 244, 220, 0.92);
  padding: 0.55rem 0.8rem;
  font-size: 0.9rem;
  color: #6f522b;
}

.controls-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.9rem;
}

.control-card {
  display: grid;
  gap: 0.8rem;
  padding: 1rem;
  border-radius: 1.15rem;
  background: rgba(255, 255, 255, 0.84);
  border: 1px solid rgba(94, 72, 44, 0.08);
}

.control-card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.7rem;
}

.control-title {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0;
  border: 0;
  background: transparent;
  color: #382c1c;
  font-weight: 700;
}

.control-dot {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
}

.control-card input {
  width: 100%;
  accent-color: #d88d29;
}

.control-actions {
  display: flex;
  gap: 0.55rem;
}

.control-actions button,
.action-button {
  border-radius: 999px;
  border: 1px solid rgba(94, 72, 44, 0.12);
  background: #ffffff;
  color: #4a3a26;
  padding: 0.72rem 0.95rem;
  font-weight: 700;
}

.action-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.action-button--primary {
  background: linear-gradient(135deg, #c96e2f 0%, #eba536 100%);
  color: #fffdf8;
  border-color: transparent;
}

.action-button--secondary {
  background: #fffaf1;
}

@media (max-width: 980px) {
  .diet-plate-filter {
    grid-template-columns: 1fr;
  }

  .controls-grid {
    grid-template-columns: 1fr;
  }

  .plate-stage__head {
    flex-direction: column;
  }
}
</style>
