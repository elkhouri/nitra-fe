<script setup>
const props = defineProps({
  ticket: {
    type: Object,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="card p-5 border border-solid border-radius-m border-neutral-muted rounded-lg bg-surface-l1 hover:bg-surface-l2" :class="{active: props.active}">
    <div class="mb-3 flex justify-between">
      <span class="text-subtitle1">{{ props.ticket.name }}</span>
      <span class="text-subtitle1">${{ props.ticket.price }}</span>
    </div>
    <div class="mb-3 text-sm text-neutral-muted">{{ props.ticket.description }}</div>
    <div class="mb-3 space-y-3">
      <div v-for="perk in props.ticket.perks" :key="perk" class="text-sm text-neutral-muted flex items-center">
        <img src="/img/circle-check.svg" class="mr-2"/>
        {{ perk }}
      </div>
    </div>
    <div class="h-5">
      <div v-if="props.active" class="text-[11px] font-medium py-[3px] px-3 bg-green-700 rounded-full text-inverse inline">
        ✓ Selected
      </div>
    </div>
  </div>
</template>
