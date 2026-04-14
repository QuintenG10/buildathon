<script setup>
import { computed } from 'vue'
import {
  buildFilterPayload,
  getMatchingRestaurants,
  getNeedDetails,
  getNeedLabel,
  parseNeedsQuery,
  parsePlateQuery,
} from '../../lib/dietPlate'

const props = defineProps({
  routeState: {
    type: Object,
    default: null,
  },
  search: {
    type: String,
    required: true,
  },
  navigate: {
    type: Function,
    required: true,
  },
})

const searchParams = computed(() => new URLSearchParams(props.search))
const fallbackPayload = computed(() => {
  const plate = parsePlateQuery(searchParams.value.get('plate'))
  const needs = parseNeedsQuery(searchParams.value.get('needs'))
  return buildFilterPayload(
    plate,
    { protein: [], vegetables: [], carbs: [] },
    needs,
  )
})

const payload = computed(() => props.routeState?.payload ?? fallbackPayload.value)
const matches = computed(() => getMatchingRestaurants(payload.value))
const topNeeds = computed(() => payload.value.selectedNeeds.slice(0, 4).map(getNeedLabel))
const featuredMeals = computed(() =>
  matches.value
    .flatMap((restaurant) =>
      restaurant.dishes.map((dish, index) => ({
        id: `${restaurant.id}-${index}`,
        name: dish,
        restaurantName: restaurant.name,
        area: restaurant.area,
        cues: restaurant.matchedNutrients.slice(0, 2).map(getNeedLabel),
      })),
    )
    .slice(0, 6),
)
</script>

<template>
  <div class="map-page">
    <header class="map-header">
      <div class="map-header__copy">
        <p class="map-header__eyebrow">Map results</p>
        <h1>Restaurants matching the current diet plate</h1>
        <p>
          This mock result page is driven by the payload emitted from the plate filter. It reads
          route state when available and falls back to URL query params.
        </p>
      </div>

      <div class="map-header__actions">
        <button type="button" class="map-button map-button--ghost" @click="navigate('/plate')">
          Back to plate
        </button>
        <button type="button" class="map-button map-button--primary" @click="navigate('/plate')">
          Edit filter
        </button>
      </div>
    </header>

    <section class="results-layout">
      <article class="results-card results-card--summary">
        <h2>Applied profile</h2>
        <div class="profile-grid">
          <div>
            <h3>Plate</h3>
            <p>Protein {{ payload.plateComposition.protein }}%</p>
            <p>Vegetables {{ payload.plateComposition.vegetables }}%</p>
            <p>Carbs {{ payload.plateComposition.carbs }}%</p>
          </div>
          <div>
            <h3>Priority needs</h3>
            <div class="tag-row">
              <span v-for="need in topNeeds" :key="need">{{ need }}</span>
            </div>
          </div>
          <div>
            <h3>Meals surfaced</h3>
            <p>{{ featuredMeals.length }} featured dishes across matching restaurants</p>
          </div>
        </div>
      </article>

      <article class="results-card results-card--map">
        <h2>Coverage preview</h2>
        <div class="map-stage" aria-hidden="true">
        <div
          v-for="(restaurant, index) in matches.slice(0, 5)"
          :key="restaurant.id"
          class="map-pin"
          :style="{ top: `${20 + index * 14}%`, left: `${30 + index * 12}%` }"
        >
          <span>{{ index + 1 }}</span>
        </div>
        </div>
        <p class="map-note">Pins represent matching restaurants that would be drawn onto a real map view.</p>
      </article>
    </section>

    <section class="meals-section">
      <div class="section-heading">
        <div>
          <p class="section-heading__eyebrow">Meals</p>
          <h2>Matching dishes first</h2>
        </div>
        <p>Show the actual meals that satisfy the selected nutrient profile before the user picks a venue.</p>
      </div>

      <div class="meals-grid">
        <article v-for="meal in featuredMeals" :key="meal.id" class="meal-card">
          <p class="meal-card__eyebrow">{{ meal.restaurantName }}</p>
          <h3>{{ meal.name }}</h3>
          <p>{{ meal.area }}</p>
          <div class="tag-row">
            <span v-for="cue in meal.cues" :key="cue">{{ cue }}</span>
          </div>
        </article>
      </div>
    </section>

    <section class="results-list">
      <article v-for="restaurant in matches" :key="restaurant.id" class="restaurant-card">
        <div class="restaurant-card__head">
          <div>
            <p class="restaurant-card__kicker">{{ restaurant.cuisine }}</p>
            <h2>{{ restaurant.name }}</h2>
            <p>{{ restaurant.area }}</p>
          </div>
          <span class="score-pill">{{ restaurant.score }} match score</span>
        </div>

        <div class="restaurant-card__grid">
          <div>
            <h3>Why it matches</h3>
            <div class="tag-row">
              <span v-for="tag in restaurant.matchedNutrients" :key="tag">{{ getNeedLabel(tag) }}</span>
            </div>
          </div>
          <div>
            <h3>Restaurant tags</h3>
            <div class="tag-row tag-row--soft">
              <span v-for="tag in restaurant.matchedRestaurantTags" :key="tag">{{ tag }}</span>
            </div>
          </div>
          <div>
            <h3>Matching dishes</h3>
            <ul>
              <li v-for="dish in restaurant.dishes" :key="dish">{{ dish }}</li>
            </ul>
          </div>
        </div>

        <div class="explanation">
          <strong>Signal:</strong>
          {{ getNeedDetails(restaurant.matchedNutrients[0])?.description ?? 'Matched through mapped restaurant and meal tags.' }}
        </div>
      </article>

      <p v-if="!matches.length" class="empty-state">
        No mock restaurants matched the current payload. Adjust needs or rebalance the plate.
      </p>
    </section>
  </div>
</template>

<style scoped>
.map-page {
  display: grid;
  gap: 1.5rem;
}

.map-header,
.results-card,
.restaurant-card,
.meal-card {
  border-radius: 1.5rem;
  background: rgba(255, 252, 245, 0.95);
  border: 1px solid rgba(91, 68, 40, 0.08);
  box-shadow: 0 20px 40px rgba(81, 61, 34, 0.07);
}

.map-header {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.4rem;
}

.map-header__eyebrow,
.restaurant-card__kicker {
  margin: 0 0 0.3rem;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #8b5a24;
}

.map-header h1,
.results-card h2,
.restaurant-card h2,
.restaurant-card h3 {
  margin: 0;
  color: #2a2015;
}

.map-header p,
.restaurant-card p,
.map-note,
.explanation,
.empty-state,
.restaurant-card li {
  color: #6d614f;
}

.map-header__actions {
  display: flex;
  gap: 0.7rem;
}

.map-button {
  border-radius: 999px;
  padding: 0.8rem 1rem;
  font-weight: 700;
  border: 1px solid rgba(91, 68, 40, 0.12);
}

.map-button--ghost {
  background: #ffffff;
  color: #4a3a26;
}

.map-button--primary {
  background: linear-gradient(135deg, #c96e2f 0%, #eba536 100%);
  color: #fffdf8;
  border-color: transparent;
}

.results-layout {
  display: grid;
  grid-template-columns: minmax(280px, 0.8fr) minmax(0, 1.2fr);
  gap: 1rem;
}

.meals-section {
  display: grid;
  gap: 1rem;
}

.section-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 1rem;
}

.section-heading__eyebrow {
  margin: 0 0 0.3rem;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #8b5a24;
}

.section-heading h2,
.meal-card h3 {
  margin: 0;
  color: #2a2015;
}

.section-heading p,
.meal-card p {
  color: #6d614f;
}

.meals-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.meal-card {
  display: grid;
  gap: 0.75rem;
  padding: 1.15rem;
}

.meal-card__eyebrow {
  margin: 0;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #8b5a24;
}

.results-card {
  display: grid;
  gap: 1rem;
  padding: 1.2rem;
}

.profile-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.map-stage {
  position: relative;
  min-height: 260px;
  border-radius: 1.2rem;
  background:
    radial-gradient(circle at 20% 20%, rgba(108, 165, 96, 0.35), transparent 18%),
    radial-gradient(circle at 80% 35%, rgba(242, 183, 92, 0.35), transparent 16%),
    linear-gradient(180deg, #dceccf 0%, #f7f0dc 100%);
  overflow: hidden;
}

.map-stage::before,
.map-stage::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.45) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.45) 1px, transparent 1px);
  background-size: 52px 52px;
}

.map-pin {
  position: absolute;
  z-index: 1;
  width: 2rem;
  height: 2rem;
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
  display: grid;
  place-items: center;
  background: #c96e2f;
  color: #fff;
  font-weight: 700;
}

.map-pin {
  transform-origin: center;
}

.map-pin {
  font-size: 0.9rem;
}

.map-pin span {
  transform: rotate(45deg);
}

.map-note {
  margin: 0;
}

.results-list {
  display: grid;
  gap: 1rem;
}

.restaurant-card {
  display: grid;
  gap: 1rem;
  padding: 1.2rem;
}

.restaurant-card__head {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 1rem;
}

.score-pill {
  border-radius: 999px;
  background: rgba(255, 244, 220, 0.9);
  padding: 0.45rem 0.8rem;
  color: #704e22;
  font-weight: 700;
}

.restaurant-card__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin-top: 0.65rem;
}

.tag-row span {
  border-radius: 999px;
  padding: 0.45rem 0.72rem;
  background: #ffffff;
  color: #5a4931;
  border: 1px solid rgba(103, 79, 48, 0.08);
}

.tag-row--soft span {
  background: rgba(255, 250, 243, 0.85);
}

.restaurant-card ul {
  margin: 0.65rem 0 0;
  padding-left: 1.1rem;
}

.explanation {
  padding-top: 0.9rem;
  border-top: 1px solid rgba(103, 79, 48, 0.08);
}

@media (max-width: 920px) {
  .map-header,
  .restaurant-card__head,
  .section-heading {
    flex-direction: column;
    align-items: start;
  }

  .results-layout,
  .profile-grid,
  .restaurant-card__grid,
  .meals-grid {
    grid-template-columns: 1fr;
  }
}
</style>
