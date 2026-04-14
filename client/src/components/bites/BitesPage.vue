<script setup>
import { onMounted, ref } from "vue";
import ImpactBitesCard from "./ImpactBitesCard.vue";
import impactBitesImage from "../../assets/impact-bites.png";

const impactData = ref({
  impactBitesTotal: 0,
  impactImageUrl: impactBitesImage,
  impactCaption:
    "Each verified meal helps fund practical food support through local community partners.",
  verifiedMealsCount: 0,
});

const isLoading = ref(true);

function loadImpactData() {
  window.setTimeout(() => {
    impactData.value = {
      impactBitesTotal: 148,
      impactImageUrl: impactBitesImage,
      impactCaption:
        "Verified meals are translated into visible support, from hot meals served to ingredient packs funded.",
      verifiedMealsCount: 9,
    };
    isLoading.value = false;
  }, 350);
}

function addVerifiedMeal() {
  impactData.value = {
    ...impactData.value,
    impactBitesTotal: impactData.value.impactBitesTotal + 12,
    verifiedMealsCount: impactData.value.verifiedMealsCount + 1,
  };
}

onMounted(() => {
  loadImpactData();
});
</script>

<template>
  <div class="bites-page">
    <section class="bites-layout">
      <ImpactBitesCard v-bind="impactData" />

      <aside class="bites-sidecard">
        <p class="bites-sidecard__eyebrow">Demo controls</p>
        <h2>Simulate the dynamic update</h2>
        <p>
          The card loads with fallback zero-state, then hydrates mock user
          impact data. Use the action below to simulate a newly verified meal.
        </p>

        <div class="bites-sidecard__stats">
          <div>
            <strong>{{ isLoading ? "Loading..." : "Loaded" }}</strong>
            <span>data state</span>
          </div>
          <div>
            <strong>{{ impactData.verifiedMealsCount }}</strong>
            <span>verified meals</span>
          </div>
        </div>

        <button
          type="button"
          class="bites-action"
          :disabled="isLoading"
          @click="addVerifiedMeal"
        >
          Add verified meal
        </button>
      </aside>
    </section>
  </div>
</template>

<style scoped>
.bites-page {
  display: grid;
  gap: 1.5rem;
}

.bites-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(280px, 0.85fr);
  gap: 1.25rem;
  padding: 1.6rem;
  border-radius: 1.7rem;
  background:
    radial-gradient(
      circle at top left,
      rgba(222, 111, 62, 0.16),
      transparent 30%
    ),
    radial-gradient(
      circle at bottom right,
      rgba(73, 147, 111, 0.16),
      transparent 28%
    ),
    linear-gradient(
      180deg,
      rgba(255, 250, 243, 0.98) 0%,
      rgba(251, 243, 232, 0.98) 100%
    );
  border: 1px solid rgba(91, 68, 40, 0.08);
  box-shadow: 0 24px 44px rgba(81, 61, 34, 0.08);
}

.bites-hero__copy,
.bites-hero__note {
  display: grid;
  gap: 0.8rem;
}

.bites-hero__eyebrow {
  margin: 0;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #9f532d;
}

.bites-hero h1,
.bites-hero h2 {
  margin: 0;
  color: #2a2015;
}

.bites-hero h1 {
  max-width: 11ch;
  font-size: clamp(2.5rem, 5vw, 4.4rem);
  line-height: 0.94;
  letter-spacing: -0.04em;
}

.bites-hero p,
.bites-hero li {
  color: #6d614f;
}

.bites-hero__note {
  align-content: start;
  padding: 1.1rem;
  border-radius: 1.35rem;
  background: rgba(255, 255, 255, 0.72);
}

.bites-hero__note ul {
  margin: 0;
  padding-left: 1.1rem;
}

.bites-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(280px, 0.85fr);
  gap: 1.25rem;
}

.bites-sidecard {
  display: grid;
  gap: 1rem;
  align-content: start;
  padding: 1.45rem;
  border-radius: 1.6rem;
  background: rgba(255, 255, 255, 0.84);
  border: 1px solid rgba(91, 68, 40, 0.08);
  box-shadow: 0 20px 40px rgba(81, 61, 34, 0.08);
}

.bites-sidecard__eyebrow {
  margin: 0;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #9f532d;
}

.bites-sidecard h2 {
  margin: 0;
  color: #2a2015;
}

.bites-sidecard p,
.bites-sidecard span {
  color: #6d614f;
}

.bites-sidecard__stats {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.9rem;
}

.bites-sidecard__stats div {
  display: grid;
  gap: 0.3rem;
  padding: 1rem;
  border-radius: 1.1rem;
  background: linear-gradient(180deg, #fffaf3 0%, #ffffff 100%);
  border: 1px solid rgba(91, 68, 40, 0.08);
}

.bites-sidecard__stats strong {
  font-size: 1.6rem;
  line-height: 1;
  color: #2a2015;
}

.bites-action {
  border: 0;
  border-radius: 999px;
  padding: 0.95rem 1.2rem;
  background: linear-gradient(135deg, #d96538 0%, #f0b94c 100%);
  color: #fff;
  font-weight: 800;
}

.bites-action:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

@media (max-width: 960px) {
  .bites-hero,
  .bites-layout {
    grid-template-columns: 1fr;
  }

  .bites-hero h1 {
    max-width: none;
  }
}
</style>
