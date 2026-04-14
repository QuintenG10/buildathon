# Healthy Restaurant Map Vietnam MVP Spec

## 1. Product Summary

Build a Vue.js web application that helps health-conscious users discover restaurants in Vietnam on a map, browse likely dishes, review nutrition-related food data, and filter restaurants based on diet preferences and excluded foods.

The product mission is to connect three groups:

- Users who want healthier meal choices
- Restaurants that want visibility and wellness-driven marketing
- Local causes that benefit from a social-impact points and donation model

This document defines an MVP constrained to the APIs already provided:

- Open Food Facts: `https://world.openfoodfacts.org`
- Overpass API / OpenStreetMap: `https://overpass-api.de`
- VN Provinces API: `https://provinces.open-api.vn`

## 2. Core Constraint

The MVP must be frontend-only in Vue.js and must use only the provided APIs as external data sources.

This has direct consequences:

- Restaurant location and business discovery can come from Overpass / OpenStreetMap
- Province, district, and ward filters can come from VN Provinces API
- Nutrition and ingredient data can come from Open Food Facts when a relevant food item exists
- Restaurant registration, receipt verification, point balances, donations, and profit-share accounting cannot be truly persisted or audited without a backend or third-party auth/database service

Because of that, the strict MVP should position those capabilities as:

- UX flows and clickable prototypes
- locally stored demo state in browser storage
- clearly marked "future production requirement" items

## 3. Problem Statement

People in Vietnam and visitors in Vietnam have difficulty finding restaurants that align with diet goals such as high protein, lower sugar, vegetarian, dairy-free, gluten-aware, or ingredient exclusions.

Restaurants also lack an easy way to present dish ingredients and macronutrients in a searchable map-based experience.

The platform aims to:

- help users eat according to their diet
- help experts and health-focused users discover suitable restaurants faster
- help restaurants gain exposure
- connect food spending to local social good through points and donations

## 4. Vision

Create a map-first healthy dining discovery app for Vietnam where users can:

- choose the diet they follow
- exclude ingredients or allergens
- search a map of restaurants
- inspect dishes and nutrition-related information
- save preferred restaurants
- upload receipts to earn impact points

And where restaurants can eventually:

- claim a listing
- add dishes
- declare ingredients and macronutrients
- contribute a percentage of dish profit toward local causes

## 5. MVP Goal

Deliver a polished Vue.js frontend that demonstrates the complete user journey for discovery and filtering using only the provided APIs, while modeling future flows for restaurant onboarding, receipts, and points.

The MVP should answer:

- Can users discover restaurants on a Vietnam map?
- Can users filter by province, cuisine hints, diet preferences, and excluded foods?
- Can the app show a useful healthy-eating decision layer using available public data?
- Can the product vision be communicated well enough for pilots, demos, or investor/customer feedback?

## 6. Users

### Primary Users

- Health-conscious diners
- Nutrition-aware professionals or experts
- Visitors in Vietnam looking for diet-compatible restaurants

### Secondary Users

- Restaurant owners or managers
- Social-impact partners and local cause organizations

## 7. Value Proposition

### For Users

- Faster discovery of diet-compatible places to eat
- Clearer ingredient and nutrition context
- Motivation through points and impact

### For Restaurants

- Additional visibility on a health-focused map
- Differentiation through transparent dish data
- Free or low-cost marketing through discovery and recommendations

### For Local Causes

- New donation channel linked to real dining activity
- Strong local storytelling and measurable community support

## 8. Data Sources and Roles

### 8.1 Overpass API / OpenStreetMap

Use for:

- restaurant discovery on map
- coordinates
- business names
- address fragments
- cuisine tags
- website or contact fields when available
- opening hours when available

Expected tags:

- `amenity=restaurant`
- `amenity=fast_food`
- `amenity=cafe`
- `name`
- `cuisine`
- `addr:*`
- `opening_hours`
- `phone`
- `website`

Limitations:

- menu data is usually missing
- nutrition data is not available
- cuisine tags are inconsistent
- some listings are incomplete or outdated

### 8.2 Open Food Facts

Use for:

- nutrition and ingredient reference data
- food labels
- product-level macros
- fallback dish matching for likely foods or ingredients

Possible uses in MVP:

- map cuisine types to common food products or food references
- infer nutrition examples for dishes when a reasonable match exists
- show ingredient warnings based on known food records

Limitations:

- not restaurant-specific
- product-centric rather than menu-centric
- dish names may not map cleanly to Vietnamese restaurant meals

### 8.3 VN Provinces API

Use for:

- province list
- district list
- ward list
- official administrative filters
- navigation and search structure

Limitations:

- no restaurant data
- no dish data
- no nutrition data

## 9. Honest MVP Scope

## In Scope

- Vietnam map UI
- province, district, and ward filtering
- restaurant discovery from Overpass
- cuisine-based and location-based restaurant cards
- user diet preference selection
- excluded food and ingredient selection
- suitability scoring based on available tags and matched food data
- dish examples generated from cuisine and food references
- polished frontend design and interactions
- receipt upload UX as a non-persistent demo flow
- restaurant claim UX as a non-persistent demo flow
- local browser storage for preferences, bookmarks, and demo points

## Out of Scope for True Production in This MVP

- verified restaurant self-service onboarding
- authenticated restaurant dashboards
- persistent menu management
- audited monthly contribution settlement
- real receipt OCR verification
- fraud prevention
- real donations ledger
- payment handling
- true expert identity or certification

## 10. Product Principles

- Map-first discovery
- Mobile-first interaction
- Transparent about data quality
- Helpful even with imperfect public data
- Social impact should feel concrete, not decorative
- Health filtering should be fast, visual, and understandable

## 11. Key User Stories

### Discovery

- As a user, I want to browse restaurants on a map in Vietnam so I can discover places near me or in a selected province.
- As a user, I want to filter by province, district, or ward so I can narrow the search to a practical area.
- As a user, I want to see restaurant cards with location and cuisine hints so I can decide quickly.

### Diet and Exclusions

- As a user, I want to choose the diet I follow so the app can highlight relevant restaurants.
- As a user, I want to exclude foods or ingredients so unsuitable places are deprioritized.
- As a user, I want a simple compatibility score so I can scan options quickly.

### Nutrition Context

- As a user, I want to see likely dishes and nutrition-related references so I can estimate whether a place fits my goals.
- As a user, I want ingredient warnings so I can avoid foods that conflict with my diet.

### Social Impact

- As a user, I want to upload a receipt and earn points so my meal contributes to a local cause.
- As a user, I want to choose a cause so my points feel meaningful.

### Restaurant Participation

- As a restaurant owner, I want to claim my restaurant listing and provide dishes, ingredients, and macronutrients so health-focused users can find me.
- As a restaurant, I want visibility and positive branding from supporting local causes.

## 12. Functional Requirements

### 12.1 Map and Search

- Display a map centered on Vietnam
- Show restaurant markers fetched from Overpass based on current map bounds or selected administrative area
- Cluster markers when zoomed out
- Support search by restaurant name where available
- Support list and map synchronized views

### 12.2 Location Filters

- Fetch provinces from VN Provinces API on load
- Fetch districts after province selection
- Fetch wards after district selection
- Allow users to browse all Vietnam without selecting an area

### 12.3 Diet Preference Setup

Users must be able to choose one primary diet, with optional secondary tags.

Initial diet options:

- Balanced
- High protein
- Low carb
- Low sugar
- Vegetarian
- Vegan
- Dairy free
- Gluten aware
- Halal preference
- Keto inspired

Excluded foods and ingredients:

- Pork
- Beef
- Chicken
- Seafood
- Shellfish
- Egg
- Dairy
- Gluten
- Peanuts
- Soy
- Sesame
- Alcohol
- Added sugar
- MSG

The app should store these preferences in local storage.

### 12.4 Restaurant Suitability Engine

The frontend computes a lightweight compatibility score using:

- restaurant `cuisine` tags from OSM
- keyword matches from restaurant names
- mapped likely dish profiles
- user diet profile
- excluded ingredients

Each restaurant receives one of:

- Good match
- Possible match
- Low confidence
- Not suitable

The UI must clearly indicate when a result is inferred rather than confirmed by the restaurant.

### 12.5 Dish and Nutrition Layer

Since menu items are not reliably available from the given APIs, the MVP uses a dish inference model:

1. Read `cuisine` tags from OSM
2. Map cuisine tags to a small internal dish taxonomy for Vietnamese and common restaurant patterns
3. Match those dish names to Open Food Facts food entries where possible
4. Display estimated ingredients and macros with a confidence indicator

Dish card fields:

- dish name
- likely ingredients
- calories if available
- protein, carbs, fat if available
- ingredient exclusion warnings
- confidence label: `verified`, `estimated`, or `reference only`

Under the current API constraint, almost all dish records will be `estimated` or `reference only`.

### 12.6 Receipt Upload Flow

The MVP includes a frontend receipt upload flow:

- user selects a photo or image of a receipt
- app shows a preview
- app asks the user to tag the restaurant and amount spent
- app awards demo points locally

This is a concept-only flow in MVP. It is not a verified accounting mechanism.

Production intent:

- a verified receipt or payment proof becomes a `Verified Visit`
- each `Verified Visit` generates `1 Impact Credit`
- the platform maintains the official ledger and monthly restaurant report

### 12.7 Points and Cause Support

Users can:

- view current demo points
- choose a preferred cause
- see how points could translate into meals or donations

Example cause categories:

- Feed local homeless communities
- Support local animal shelters
- Support food rescue organizations
- Support local child nutrition programs

All values are illustrative in MVP unless a real backend and partners are added.

Production financial model:

- restaurants do not manage blockchain or wallet mechanics directly
- the platform records Impact Credits in a secure ledger
- each Impact Credit has a fixed value in VND
- restaurants are billed monthly based on verified visits, subject to any agreed cap

### 12.8 Restaurant Claim Flow

The frontend includes a restaurant claim concept flow:

- select or search an existing public restaurant listing from Overpass / OSM
- confirm business identity through a simple contact form
- dish list
- ingredients
- macronutrients
- pledge percentage for local causes

Because the product is frontend-only and API-constrained, submitted data is stored only locally for demo purposes.

The interface must clearly state that production claim verification requires backend persistence, moderation, and proof of ownership.

Claim flow states:

- `Unclaimed`
- `Claim submitted`
- `Claimed by restaurant`

For the MVP, only `Claim submitted` is simulated locally.

Additional production rule:

- only restaurants from the platform's claimed restaurant registry are shown as official trusted listings
- unclaimed public restaurants may be discoverable in research mode, but should not appear as trusted partners

## 13. Information Architecture

### Main Screens

- Landing / onboarding
- Map explorer
- Restaurant details
- Diet and exclusions setup
- Receipt upload
- Points and causes
- Claim your restaurant
- About / impact model

### Navigation

- Explore
- My Diet
- Impact
- For Restaurants

## 14. UX Requirements

The UI should feel premium, fresh, and trustworthy rather than generic food-delivery styling.

Following the referenced design guidance:

- establish a design system before screen-level design
- use a strong visual hierarchy
- include accessible, reusable component patterns
- keep responsive behavior explicit
- include light, dark, and system theme support

### UX Direction

- map-first, but not map-only
- cards and filters must work equally well on mobile
- the diet setup should be simple and visual
- confidence and uncertainty must be clearly explained
- users should reach useful results in under one minute

### Suggested Interaction Model

- On first visit, ask:
  - Which diet do you follow?
  - Which foods do you exclude?
  - Which province or city are you exploring?
- Then drop the user into the map with pre-filtered results

## 15. UI Direction

Avoid default startup-app styling.

### Visual Theme

- Warm, civic, modern look
- Vietnam-inspired but not clichéd
- Color direction:
  - deep forest green for trust and health
  - warm turmeric or amber for energy and food highlights
  - clay or coral accents for social impact
  - soft rice-paper neutrals for surfaces

### Design Tokens

- rounded but not overly soft cards
- large readable map overlay panels
- strong typography contrast
- clear filter chips
- meaningful status colors for compatibility and warnings

### Key Components

- floating search and filter panel
- map marker cluster styles
- restaurant cards
- dish nutrition cards
- exclusion warning chips
- points progress module
- cause impact cards

### Motion

- staggered reveal for cards
- smooth panel transitions
- subtle marker emphasis on hover/select
- avoid heavy animations that slow map interaction

## 16. Suggested Frontend Technical Architecture

### Framework

- Vue 3
- Vite
- Single-page application

### Suggested Structure

- `src/views/`
- `src/components/`
- `src/composables/`
- `src/services/`
- `src/data/`
- `src/styles/`

### Service Modules

- `provincesService.js`
- `overpassService.js`
- `openFoodFactsService.js`
- `dietEngine.js`
- `dishInference.js`
- `localStore.js`
- `restaurantClaimStore.js`

### State

Use simple app state or Pinia if desired. The MVP can remain lightweight.

State domains:

- user preferences
- active location filters
- map bounds
- restaurant results
- selected restaurant
- inferred dishes
- receipt demo state
- points demo state
- restaurant claim demo state
- monthly Impact Credit demo state

## 17. API Integration Specification

### 17.1 VN Provinces API

Endpoints:

- get provinces
- get districts by province
- get wards by district

Use case:

- power administrative filter controls

### 17.2 Overpass API

Query by selected province bounds or current map bounds for:

- `amenity=restaurant`
- `amenity=fast_food`
- optionally `amenity=cafe`

Data normalization:

- id
- name
- lat
- lon
- cuisine
- address text
- website
- phone
- opening hours

### 17.3 Open Food Facts

Search by:

- inferred dish keywords
- cuisine keywords
- ingredient terms

Normalize into:

- title
- ingredients text or tags
- nutriments
- image if available
- source link

## 18. Matching and Scoring Logic

### Restaurant Compatibility Score

Inputs:

- diet type
- excluded ingredients
- restaurant cuisine tags
- dish inference keywords
- Open Food Facts ingredient and macro references
- claimed restaurant verification state

Outputs:

- `matchScore` from 0 to 100
- `confidenceScore` from 0 to 100
- `compatibilityLabel`
- `warningList`

### Example Logic

- vegetarian user plus restaurant tagged `vegetarian` or `vegan`: strong positive
- user excludes pork and shellfish, restaurant inferred dishes include both: negative
- high-protein diet plus dish references with high protein: positive
- weak or missing data: lower confidence

## 19. Transparency Rules

The app must never imply certainty when using inferred data.

Every restaurant and dish display should indicate one of:

- `Verified by restaurant`
- `Estimated from public data`
- `Reference nutrition only`

For the strict API-only MVP, most results will be the last two states.

## 20. Success Metrics for MVP

- user can complete onboarding and see filtered restaurants
- user can change diet and exclusions without friction
- user can inspect at least one useful restaurant detail view
- map remains responsive on mobile and desktop
- concept flows for receipts and registration are understandable
- demo clearly communicates the social-impact model

## 21. Risks

### Data Risks

- OSM coverage varies by region
- cuisine tags can be sparse or inaccurate
- Open Food Facts may not match Vietnamese dishes well

### Product Risks

- too much inference can reduce trust
- users may assume dish nutrition is verified when it is not
- receipt points can be gamed without backend verification
- settlement disputes require a real evidence workflow

### Technical Risks

- Overpass query performance and rate limits
- map rendering performance with many markers
- inconsistent food terminology across APIs

## 22. Mitigations

- use confidence labels everywhere
- start with selected cities or provinces if performance is weak
- cache normalized responses in browser during session
- limit result sets by map bounds and zoom level
- define a small, curated internal cuisine-to-dish mapping for the MVP

## 23. Phased Roadmap

### Phase 1: Demo MVP

- frontend-only Vue app
- provinces filtering
- map and restaurant discovery
- diet and exclusions
- dish inference
- nutrition references
- local demo points
- clickable registration and receipt flows
- clickable restaurant claim and receipt flows

### Phase 2: Pilot Product

- backend database
- real restaurant claim flow
- authenticated users and restaurants
- verified restaurant claim flow
- moderation of menus and nutrition
- monthly contribution reports and dispute handling
- receipt OCR and review
- partner cause pages

### Phase 3: Production Platform

- verified nutrition data from restaurants
- donation settlement and reporting
- profit-share tracking
- anti-fraud systems
- analytics for restaurants and partners

## 24. Recommendation

Under the API-only constraint, position the MVP as:

- a map-based healthy restaurant discovery prototype for Vietnam
- with inferred dish and nutrition guidance
- plus concept flows for restaurant claiming, receipts, and social impact

Do not position it yet as:

- a verified nutrition platform
- a true restaurant operations system
- a real donation accounting system

## 25. Deliverable

The implementation target for this spec is a visually strong Vue.js SPA with:

- premium onboarding
- diet and food-exclusion setup
- Vietnam location filtering
- Overpass-powered restaurant map
- Open Food Facts-powered nutrition references
- concept flows for receipt upload, restaurant claiming, and social impact

This is the strongest credible MVP possible using only the provided APIs and a frontend-only architecture.
