<script setup>
import { ref, computed } from 'vue';
import { addons } from '../mocks/addons';
import { useAddons } from '../composables/addons';
import AddOn from '../components/AddOn.vue';
import OrderSummary from '../components/OrderSummary.vue';

const { selectedAddons, groupedAddons, toggleAddon } = useAddons();

const currentCategory = ref('workshop');
const toggleOptions = [
  { label: 'Workshops', value: 'workshop' },
  { label: 'Meal Packages', value: 'meal' },
  { label: 'Merchandise', value: 'merchandise' },
];
const displayAddons = computed(() => {
  return groupedAddons.value[currentCategory.value] || [];
})
const showShipping = computed(() => {
  return Object.values(selectedAddons.value).some(addon => addon.category === 'merchandise')
})
</script>

<template>
  <q-page>
    <div class="w-full flex justify-between items-start">
      <div class="grow mr-8 max-w-[788px]">
        <div class="text-subtitle1 text-neutral q-mb-lg">Select Add-ons</div>
        <q-btn-toggle class="q-mb-lg" v-model="currentCategory" toggle-color="primary" :options="toggleOptions"/>
        <div v-if="showShipping" class="mb-6 p-4 rounded bg-info-subtle-rest">          
          <div class="font-semibold text-neutral flex items-center">
            <img class="mr-3" src="/img/shipping-icon.svg" />
            Shipping Information
          </div>
          <div class="ml-8 text-neutral">Merchandise items will be shipped to your address one week before the conference. Please ensure your shipping address in Step 1 is correct.</div>
        </div>
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
