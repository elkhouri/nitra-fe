import { ref, computed } from "vue";
import { groupBy } from "lodash-es";
import { format } from "date-fns";
import { addons } from '../mocks/addons';

const selectedAddons = ref({});
const allAddons = ref(addons);

export function useAddons () {
  function toggleAddon(addon) {
    if (selectedAddons.value[addon.id]) {
      delete selectedAddons.value[addon.id]
    } else {
      selectedAddons.value[addon.id] = addon
      selectedAddons.value[addon.id]['active'] = true
    }
  }

  function updateAddon(addon, key, value) {
    if (!selectedAddons.value[addon.id]) {
      selectedAddons.value[addon.id] = addon
    }
    selectedAddons.value[addon.id][key] = value
  }

  function updateAddonQuantity(addon, quantity) {
    if (!quantity) {
      selectedAddons.value[addon.id]['active'] = false
      delete selectedAddons.value[addon.id]
      return
    }
    updateAddon(addon, 'quantity', quantity)
    selectedAddons.value[addon.id]['active'] = true
  }

  const groupedAddons = computed(() => {
    return groupBy(allAddons.value, 'category');
  });

  return {
    selectedAddons,
    groupedAddons,
    toggleAddon,
    updateAddon,
    updateAddonQuantity,
  };
}
