<script setup>
import { computed } from 'vue'

const props = defineProps({
  impactBitesTotal: {
    type: Number,
    required: true,
  },
  impactImageUrl: {
    type: String,
    required: true,
  },
  impactCaption: {
    type: String,
    required: true,
  },
  verifiedMealsCount: {
    type: Number,
    default: 0,
  },
  monthlyGoal: {
    type: Number,
    default: 12,
  },
})

const progressWidth = computed(() => {
  if (!props.monthlyGoal) {
    return 0
  }

  return Math.min(100, Math.round((props.verifiedMealsCount / props.monthlyGoal) * 100))
})
</script>

<template>
  <article class="impact-card">
    <div class="impact-card__header">
      <div>
        <p class="impact-card__eyebrow">Community Impact</p>
        <h2>Impact Bites</h2>
      </div>
      <span class="impact-card__badge">Live total</span>
    </div>

    <div class="impact-card__number">{{ impactBitesTotal }}</div>

    <p class="impact-card__description">Earned from verified meals at partner restaurants</p>

    <figure class="impact-card__media">
      <img :src="impactImageUrl" alt="Community meal support at a partner project" />
      <figcaption>{{ impactCaption }}</figcaption>
    </figure>

    <footer class="impact-card__footer">
      <div class="impact-card__metric">
        <strong>{{ verifiedMealsCount }}</strong>
        <span>meals this month</span>
      </div>

      <div class="impact-card__progress" aria-label="Monthly meal progress">
        <div class="impact-card__progress-track">
          <span class="impact-card__progress-fill" :style="{ width: `${progressWidth}%` }" />
        </div>
        <p>{{ progressWidth }}% of monthly partner goal</p>
      </div>
    </footer>
  </article>
</template>

<style scoped>
.impact-card {
  display: grid;
  gap: 1.2rem;
  padding: 1.5rem;
  border-radius: 1.75rem;
  background:
    radial-gradient(circle at top left, rgba(232, 111, 62, 0.14), transparent 32%),
    linear-gradient(180deg, #fffdfa 0%, #fff7ef 100%);
  border: 1px solid rgba(102, 68, 31, 0.08);
  box-shadow: 0 24px 44px rgba(85, 58, 27, 0.09);
}

.impact-card__header,
.impact-card__footer {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 1rem;
}

.impact-card__eyebrow {
  margin-bottom: 0.3rem;
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #aa5b2f;
}

.impact-card h2 {
  color: #24180d;
  font-size: clamp(1.8rem, 4vw, 2.4rem);
  line-height: 0.98;
}

.impact-card__badge {
  padding: 0.5rem 0.75rem;
  border-radius: 999px;
  background: rgba(44, 135, 92, 0.1);
  color: #257051;
  font-size: 0.82rem;
  font-weight: 700;
}

.impact-card__number {
  font-size: clamp(4rem, 14vw, 7rem);
  line-height: 0.9;
  letter-spacing: -0.06em;
  font-weight: 900;
  color: #24180d;
}

.impact-card__description {
  max-width: 28ch;
  color: #6d5b49;
  font-size: 1rem;
}

.impact-card__media {
  display: grid;
  gap: 0.75rem;
  margin: 0;
}

.impact-card__media img {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  border-radius: 1.3rem;
  display: block;
  background: #eadfce;
}

.impact-card__media figcaption {
  color: #5f5244;
  font-size: 0.95rem;
}

.impact-card__metric {
  display: grid;
  gap: 0.18rem;
}

.impact-card__metric strong {
  font-size: 1.8rem;
  line-height: 1;
  color: #24180d;
}

.impact-card__metric span,
.impact-card__progress p {
  color: #6d5b49;
}

.impact-card__progress {
  flex: 1;
  display: grid;
  gap: 0.55rem;
}

.impact-card__progress-track {
  overflow: hidden;
  height: 0.75rem;
  border-radius: 999px;
  background: rgba(163, 133, 98, 0.14);
}

.impact-card__progress-fill {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #df6f3b 0%, #f0b94c 100%);
}

@media (max-width: 640px) {
  .impact-card__header,
  .impact-card__footer {
    flex-direction: column;
  }

  .impact-card__description {
    max-width: none;
  }
}
</style>
