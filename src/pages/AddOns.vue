<script setup>
import { ref, computed } from 'vue';
import { addons } from '../mocks/addons';
import AddOn from '../components/AddOn.vue';
import OrderSummary from '../components/OrderSummary.vue';

const currentCategory = ref('workshop');
const toggleOptions = [
  { label: 'Workshops', value: 'workshop' },
  { label: 'Meal Packages', value: 'meal' },
  { label: 'Merchandise', value: 'merchandise' },
];
const displayAddons = computed(() => {
  return addons.filter(addon => addon.category === currentCategory.value);
})
</script>

<template>
  <q-page>
    <div class="w-full flex justify-between">
      <div class="grow mr-8">
        <h1 class="text-subtitle1 text-neutral q-mb-lg">Select Add-ons</h1>
        <q-btn-toggle class="q-mb-lg" v-model="currentCategory" toggle-color="primary" :options="toggleOptions"/>
        <div class="space-y-6">
          <AddOn
            v-for="addon in displayAddons"
            :key="addon.id"
            :addon="addon"
          />
        </div>
      </div>
      <order-summary class="grow max-w-[380px]"/>
    </div>
  </q-page>
</template>
