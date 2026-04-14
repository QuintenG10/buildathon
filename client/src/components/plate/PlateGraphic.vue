<script setup>
import { computed } from 'vue'
import { SECTION_CONFIG, SECTION_ORDER } from '../../lib/dietPlate'

const props = defineProps({
  plate: {
    type: Object,
    required: true,
  },
  activeSection: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['select-section'])

const radius = 152
const center = 180

function polarToCartesian(cx, cy, valueRadius, angleInDegrees) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180

  return {
    x: cx + valueRadius * Math.cos(angleInRadians),
    y: cy + valueRadius * Math.sin(angleInRadians),
  }
}

function buildArcPath(startAngle, endAngle) {
  const start = polarToCartesian(center, center, radius, endAngle)
  const end = polarToCartesian(center, center, radius, startAngle)
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1

  return [`M ${center} ${center}`, `L ${start.x} ${start.y}`, `A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`, 'Z'].join(' ')
}

const slices = computed(() => {
  let startAngle = 0

  return SECTION_ORDER.map((key) => {
    const value = props.plate[key]
    const sweep = (value / 100) * 360
    const endAngle = startAngle + sweep
    const midAngle = startAngle + sweep / 2
    const labelPoint = polarToCartesian(center, center, 98, midAngle)
    const slice = {
      ...SECTION_CONFIG[key],
      value,
      path: buildArcPath(startAngle, endAngle),
      labelX: labelPoint.x,
      labelY: labelPoint.y,
      startAngle,
      endAngle,
    }

    startAngle = endAngle
    return slice
  })
})
</script>

<template>
  <div class="plate-card">
    <svg class="plate-graphic" viewBox="0 0 360 360" role="img" aria-labelledby="plate-title plate-desc">
      <title id="plate-title">Interactive diet plate</title>
      <desc id="plate-desc">
        A three section plate showing protein, vegetables, and carbohydrates with editable shares.
      </desc>

      <circle cx="180" cy="180" r="170" fill="#f7f1e7" />
      <circle cx="180" cy="180" r="160" fill="#fffdf8" stroke="#eadfce" stroke-width="6" />

      <g v-for="slice in slices" :key="slice.key">
        <path
          :d="slice.path"
          :fill="slice.color"
          :class="['plate-slice', { 'plate-slice--active': slice.key === activeSection }]"
          :aria-label="`${slice.label} section, ${slice.value}% of plate`"
          role="button"
          tabindex="0"
          @click="emit('select-section', slice.key)"
          @keydown.enter.prevent="emit('select-section', slice.key)"
          @keydown.space.prevent="emit('select-section', slice.key)"
        />
        <text :x="slice.labelX" :y="slice.labelY - 10" class="plate-label">
          {{ slice.shortLabel }}
        </text>
        <text :x="slice.labelX" :y="slice.labelY + 18" class="plate-value">
          {{ slice.value }}%
        </text>
      </g>

      <circle cx="180" cy="180" r="54" fill="#fffaf0" stroke="#f0e4d2" stroke-width="3" />
      <text x="180" y="170" class="plate-center-label">Build</text>
      <text x="180" y="194" class="plate-center-value">your plate</text>
    </svg>

    <div class="plate-legend">
      <button
        v-for="slice in slices"
        :key="slice.key"
        type="button"
        class="legend-chip"
        :class="{ 'legend-chip--active': slice.key === activeSection }"
        @click="emit('select-section', slice.key)"
      >
        <span class="legend-dot" :style="{ backgroundColor: slice.color }"></span>
        {{ slice.label }} {{ slice.value }}%
      </button>
    </div>
  </div>
</template>

<style scoped>
.plate-card {
  display: grid;
  gap: 1.1rem;
}

.plate-graphic {
  width: min(100%, 460px);
  margin: 0 auto;
  overflow: visible;
  filter: drop-shadow(0 20px 30px rgba(106, 79, 33, 0.12));
}

.plate-slice {
  cursor: pointer;
  stroke: rgba(255, 252, 245, 0.95);
  stroke-width: 4;
  transition: transform 0.2s ease, filter 0.2s ease, opacity 0.2s ease;
  transform-origin: 180px 180px;
}

.plate-slice:hover,
.plate-slice:focus-visible {
  filter: brightness(1.02);
  opacity: 0.94;
  outline: none;
}

.plate-slice--active {
  transform: scale(1.03);
  filter: brightness(1.05);
}

.plate-label,
.plate-value,
.plate-center-label,
.plate-center-value {
  fill: #fffef9;
  text-anchor: middle;
  pointer-events: none;
}

.plate-label {
  font-size: 0.9rem;
  font-weight: 700;
}

.plate-value {
  font-size: 1.3rem;
  font-weight: 800;
}

.plate-center-label {
  fill: #87633e;
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.plate-center-value {
  fill: #5a4024;
  font-size: 1.1rem;
  font-weight: 700;
}

.plate-legend {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.65rem;
}

.legend-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  border: 1px solid rgba(111, 90, 61, 0.12);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.88);
  padding: 0.65rem 0.9rem;
  color: #4a3a26;
  font-weight: 600;
}

.legend-chip--active {
  border-color: rgba(111, 90, 61, 0.3);
  box-shadow: 0 10px 18px rgba(111, 90, 61, 0.12);
}

.legend-dot {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
}
</style>
