<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import HomeExperience from "./components/HomeExperience.vue";
import RestaurantAdminPage from "./components/RestaurantAdminPage.vue";
import BitesPage from "./components/bites/BitesPage.vue";
import PlatePage from "./components/plate/PlatePage.vue";

const route = ref({
  path: window.location.pathname,
  search: window.location.search,
  state: window.history.state,
});

function syncRoute() {
  route.value = {
    path: window.location.pathname,
    search: window.location.search,
    state: window.history.state,
  };
}

function navigate(to, state = null) {
  window.history.pushState(state, "", to);
  syncRoute();
}

const currentView = computed(() => {
  if (route.value.path === "/plate") {
    return "plate";
  }

  if (route.value.path === "/bites") {
    return "bites";
  }

  if (route.value.path === "/admin") {
    return "admin";
  }

  return "home";
});

const backTarget = computed(() => {
  if (currentView.value === "plate") {
    return "/";
  }

  if (currentView.value === "bites") {
    return "/";
  }

  if (currentView.value === "admin") {
    return "/";
  }

  return "/";
});

const backLabel = computed(() => {
  if (currentView.value === "plate") {
    return "Back to home";
  }

  if (currentView.value === "bites") {
    return "Back to home";
  }

  if (currentView.value === "admin") {
    return "Back to home";
  }

  return "Back";
});

onMounted(() => {
  if (window.location.pathname === "/map") {
    window.history.replaceState(window.history.state, "", "/");
    syncRoute();
  }

  window.addEventListener("popstate", syncRoute);
});

onUnmounted(() => {
  window.removeEventListener("popstate", syncRoute);
});
</script>

<template>
  <div class="route-shell">
    <header class="route-topbar">
      <div class="route-topbar__group">
        <button
          v-if="currentView !== 'home'"
          type="button"
          class="route-back"
          @click="navigate(backTarget)"
        >
          ← {{ backLabel }}
        </button>

        <button type="button" class="route-brand" @click="navigate('/')">
          <span class="route-brand__mark">H2W</span>
          <span>Health to Wealth</span>
        </button>
      </div>

      <nav class="route-nav" aria-label="Primary">
        <button
          type="button"
          class="route-nav__button"
          :class="{ 'route-nav__button--active': currentView === 'home' }"
          @click="navigate('/')"
        >
          Home
        </button>
        <button
          type="button"
          class="route-nav__button"
          :class="{ 'route-nav__button--active': currentView === 'plate' }"
          @click="navigate('/plate')"
        >
          Plate
        </button>
        <button
          type="button"
          class="route-nav__button"
          :class="{ 'route-nav__button--active': currentView === 'admin' }"
          @click="navigate('/admin')"
        >
          Admin
        </button>
        <button
          type="button"
          class="route-nav__button"
          :class="{ 'route-nav__button--active': currentView === 'bites' }"
          @click="navigate('/bites')"
        >
          Impact bites
        </button>
      </nav>
    </header>

    <main class="route-content">
      <HomeExperience v-if="currentView === 'home'" />
      <PlatePage v-else-if="currentView === 'plate'" :navigate="navigate" />
      <RestaurantAdminPage v-else-if="currentView === 'admin'" />
      <BitesPage v-else />
    </main>
  </div>
</template>

<style scoped>
.route-shell {
  min-height: 100vh;
  padding: 1.25rem;
  background:
    radial-gradient(
      circle at top left,
      rgba(241, 185, 93, 0.16),
      transparent 25%
    ),
    radial-gradient(
      circle at bottom right,
      rgba(108, 165, 96, 0.16),
      transparent 22%
    ),
    linear-gradient(180deg, #fffdf9 0%, #f8f2e8 100%);
}

.route-topbar {
  width: min(100%, 1280px);
  margin: 0 auto 1.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.2rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.86);
  border: 1px solid rgba(91, 68, 40, 0.08);
  box-shadow: 0 20px 40px rgba(81, 61, 34, 0.08);
  backdrop-filter: blur(14px);
}

.route-topbar__group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.route-brand,
.route-nav__button,
.route-back {
  border: 0;
  background: transparent;
}

.route-back {
  border-radius: 999px;
  padding: 0.7rem 0.95rem;
  color: #6a5a44;
  font-weight: 700;
  background: rgba(248, 242, 232, 0.86);
}

.route-brand {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  color: #342818;
  font-weight: 800;
}

.route-brand__mark {
  display: grid;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 999px;
  background: linear-gradient(135deg, #c96e2f 0%, #eba536 100%);
  color: #fff;
  text-transform: lowercase;
}

.route-nav {
  display: inline-flex;
  gap: 0.45rem;
  padding: 0.25rem;
  border-radius: 999px;
  background: rgba(248, 242, 232, 0.86);
}

.route-nav__button {
  border-radius: 999px;
  padding: 0.7rem 1rem;
  color: #6a5a44;
  font-weight: 700;
}

.route-nav__button--active {
  background: #ffffff;
  color: #2d2416;
  box-shadow: 0 10px 20px rgba(81, 61, 34, 0.08);
}

.route-content {
  width: min(100%, 1280px);
  margin: 0 auto;
}

@media (max-width: 720px) {
  .route-topbar {
    flex-direction: column;
    align-items: stretch;
    border-radius: 1.35rem;
  }

  .route-topbar__group {
    justify-content: space-between;
  }

  .route-nav {
    justify-content: center;
  }
}
</style>
