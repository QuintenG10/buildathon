export const SECTION_ORDER = ['protein', 'vegetables', 'carbs']

export const SECTION_CONFIG = {
  protein: {
    key: 'protein',
    label: 'Protein',
    shortLabel: 'Protein',
    color: '#d96b43',
    description: 'Focus on iron, B12, protein density, and satisfying main portions.',
    examples: ['Steak', 'Beef pho', 'Lamb skewers', 'Tofu bowls', 'Egg dishes'],
    nutrients: ['iron', 'high-protein', 'b12', 'low-sodium'],
  },
  vegetables: {
    key: 'vegetables',
    label: 'Vegetables',
    shortLabel: 'Veg',
    color: '#4ea96b',
    description: 'Build fibre, folate, vitamin C, and plant-forward variety into the plate.',
    examples: ['Leafy green salads', 'Stir-fried greens', 'Roasted vegetables', 'Herb plates'],
    nutrients: ['fibre', 'vitamin-c', 'folate', 'calcium', 'vegan'],
  },
  carbs: {
    key: 'carbs',
    label: 'Carbohydrates',
    shortLabel: 'Carbs',
    color: '#f0b44b',
    description: 'Shape energy delivery with slower carbs, lower sugar, and wholegrain choices.',
    examples: ['Brown rice bowls', 'Wholegrain banh mi', 'Sweet potato plates', 'Oat bowls'],
    nutrients: ['low-sugar', 'wholegrain', 'slow-energy', 'gluten-free'],
  },
}

export const GLOBAL_NEEDS = ['calcium', 'low-sodium', 'dairy-free', 'gluten-free', 'vegetarian', 'vegan']

export const NUTRIENT_DETAILS = {
  iron: {
    label: 'Iron',
    description: 'Prioritises iron-rich meats, legumes, and dark leafy greens.',
    foods: ['Steak', 'Beef pho', 'Lamb dishes', 'Liver dishes', 'Spinach bowls', 'Legume salads'],
    mealTags: ['steak', 'beef-pho', 'lamb', 'liver', 'leafy-greens', 'legumes'],
    restaurantTags: ['steakhouse', 'pho-restaurant', 'grill-restaurant', 'healthy-bowl-restaurant'],
  },
  calcium: {
    label: 'Calcium',
    description: 'Highlights dairy, tofu, leafy greens, and small fish with bones.',
    foods: ['Yoghurt bowls', 'Cheese dishes', 'Tofu meals', 'Leafy greens', 'Sardines', 'Milk-based dishes'],
    mealTags: ['yoghurt-bowl', 'cheese-dish', 'tofu', 'leafy-greens', 'small-fish', 'milk-based-meal'],
    restaurantTags: ['healthy-cafe', 'vegetarian-restaurant', 'tofu-focused-restaurant', 'dairy-cafe'],
  },
  'high-protein': {
    label: 'High protein',
    description: 'Surfaces meals with dense protein per serving and gym-friendly portions.',
    foods: ['Chicken breast meals', 'Fish dishes', 'Egg plates', 'Tofu bowls', 'Greek yoghurt bowls'],
    mealTags: ['chicken-breast', 'fish-dish', 'egg-plate', 'tofu-bowl', 'greek-yoghurt-bowl'],
    restaurantTags: ['gym-friendly-meals', 'high-protein-options', 'macro-kitchen'],
  },
  b12: {
    label: 'B12',
    description: 'Looks for animal proteins and fortified options that support B12 intake.',
    foods: ['Beef dishes', 'Egg plates', 'Fish mains', 'Fortified tofu meals'],
    mealTags: ['beef-dish', 'egg-plate', 'fish-main', 'fortified-tofu'],
    restaurantTags: ['breakfast-cafe', 'grill-restaurant', 'seafood-kitchen'],
  },
  fibre: {
    label: 'Fibre',
    description: 'Promotes vegetables, legumes, grains, and bowls with high roughage.',
    foods: ['Bean salads', 'Veg bowls', 'Chia breakfasts', 'Wholegrain plates'],
    mealTags: ['bean-salad', 'veg-bowl', 'chia-breakfast', 'wholegrain-plate'],
    restaurantTags: ['salad-bar', 'healthy-cafe', 'wholefood-kitchen'],
  },
  'vitamin-c': {
    label: 'Vitamin C',
    description: 'Favours citrus, herbs, peppers, and fruit-heavy vegetable combinations.',
    foods: ['Citrus salads', 'Fresh herb bowls', 'Pepper stir-fries', 'Fruit yoghurt bowls'],
    mealTags: ['citrus-salad', 'herb-bowl', 'pepper-stir-fry', 'fruit-yoghurt-bowl'],
    restaurantTags: ['juice-cafe', 'fresh-kitchen', 'garden-restaurant'],
  },
  folate: {
    label: 'Folate',
    description: 'Emphasises greens, beans, herbs, and vegetable-rich plates.',
    foods: ['Spinach omelettes', 'Bean bowls', 'Herb salads', 'Avocado plates'],
    mealTags: ['spinach-omelette', 'bean-bowl', 'herb-salad', 'avocado-plate'],
    restaurantTags: ['brunch-cafe', 'veggie-spot', 'healthy-bowl-restaurant'],
  },
  'low-sugar': {
    label: 'Low sugar',
    description: 'Filters away sweet sauces, desserts, and high-sugar drinks.',
    foods: ['Unsweetened bowls', 'Grilled proteins', 'Wholefood meals', 'Sugar-free drinks'],
    mealTags: ['unsweetened-bowl', 'grilled-protein', 'wholefood-meal', 'sugar-free-drink'],
    restaurantTags: ['low-sugar-options', 'diabetic-friendly-options', 'no-added-sugar-choices'],
  },
  wholegrain: {
    label: 'Wholegrain',
    description: 'Rewards slow-digesting grains and better carb quality.',
    foods: ['Brown rice bowls', 'Wholegrain banh mi', 'Oat pots', 'Mixed grain plates'],
    mealTags: ['brown-rice-bowl', 'wholegrain-banh-mi', 'oat-pot', 'mixed-grain-plate'],
    restaurantTags: ['wholefood-kitchen', 'healthy-cafe', 'breakfast-cafe'],
  },
  'slow-energy': {
    label: 'Slow energy',
    description: 'Targets meals that avoid sharp spikes and support steady energy release.',
    foods: ['Sweet potato plates', 'Brown rice combos', 'Protein oat bowls'],
    mealTags: ['sweet-potato-plate', 'brown-rice-combo', 'protein-oat-bowl'],
    restaurantTags: ['meal-prep-kitchen', 'macro-kitchen', 'wholefood-kitchen'],
  },
  'low-sodium': {
    label: 'Low sodium',
    description: 'Favors plainer preparations, lighter sauces, and customisable seasoning.',
    foods: ['Steamed dishes', 'Plain grilled meals', 'Low-sauce bowls', 'Customisable plates'],
    mealTags: ['steamed-dish', 'plain-grilled-meal', 'low-sauce-bowl', 'customisable-plate'],
    restaurantTags: ['low-sodium-options', 'made-to-order-meals', 'customisable-menu'],
  },
  'dairy-free': {
    label: 'Dairy free',
    description: 'Excludes dairy ingredients and prioritises kitchens with substitution options.',
    foods: ['Coconut yoghurt bowls', 'Olive oil dressings', 'Tofu plates', 'Plant-based drinks'],
    mealTags: ['coconut-yoghurt-bowl', 'olive-oil-dressing', 'tofu-plate', 'plant-based-drink'],
    restaurantTags: ['plant-based-cafe', 'allergy-aware-kitchen', 'customisable-menu'],
  },
  'gluten-free': {
    label: 'Gluten free',
    description: 'Finds meals built around rice, vegetables, proteins, and gluten-free swaps.',
    foods: ['Rice noodle bowls', 'Rice plates', 'GF salad bowls', 'Sweet potato meals'],
    mealTags: ['rice-noodle-bowl', 'rice-plate', 'gf-salad-bowl', 'sweet-potato-meal'],
    restaurantTags: ['gluten-free-options', 'allergy-aware-kitchen', 'healthy-cafe'],
  },
  vegetarian: {
    label: 'Vegetarian',
    description: 'Highlights vegetarian kitchens and dishes without meat or seafood.',
    foods: ['Tofu bowls', 'Egg plates', 'Veg curries', 'Cheese salads'],
    mealTags: ['tofu-bowl', 'egg-plate', 'veg-curry', 'cheese-salad'],
    restaurantTags: ['vegetarian-restaurant', 'healthy-cafe', 'garden-restaurant'],
  },
  vegan: {
    label: 'Vegan',
    description: 'Prioritises fully plant-based dishes and vegan-friendly venues.',
    foods: ['Tempeh bowls', 'Bean salads', 'Mushroom pho', 'Vegan wraps'],
    mealTags: ['tempeh-bowl', 'bean-salad', 'mushroom-pho', 'vegan-wrap'],
    restaurantTags: ['vegan-restaurant', 'plant-based-cafe', 'healthy-bowl-restaurant'],
  },
}

export const MOCK_RESTAURANTS = [
  {
    id: 'rest-1',
    name: 'Iron Ember Grill',
    cuisine: 'Steakhouse',
    area: 'Hai Chau, Da Nang',
    coordinates: '16.0678,108.2208',
    restaurantTags: ['steakhouse', 'grill-restaurant', 'high-protein-options', 'customisable-menu'],
    mealTags: ['steak', 'lamb', 'plain-grilled-meal', 'low-sauce-bowl'],
    nutrientTags: ['iron', 'high-protein', 'low-sodium'],
    dishes: ['Sirloin plate', 'Lamb skewers', 'Lean beef salad'],
  },
  {
    id: 'rest-2',
    name: 'Pho Foundry',
    cuisine: 'Vietnamese',
    area: 'District 1, Ho Chi Minh City',
    coordinates: '10.7769,106.7009',
    restaurantTags: ['pho-restaurant', 'made-to-order-meals', 'customisable-menu'],
    mealTags: ['beef-pho', 'herb-bowl', 'rice-noodle-bowl'],
    nutrientTags: ['iron', 'vitamin-c', 'gluten-free'],
    dishes: ['Rare beef pho', 'Herb-heavy chicken pho', 'Rice noodle side salad'],
  },
  {
    id: 'rest-3',
    name: 'Garden Mineral Cafe',
    cuisine: 'Healthy cafe',
    area: 'Cam Pho, Hoi An',
    coordinates: '15.8794,108.3250',
    restaurantTags: ['healthy-cafe', 'wholefood-kitchen', 'low-sugar-options', 'vegetarian-restaurant'],
    mealTags: ['leafy-greens', 'tofu', 'brown-rice-bowl', 'yoghurt-bowl'],
    nutrientTags: ['calcium', 'fibre', 'low-sugar', 'vegetarian'],
    dishes: ['Tofu greens bowl', 'Unsweetened yoghurt parfait', 'Brown rice herb plate'],
  },
  {
    id: 'rest-4',
    name: 'Lotus Fuel Lab',
    cuisine: 'Plant-based',
    area: 'Thu Duc, Ho Chi Minh City',
    coordinates: '10.8485,106.7720',
    restaurantTags: ['vegan-restaurant', 'plant-based-cafe', 'healthy-bowl-restaurant'],
    mealTags: ['tempeh-bowl', 'bean-salad', 'mushroom-pho', 'sweet-potato-plate'],
    nutrientTags: ['vegan', 'fibre', 'slow-energy', 'low-sodium'],
    dishes: ['Tempeh power bowl', 'Mushroom pho', 'Sweet potato macro plate'],
  },
  {
    id: 'rest-5',
    name: 'Blue Tide Kitchen',
    cuisine: 'Seafood',
    area: 'Son Tra, Da Nang',
    coordinates: '16.1184,108.2446',
    restaurantTags: ['seafood-kitchen', 'high-protein-options', 'low-sodium-options'],
    mealTags: ['fish-main', 'small-fish', 'plain-grilled-meal', 'rice-plate'],
    nutrientTags: ['b12', 'calcium', 'high-protein', 'low-sodium'],
    dishes: ['Grilled sardine plate', 'Steamed fish set', 'Rice and greens combo'],
  },
]

export const DEFAULT_PLATE = {
  protein: 30,
  vegetables: 40,
  carbs: 30,
}

export function normalizePlate(plate) {
  const values = SECTION_ORDER.map((key) => Number(plate[key]) || 0)
  const total = values.reduce((sum, value) => sum + value, 0)

  if (!total) {
    return { ...DEFAULT_PLATE }
  }

  const normalized = {}
  let remainder = 100

  SECTION_ORDER.forEach((key, index) => {
    if (index === SECTION_ORDER.length - 1) {
      normalized[key] = remainder
      return
    }

    const value = Math.round(((Number(plate[key]) || 0) / total) * 100)
    normalized[key] = value
    remainder -= value
  })

  return normalized
}

export function rebalancePlate(currentPlate, changedKey, requestedValue, min = 10) {
  const nextPlate = { ...currentPlate }
  const others = SECTION_ORDER.filter((key) => key !== changedKey)
  const safeRequested = Math.max(min, Math.min(100 - min * others.length, Math.round(requestedValue)))
  nextPlate[changedKey] = safeRequested

  const remaining = 100 - safeRequested
  const currentOtherTotal = others.reduce((sum, key) => sum + currentPlate[key], 0)
  let remainder = remaining

  others.forEach((key, index) => {
    if (index === others.length - 1) {
      nextPlate[key] = remainder
      return
    }

    const proportional = currentOtherTotal > 0 ? (currentPlate[key] / currentOtherTotal) * remaining : remaining / others.length
    const maxForThis = remainder - min * (others.length - index - 1)
    const nextValue = Math.max(min, Math.min(maxForThis, Math.round(proportional)))
    nextPlate[key] = nextValue
    remainder -= nextValue
  })

  return normalizePlate(nextPlate)
}

export function collectSelectedNeeds(selectedNeedsBySection, globalNeeds) {
  const localNeeds = Object.values(selectedNeedsBySection).flat()
  return [...new Set([...localNeeds, ...globalNeeds])]
}

export function buildFilterPayload(plateComposition, selectedNeedsBySection, globalNeeds) {
  const selectedNeeds = collectSelectedNeeds(selectedNeedsBySection, globalNeeds)
  const mealTags = new Set()
  const restaurantTags = new Set()

  selectedNeeds.forEach((need) => {
    const detail = NUTRIENT_DETAILS[need]
    if (!detail) {
      return
    }

    detail.mealTags.forEach((tag) => mealTags.add(tag))
    detail.restaurantTags.forEach((tag) => restaurantTags.add(tag))
  })

  return {
    plateComposition: normalizePlate(plateComposition),
    selectedNeeds,
    selectedNeedsBySection,
    globalNeeds,
    nutrientTags: selectedNeeds,
    restaurantTags: [...restaurantTags],
    mealTags: [...mealTags],
    userIntent: 'find-restaurants-on-map',
  }
}

export function buildPlateQuery(plateComposition) {
  return SECTION_ORDER.map((key) => `${key}:${plateComposition[key]}`).join(',')
}

export function parsePlateQuery(value) {
  if (!value) {
    return { ...DEFAULT_PLATE }
  }

  const entries = value.split(',').map((pair) => pair.trim().split(':'))
  const plate = { ...DEFAULT_PLATE }

  entries.forEach(([key, rawValue]) => {
    if (SECTION_ORDER.includes(key)) {
      plate[key] = Number(rawValue) || plate[key]
    }
  })

  return normalizePlate(plate)
}

export function parseNeedsQuery(value) {
  if (!value) {
    return []
  }

  return [...new Set(value.split(',').map((item) => item.trim()).filter(Boolean))]
}

export function getNeedLabel(need) {
  return NUTRIENT_DETAILS[need]?.label ?? need
}

export function getNeedDetails(need) {
  return NUTRIENT_DETAILS[need]
}

export function getSectionNeeds(sectionKey) {
  return SECTION_CONFIG[sectionKey]?.nutrients ?? []
}

export function getMatchingRestaurants(payload) {
  const restaurantTagSet = new Set(payload.restaurantTags)
  const mealTagSet = new Set(payload.mealTags)
  const nutrientSet = new Set(payload.selectedNeeds)

  return MOCK_RESTAURANTS.map((restaurant) => {
    const matchedRestaurantTags = restaurant.restaurantTags.filter((tag) => restaurantTagSet.has(tag))
    const matchedMealTags = restaurant.mealTags.filter((tag) => mealTagSet.has(tag))
    const matchedNutrients = restaurant.nutrientTags.filter((tag) => nutrientSet.has(tag))
    const score = matchedRestaurantTags.length * 3 + matchedMealTags.length * 2 + matchedNutrients.length * 4

    return {
      ...restaurant,
      matchedRestaurantTags,
      matchedMealTags,
      matchedNutrients,
      score,
    }
  })
    .filter((restaurant) => restaurant.score > 0)
    .sort((left, right) => right.score - left.score)
}
