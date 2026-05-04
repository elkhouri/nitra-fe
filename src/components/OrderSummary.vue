<script setup>
import { computed } from 'vue';
import { useAttendee } from '../composables/attendee';
import { useAddons } from '../composables/addons';

const { ticketType } = useAttendee()
const { selectedAddons } = useAddons();

const isVIP = computed(() => ticketType.value && ticketType.value.id === 'vip');

const workshopDiscount = computed(() => {
  if (!isVIP.value) return 0

  return Object.values(selectedAddons.value).reduce((discount, addon) => {
    if (addon.category === 'workshop') {
      return discount + addon.price * 0.1;
    }
    return discount;
  }, 0);
});

const totalPrice = computed(() => {
  if (!ticketType.value) return 0;

  const addonsTotal = Object.values(selectedAddons.value).reduce((total, addon) => {
    if (addon.quantity) {
      return total + addon.price * addon.quantity;
    } else {
      return total + addon.price;
    }
  }, 0);
  const discount = workshopDiscount.value;
  const total = ticketType.value.price + addonsTotal - discount;

  return total;
});

const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
</script>

<template>
  <div class="p-6 rounded-md border border-solid border-neutral-muted bg-surface-l1">
    <div class="mb-4 text-subtitle1">Order Summary</div>
    <div class="mb-4 pb-4 space-y-4 border-0 border-b border-solid border-neutral-muted">
      <div v-if="ticketType" class="flex justify-between">
        <div class="text-sm text-neutral-muted">{{ ticketType.name }} Ticket</div>
        <div class="text-sm text-neutral-muted">{{ usdFormatter.format(ticketType.price) }}</div>
      </div>
      <div class="flex justify-between" v-for="addon in Object.values(selectedAddons)" :key="addon.id">
        <div class="text-sm text-neutral-muted">{{ addon.name }}
          <span v-if="addon.quantity">X {{ addon.quantity }}</span>
        </div>
        <div class="text-sm text-neutral-muted">{{ usdFormatter.format(addon.price * (addon.quantity || 1)) }}</div>
      </div>
      <div v-if="isVIP && workshopDiscount" class="flex justify-between">
        <div class="text-xs text-brand-emphasis">Workshop discount (VIP 10%)</div>
        <div class="text-xs text-brand-emphasis">-{{ usdFormatter.format(workshopDiscount) }}</div>
      </div>
    </div>
      <div class="flex justify-between">
        <div class="text-sm text-neutral">Total</div>
        <div class="text-sm text-neutral">{{ usdFormatter.format(totalPrice) }}</div>
      </div>
  </div>
</template>
