import { ref, computed } from "vue";
import { groupBy } from "lodash-es";
import { format } from "date-fns";
import { addons } from '../mocks/addons';
import { useSessions } from '../composables/sessions';

const selectedAddons = ref({});
const allAddons = ref(addons);
const { selectedSessions, sessionsOverlap } = useSessions();

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

  const hasMerchandise = computed(() => {
    return Object.values(selectedAddons.value).some(addon => addon.category === 'merchandise' && addon.active);
  });

  function validateAddons() {
    const errors = {};
    const workshops = Object.values(selectedAddons.value).filter(addon => addon.category === 'workshop');
    const sessionArray = Object.values(selectedSessions.value);
    for (let i = 0; i < workshops.length; i++) {
      const workshop = workshops[i];
      if (workshop.capacity <= workshop.registered) {
        errors[workshop.id] = `Workshop "${workshop.name}" is at full capacity.`;
      }
      const overlapSession = workshopOverlapSession(workshop);
      console.log('Validating workshop:', workshop.name, 'Overlap session:', overlapSession ? overlapSession.title : 'None');
      if (overlapSession) {
        errors[workshop.id] = `Workshop "${workshop.name}" conflicts with "${overlapSession.title}".`;
      }
    }
    return errors;
  }

  function workshopOverlapSession(workshop) {
    if (workshop.category !== 'workshop') {
      return false;
    }
    const sessionArray = Object.values(selectedSessions.value);
    return sessionArray.find(session => sessionsOverlap(workshop, session));
  }

  function clearOverlapWorkshop() {
    for (const addon of Object.values(selectedAddons.value)) {
      if (addon.category === 'workshop' && workshopOverlapSession(addon)) {
        delete selectedAddons.value[addon.id];
      }
    } 
  }

  return {
    selectedAddons,
    groupedAddons,
    toggleAddon,
    updateAddon,
    updateAddonQuantity,
    hasMerchandise,
    validateAddons,
    workshopOverlapSession,
    clearOverlapWorkshop
  };
}
