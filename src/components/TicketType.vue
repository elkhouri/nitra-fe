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
  <div class="p-5 border border-solid border-radius-m divider-default rounded-lg cursor-pointer bg-surface-l1 ticket-drops-shadow" :class="{active: props.active}">
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
      <div v-if="props.active" class="text-[11px] font-medium py-[3px] px-3 bg-green-700 rounded-full text-white inline">
        ✓ Selected
      </div>
    </div>
  </div>
</template>

<style scoped>
.active {
  background-color: var(--bg-brand-subtle-rest);
  border: 2px solid var(--bg-brand-emphasis-rest);
  margin: -1px;
}

.ticket-drops-shadow {
  box-shadow: 0px 1px 3px 0px #0000000A;
  box-shadow: 0px 4px 16px 0px #00000014;
}
</style>
