<script setup>
import { computed, ref } from 'vue'

const restaurants = [
  {
    id: 1,
    name: 'Green Bowl Da Nang',
    area: 'Hai Chau, Da Nang',
    monthlyCredits: 182,
    monthlyCap: 200,
    verifiedVisits: 182,
    dishes: [
      {
        name: 'Lemongrass Chicken Bowl',
        ingredients: 'Chicken, brown rice, pickled carrot, herbs',
        macros: '520 kcal / 41g protein / 36g carbs / 19g fat',
      },
    ],
  },
  {
    id: 2,
    name: 'Lotus Fuel Kitchen',
    area: 'District 1, Ho Chi Minh City',
    monthlyCredits: 244,
    monthlyCap: 180,
    verifiedVisits: 244,
    dishes: [
      {
        name: 'Turmeric Tempeh Bowl',
        ingredients: 'Tempeh, pumpkin, greens, sesame',
        macros: '460 kcal / 29g protein / 31g carbs / 20g fat',
      },
    ],
  },
]

const selectedRestaurantId = ref(restaurants[0].id)

const selectedRestaurant = computed(
  () =>
    restaurants.find((restaurant) => restaurant.id === selectedRestaurantId.value) ??
    restaurants[0],
)

const featuredDish = computed(() => selectedRestaurant.value.dishes[0])
</script>

<template>
  <div class="page-shell">
    <main class="layout">
      <section class="admin-layout">
        <article class="detail-card detail-card--primary">
          <div class="panel-head panel-head--row">
            <div>
              <p class="section-kicker">Claimed restaurant admin</p>
              <h3>{{ selectedRestaurant.name }}</h3>
            </div>
            <span class="pill pill--rose">Claim active</span>
          </div>

          <div class="field-group">
            <span class="field-label">Restaurant</span>
            <div class="chip-list">
              <button
                v-for="restaurant in restaurants"
                :key="restaurant.id"
                class="chip"
                :class="{ 'chip--active': selectedRestaurantId === restaurant.id }"
                @click="selectedRestaurantId = restaurant.id"
              >
                {{ restaurant.name }}
              </button>
            </div>
          </div>

          <div class="admin-kpis">
            <article class="stat-card">
              <span class="stat-card__value">{{ selectedRestaurant.verifiedVisits }}</span>
              <span class="stat-card__label">Verified visits</span>
            </article>
            <article class="stat-card">
              <span class="stat-card__value">{{ selectedRestaurant.monthlyCredits }}</span>
              <span class="stat-card__label">Impact Credits</span>
            </article>
            <article class="stat-card">
              <span class="stat-card__value">{{ selectedRestaurant.dishes.length }}</span>
              <span class="stat-card__label">Published dishes</span>
            </article>
          </div>

          <form class="admin-form">
            <label>
              Claimed listing source
              <input :value="`Imported from Overpass: ${selectedRestaurant.name}`" type="text" />
            </label>
            <label>
              Dish name
              <input :value="featuredDish.name" type="text" />
            </label>
            <label>
              Ingredients
              <input :value="featuredDish.ingredients" type="text" />
            </label>
            <label>
              Macronutrients
              <input :value="featuredDish.macros" type="text" />
            </label>
            <button type="button" class="primary-button">Upload dish to marketplace</button>
          </form>
        </article>

        <article class="detail-card">
          <div class="panel-head">
            <p class="section-kicker">Admin rules</p>
            <h3>How a listing becomes promoted</h3>
          </div>

          <div class="impact-stack">
            <div class="impact-step">
              <span>1</span>
              <p>Claim an imported restaurant or cafe from the Overpass feed.</p>
            </div>
            <div class="impact-step">
              <span>2</span>
              <p>Upload dishes, ingredients, and macros for expat-facing discovery.</p>
            </div>
            <div class="impact-step">
              <span>3</span>
              <p>Stay in good standing on monthly settlement to keep promoted placement.</p>
            </div>
          </div>

          <div class="settlement-card">
            <div>
              <span class="field-label">Monthly report</span>
              <strong>{{ selectedRestaurant.monthlyCredits }} credits at 20,000 VND each</strong>
            </div>
            <div>
              <span class="field-label">Suggested cap</span>
              <strong>{{ selectedRestaurant.monthlyCap }} credits</strong>
            </div>
            <div>
              <span class="field-label">Dispute window</span>
              <strong>7 days after report</strong>
            </div>
          </div>
        </article>
      </section>
    </main>
  </div>
</template>
