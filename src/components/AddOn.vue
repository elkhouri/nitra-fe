<script setup>
import { format } from 'date-fns';
import { computed, ref } from 'vue';
import { useAddons } from '../composables/addons';

const props = defineProps({
  addon: {
    type: Object,
    required: true,
  },
  selected: {
    type: Boolean,
    default: false,
  },
})

const { selectedAddons, groupedAddons, toggleAddon, updateAddon, updateAddonQuantity } = useAddons();

const quantity = ref(0);

const usedCapacity = computed(() => props.addon.capacity ? props.addon.registered / props.addon.capacity : 0);

const capacityDisplay = computed(() => {
  const spotsLeft = props.addon.capacity - props.addon.registered;
  if (usedCapacity.value >= 1) {
    return {
      textClass: 'font-semibold',
      text: 'Sold Out',
    }
  } else {
    return {
      textClass: '',
      text: `${spotsLeft} spot${spotsLeft !== 1 ? 's' : ''} left`,
    }
  }
})

const active = computed(() => {
  return !!selectedAddons.value[props.addon.id]?.active
})

function formatStartDate(date) {
  if (!date) return '';
  return format(new Date(date), 'MMM dd,hh:mm a');
}

function formatEndDate(date) {
  if (!date) return '';
  return format(new Date(date), 'hh:mm a');
}

function incrementQuantity() {
  if (quantity.value < props.addon.maxQuantity) {
    quantity.value++;
    updateAddonQuantity(props.addon, quantity.value)
  }
}

function decrementQuantity() {
  if (quantity.value > 0) {
    quantity.value--;
    updateAddonQuantity(props.addon, quantity.value)
  }
}

function selectAddon(key, value) {
  if (!props.addon.maxQuantity) {
    toggleAddon(props.addon);
  } 
}
</script>

<template>
  <div class="card card-drop-shadow rounded border border-solid border-neutral-muted p-4" :class="{'card-active': active}" @click="selectAddon()">
    <div class="mb-2 flex items-center justify-between">
      <div class="text-subtitle1 text-neutral">{{ props.addon.name }}</div>
      <div class="text-subtitle1 text-primary">${{ props.addon.price }}</div>
    </div>
    <div class="mb-2 text-sm text-neutral-muted">{{ props.addon.description }}</div>
    <div v-if="props.addon.date && props.addon.endDate" class="mb-2 text-xs text-neutral-quiet">{{ formatStartDate(props.addon.date) }} - {{ formatEndDate(props.addon.endDate) }}</div>
    <div v-if="props.addon.capacity" class="text-xs text-neutral-quiet" :class="capacityDisplay.textClass">{{ capacityDisplay.text }}</div>
    <div class="flex items-center">
      <div v-if="props.addon.sizes" class="flex items-center mr-4">
        <label class="text-sm text-neutral-muted mr-2">Size:</label>
        <select class="py-1 border-neutral-muted rounded-md" @change="updateAddon(props.addon, 'size', $event.target.value)">
          <option v-for="size in props.addon.sizes" :key="size" :value="size" class="py-1" >{{ size }}</option>
        </select>
      </div>
      <div v-if="props.addon.maxQuantity" class="flex items-center">
        <label class="text-sm text-neutral-muted mr-2">Qty:</label>
        <button class="border-0 bg-surface-l1 rounded-md flex items-center justify-center size-[28px]" @click="decrementQuantity">
          <img src="/img/minus-icon.svg" />
        </button>
        <span class="mx-2 font-semibold text-neutral">{{ quantity }}</span>
        <button class="mr-2 border-0 bg-surface-l1 rounded-md flex items-center justify-center size-[28px]" @click="incrementQuantity">
          <img src="/img/plus-icon.svg" />
        </button>
        <span class="text-[10px] text-neutral-quiet">max {{ props.addon.maxQuantity }}</span>
      </div>
    </div>
  </div>
</template>
