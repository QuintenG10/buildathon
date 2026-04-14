<script setup>
import { computed, ref } from "vue";

const diets = [
  "Balanced",
  "High protein",
  "Low carb",
  "Low sugar",
  "Vegetarian",
  "Vegan",
  "Dairy free",
  "Gluten aware",
];

const exclusions = [
  "Pork",
  "Beef",
  "Chicken",
  "Seafood",
  "Shellfish",
  "Egg",
  "Dairy",
  "Gluten",
  "Peanuts",
  "Soy",
  "Added sugar",
  "MSG",
];

const causes = [
  { name: "Blue Dragon", focus: "Child protection and food access" },
  { name: "KOTO", focus: "Hospitality training and youth support" },
  {
    name: "Da Nang Animal Rescue",
    focus: "Meals and medical support for rescues",
  },
];

const restaurants = [
  {
    id: 1,
    name: "Green Bowl Da Nang",
    area: "Hai Chau, Da Nang",
    cuisine: ["Vietnamese", "Bowls", "Healthy"],
    status: "claimed",
    marketing: "promoted",
    score: 94,
    confidence: "Verified by restaurant",
    monthlyCredits: 182,
    monthlyCap: 200,
    verifiedVisits: 182,
    cause: "Blue Dragon",
    marker: { top: "30%", left: "54%" },
    safeFor: ["Shellfish", "Added sugar", "Pork"],
    dishes: [
      {
        name: "Lemongrass Chicken Bowl",
        calories: 520,
        protein: 41,
        carbs: 36,
        fat: 19,
        ingredients: ["chicken", "brown rice", "pickled carrot", "herbs"],
      },
      {
        name: "Tofu Herb Rolls",
        calories: 380,
        protein: 22,
        carbs: 34,
        fat: 14,
        ingredients: ["tofu", "lettuce", "rice paper", "mint", "peanuts"],
      },
    ],
  },
  {
    id: 2,
    name: "Lotus Fuel Kitchen",
    area: "District 1, Ho Chi Minh City",
    cuisine: ["Vegan", "Juice", "Modern Vietnamese"],
    status: "claimed",
    marketing: "promoted",
    score: 91,
    confidence: "Verified by restaurant",
    monthlyCredits: 244,
    monthlyCap: 180,
    verifiedVisits: 244,
    cause: "KOTO",
    marker: { top: "64%", left: "67%" },
    safeFor: ["Beef", "Chicken", "Seafood", "Egg", "Dairy"],
    dishes: [
      {
        name: "Turmeric Tempeh Bowl",
        calories: 460,
        protein: 29,
        carbs: 31,
        fat: 20,
        ingredients: ["tempeh", "pumpkin", "greens", "sesame"],
      },
      {
        name: "Green Pho",
        calories: 290,
        protein: 11,
        carbs: 30,
        fat: 10,
        ingredients: ["zucchini noodles", "mushroom", "lime", "basil"],
      },
    ],
  },
  {
    id: 3,
    name: "Harbor Macro Grill",
    area: "Son Tra, Da Nang",
    cuisine: ["Seafood", "Grill", "Meal prep"],
    status: "claimed",
    marketing: "claim-pending-payment",
    score: 88,
    confidence: "Verified by restaurant",
    monthlyCredits: 128,
    monthlyCap: 220,
    verifiedVisits: 128,
    cause: "Blue Dragon",
    marker: { top: "34%", left: "59%" },
    safeFor: ["Gluten", "Added sugar"],
    dishes: [
      {
        name: "Charred Tuna Greens",
        calories: 410,
        protein: 44,
        carbs: 12,
        fat: 18,
        ingredients: ["tuna", "greens", "avocado", "cucumber"],
      },
      {
        name: "Shrimp Cauli Pot",
        calories: 430,
        protein: 33,
        carbs: 16,
        fat: 24,
        ingredients: ["shrimp", "cauliflower rice", "coconut milk", "lime"],
      },
    ],
  },
  {
    id: 4,
    name: "Hoi An Garden Cafe",
    area: "Cam Pho, Hoi An",
    cuisine: ["Cafe", "Breakfast"],
    status: "unclaimed",
    marketing: "not-active",
    score: 73,
    confidence: "Imported from Overpass",
    monthlyCredits: 0,
    monthlyCap: 200,
    verifiedVisits: 0,
    cause: "Not selected",
    marker: { top: "38%", left: "56%" },
    safeFor: ["Dairy"],
    dishes: [],
  },
];

const activeWorkspace = ref("discover");
const selectedDiet = ref("High protein");
const selectedCause = ref(causes[0].name);
const selectedExclusions = ref(["Shellfish", "Added sugar"]);
const selectedRestaurantId = ref(1);

const selectedRestaurant = computed(
  () =>
    restaurants.find(
      (restaurant) => restaurant.id === selectedRestaurantId.value,
    ) ?? restaurants[0],
);

const publicListings = computed(() => restaurants.length);
const claimedListings = computed(
  () =>
    restaurants.filter((restaurant) => restaurant.status === "claimed").length,
);
const promotedListings = computed(
  () =>
    restaurants.filter((restaurant) => restaurant.marketing === "promoted")
      .length,
);

const toggleExclusion = (item) => {
  if (selectedExclusions.value.includes(item)) {
    selectedExclusions.value = selectedExclusions.value.filter(
      (entry) => entry !== item,
    );
    return;
  }

  selectedExclusions.value = [...selectedExclusions.value, item];
};

const visibleRestaurants = computed(() => {
  return restaurants
    .filter((restaurant) => restaurant.status === "claimed")
    .map((restaurant) => {
      const conflicts = selectedExclusions.value.filter(
        (item) => !restaurant.safeFor.includes(item),
      );
      const dietBoost = restaurant.cuisine.some((entry) =>
        entry
          .toLowerCase()
          .includes(selectedDiet.value.toLowerCase().split(" ")[0]),
      )
        ? 8
        : 0;

      const adjustedScore = Math.max(
        56,
        restaurant.score + dietBoost - conflicts.length * 10,
      );

      return {
        ...restaurant,
        conflicts,
        adjustedScore,
        matchLabel:
          adjustedScore >= 90
            ? "Great fit"
            : adjustedScore >= 76
              ? "Possible fit"
              : "Needs review",
      };
    })
    .sort((left, right) => right.adjustedScore - left.adjustedScore);
});

const totalCredits = computed(() =>
  restaurants.reduce((sum, restaurant) => sum + restaurant.monthlyCredits, 0),
);

const mapQuery = computed(() => {
  if (activeWorkspace.value === "discover") {
    return encodeURIComponent(
      `${selectedRestaurant.value.name}, ${selectedRestaurant.value.area}, Vietnam`,
    );
  }

  return encodeURIComponent("Da Nang, Vietnam");
});

const googleMapsEmbedUrl = computed(
  () => `https://www.google.com/maps?q=${mapQuery.value}&output=embed`,
);
</script>

<template>
  <div class="page-shell">
    <main class="layout">
      <!-- <section class="hero">
        <div class="hero__copy">
          <p class="section-kicker">A closed-loop local impact model</p>
          <h2>Expats find healthy places to eat. Local businesses gain visibility. Vulnerable communities benefit too.</h2>
          <p class="hero__lede">
            The platform turns eating out into a better local cycle: expats discover diet-friendly
            restaurants, claimed businesses get marketing and repeat demand, and verified visits help
            direct support toward people who feel the pressure of expat and tourism growth the most.
          </p>

          <div class="hero__actions">
            <button class="primary-button" @click="activeWorkspace = 'discover'">View expat journey</button>
            <button class="secondary-button" @click="activeWorkspace = 'admin'">View restaurant admin</button>
          </div>

          <div class="story-strip">
            <article class="story-step">
              <span class="story-step__number">01</span>
              <div>
                <strong>Expats eat with confidence</strong>
                <p>Users filter by diet, exclusions, ingredients, and macros to find healthier places faster.</p>
              </div>
            </article>
            <article class="story-step">
              <span class="story-step__number">02</span>
              <div>
                <strong>Local restaurants get free marketing</strong>
                <p>Claimed listings stand out on the map and reach diners who are actively looking for their offer.</p>
              </div>
            </article>
            <article class="story-step">
              <span class="story-step__number">03</span>
              <div>
                <strong>The upside flows back locally</strong>
                <p>Verified visits generate Impact Credits that support causes helping communities under the most pressure.</p>
              </div>
            </article>
          </div>
        </div>

        <div class="hero__stats">
          <article class="stat-card">
            <span class="stat-card__value">{{ publicListings }}</span>
            <span class="stat-card__label">Public listings imported</span>
          </article>
          <article class="stat-card">
            <span class="stat-card__value">{{ claimedListings }}</span>
            <span class="stat-card__label">Claimed restaurants</span>
          </article>
          <article class="stat-card">
            <span class="stat-card__value">{{ promotedListings }}</span>
            <span class="stat-card__label">Promoted on-map listings</span>
          </article>
          <article class="stat-card">
            <span class="stat-card__value">{{ totalCredits }}</span>
            <span class="stat-card__label">Impact Credits this month</span>
          </article>
          <article class="loop-card">
            <p class="section-kicker section-kicker--small">Closed circle</p>
            <h3>Healthy discovery creates local revenue, and local revenue creates local support.</h3>
            <p>
              Better restaurant discovery leads to more verified visits. More verified visits lead
              to more community impact. The more the platform grows, the more the local loop works.
            </p>
          </article>
        </div>
      </section> -->

      <section v-if="activeWorkspace === 'discover'" class="discover-layout">
        <aside class="filters-panel">
          <div class="panel-head">
            <p class="section-kicker">Expat frontend</p>
            <h3>Find diet-friendly places quickly</h3>
          </div>

          <label class="search-field">
            <span>Search place or district</span>
            <input type="text" value="Da Nang" />
          </label>

          <div class="field-group">
            <span class="field-label">Diet</span>
            <div class="chip-list">
              <button
                v-for="diet in diets"
                :key="diet"
                class="chip"
                :class="{ 'chip--active': selectedDiet === diet }"
                @click="selectedDiet = diet"
              >
                {{ diet }}
              </button>
            </div>
          </div>

          <div class="field-group">
            <span class="field-label">Exclude foods</span>
            <div class="chip-list">
              <button
                v-for="item in exclusions"
                :key="item"
                class="chip chip--light"
                :class="{ 'chip--danger': selectedExclusions.includes(item) }"
                @click="toggleExclusion(item)"
              >
                {{ item }}
              </button>
            </div>
          </div>

          <div class="panel-note">
            <strong>Visibility rule</strong>
            <p>
              Users only see claimed restaurants in the main discovery layer.
              Imported but unclaimed places stay out of promoted search.
            </p>
          </div>
        </aside>

        <section class="map-panel">
          <div class="panel-head panel-head--row">
            <div>
              <p class="section-kicker">Discovery map</p>
              <h3>Claimed restaurants available to expats</h3>
            </div>
            <div class="mini-badges">
              <span class="mini-badge">Claimed only</span>
              <span class="mini-badge">Diet matched</span>
            </div>
          </div>

          <div class="map-canvas">
            <div class="map-canvas__toolbar">
              <span>Da Nang</span>
              <span>{{ visibleRestaurants.length }} live claimed listings</span>
            </div>

            <div class="map-canvas__surface">
              <iframe
                class="map-embed"
                :src="googleMapsEmbedUrl"
                loading="lazy"
                allowfullscreen
                referrerpolicy="no-referrer-when-downgrade"
                title="Google Maps embed for selected restaurant"
              ></iframe>

              <div
                v-for="restaurant in visibleRestaurants"
                :key="restaurant.id"
                class="map-pin"
                :class="{
                  'map-pin--active': selectedRestaurantId === restaurant.id,
                }"
                :style="restaurant.marker"
                @click="selectedRestaurantId = restaurant.id"
              >
                <span>{{ restaurant.id }}</span>
              </div>
            </div>
          </div>

          <div class="listing-grid">
            <article
              v-for="restaurant in visibleRestaurants"
              :key="restaurant.id"
              class="listing-card"
              :class="{
                'listing-card--active': selectedRestaurantId === restaurant.id,
              }"
              @click="selectedRestaurantId = restaurant.id"
            >
              <div class="listing-card__top">
                <div>
                  <div class="listing-card__badges">
                    <span class="pill pill--rose">Claimed</span>
                    <span class="pill">{{
                      restaurant.marketing === "promoted"
                        ? "Promoted"
                        : "Claimed only"
                    }}</span>
                  </div>
                  <h4>{{ restaurant.name }}</h4>
                  <p>{{ restaurant.area }}</p>
                </div>
                <div class="score-badge">{{ restaurant.adjustedScore }}</div>
              </div>

              <div class="tag-row">
                <span
                  v-for="tag in restaurant.cuisine"
                  :key="tag"
                  class="tag"
                  >{{ tag }}</span
                >
              </div>

              <div class="listing-card__bottom">
                <span>{{ restaurant.matchLabel }}</span>
                <span>{{ restaurant.confidence }}</span>
              </div>
            </article>
          </div>
        </section>
      </section>

      <section v-if="activeWorkspace === 'discover'" class="detail-layout">
        <article class="detail-card detail-card--primary">
          <div class="panel-head panel-head--row">
            <div>
              <p class="section-kicker">Restaurant detail</p>
              <h3>{{ selectedRestaurant.name }}</h3>
            </div>
            <span class="pill pill--rose">Claimed listing</span>
          </div>

          <p class="detail-copy">
            Restaurants become marketable after they claim an imported listing
            and publish their own dish data. That lets expats browse real
            ingredients and macros instead of rough public estimates only.
          </p>

          <div class="detail-stats">
            <div>
              <span class="field-label">Location</span>
              <strong>{{ selectedRestaurant.area }}</strong>
            </div>
            <div>
              <span class="field-label">Verified visits</span>
              <strong>{{ selectedRestaurant.verifiedVisits }}</strong>
            </div>
            <div>
              <span class="field-label">Cause</span>
              <strong>{{ selectedRestaurant.cause }}</strong>
            </div>
          </div>

          <div class="dish-grid">
            <article
              v-for="dish in selectedRestaurant.dishes"
              :key="dish.name"
              class="dish-card"
            >
              <div class="dish-card__top">
                <div>
                  <p class="section-kicker section-kicker--small">
                    Uploaded by restaurant
                  </p>
                  <h4>{{ dish.name }}</h4>
                </div>
                <span class="pill">{{ dish.calories }} kcal</span>
              </div>

              <div class="macro-row">
                <span>P {{ dish.protein }}g</span>
                <span>C {{ dish.carbs }}g</span>
                <span>F {{ dish.fat }}g</span>
              </div>

              <div class="tag-row">
                <span
                  v-for="ingredient in dish.ingredients"
                  :key="ingredient"
                  class="tag"
                  :class="{
                    'tag--warning': selectedExclusions.some((item) =>
                      ingredient.toLowerCase().includes(item.toLowerCase()),
                    ),
                  }"
                >
                  {{ ingredient }}
                </span>
              </div>
            </article>
          </div>
        </article>

        <article class="detail-card">
          <div class="panel-head">
            <p class="section-kicker">Impact</p>
            <h3>Receipts create Impact Credits</h3>
          </div>

          <div class="impact-stack">
            <div class="impact-step">
              <span>1</span>
              <p>User uploads a receipt from a claimed restaurant.</p>
            </div>
            <div class="impact-step">
              <span>2</span>
              <p>Platform verifies the visit and generates an Impact Credit.</p>
            </div>
            <div class="impact-step">
              <span>3</span>
              <p>Monthly settlement funds the supported local cause.</p>
            </div>
          </div>

          <div class="cause-picker">
            <span class="field-label">Supported cause</span>
            <div class="cause-list">
              <button
                v-for="cause in causes"
                :key="cause.name"
                class="cause-card"
                :class="{ 'cause-card--active': selectedCause === cause.name }"
                @click="selectedCause = cause.name"
              >
                <strong>{{ cause.name }}</strong>
                <span>{{ cause.focus }}</span>
              </button>
            </div>
          </div>
        </article>
      </section>

      <section v-if="activeWorkspace === 'admin'" class="admin-layout">
        <article class="detail-card detail-card--primary">
          <div class="panel-head panel-head--row">
            <div>
              <p class="section-kicker">Claimed restaurant admin</p>
              <h3>{{ selectedRestaurant.name }}</h3>
            </div>
            <span class="pill pill--rose">Claim active</span>
          </div>

          <div class="admin-kpis">
            <article class="stat-card">
              <span class="stat-card__value">{{
                selectedRestaurant.verifiedVisits
              }}</span>
              <span class="stat-card__label">Verified visits</span>
            </article>
            <article class="stat-card">
              <span class="stat-card__value">{{
                selectedRestaurant.monthlyCredits
              }}</span>
              <span class="stat-card__label">Impact Credits</span>
            </article>
            <article class="stat-card">
              <span class="stat-card__value">{{
                selectedRestaurant.dishes.length
              }}</span>
              <span class="stat-card__label">Published dishes</span>
            </article>
          </div>

          <form class="admin-form">
            <label>
              Claimed listing source
              <input
                type="text"
                value="Imported from Overpass: Green Bowl Da Nang"
              />
            </label>
            <label>
              Dish name
              <input type="text" value="Lemongrass Chicken Bowl" />
            </label>
            <label>
              Ingredients
              <input
                type="text"
                value="Chicken, brown rice, pickled carrot, herbs"
              />
            </label>
            <label>
              Macronutrients
              <input
                type="text"
                value="520 kcal / 41g protein / 36g carbs / 19g fat"
              />
            </label>
            <button type="button" class="primary-button">
              Upload dish to marketplace
            </button>
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
              <p>
                Claim an imported restaurant or cafe from the Overpass feed.
              </p>
            </div>
            <div class="impact-step">
              <span>2</span>
              <p>
                Upload dishes, ingredients, and macros for expat-facing
                discovery.
              </p>
            </div>
            <div class="impact-step">
              <span>3</span>
              <p>
                Stay in good standing on monthly settlement to keep promoted
                placement.
              </p>
            </div>
          </div>

          <div class="settlement-card">
            <div>
              <span class="field-label">Monthly report</span>
              <strong
                >{{ selectedRestaurant.monthlyCredits }} credits at 20,000 VND
                each</strong
              >
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
