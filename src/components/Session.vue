<script setup>
import { format } from 'date-fns';
import { te } from 'date-fns/locale';
import { computed } from 'vue';

const props = defineProps({
  session: {
    type: Object,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
})

const trackBadgeClasses = {
  'main': 'bg-gray-50 text-gray-700',
  'frontend': 'bg-orange-50 text-orange-600',
  'backend': 'bg-blue-50 text-blue-600',
  'devops': 'bg-yellow-200 text-yellow-900',
};

const usedCapacity = computed(() => props.session.capacity ? props.session.registered / props.session.capacity : 0);

const isFull = computed(() => props.session.registered >= props.session.capacity);

const capacityDisplay = computed(() => {
  const spotsLeft = props.session.capacity - props.session.registered;
  if (usedCapacity.value >= 1) {
    return {
      progressColor: 'danger',
      textClass: 'font-semibold text-black',
      text: 'Sold Out',
    }
  } else if (usedCapacity.value >= 0.75) {
    return {
      progressColor: 'orange-600',
      textClass: 'font-medium text-orange-700',
      text: `${spotsLeft} spot${spotsLeft !== 1 ? 's' : ''} left`,
    }
  } else if (usedCapacity.value >= 0.5) {
    return {
      progressColor: 'yellow-800',
      textClass: 'font-medium text-yellow-800',
      text: `${spotsLeft} spot${spotsLeft !== 1 ? 's' : ''} left`,
    }
  } else {
    return {
      progressColor: 'primary',
      textClass: 'font-medium text-teal-700',
      text: `${spotsLeft} spot${spotsLeft !== 1 ? 's' : ''} left`,
    }
  }
})

function formatDate(date) {
  return format(new Date(date), 'hh:mm a');
}
</script>

<template>
  <div class="card rounded border border-solid border-neutral-muted p-4" :class="{'active': props.active, full: isFull}">
    <div class="mb-1 flex items-center justify-between">
      <div class="badge uppercase text-xs rounded-full py-[3px] px-2.5" :class="trackBadgeClasses[props.session.track]">
        {{ props.session.track }}
      </div>
      <div class="h-7">
        <q-checkbox v-if="!isFull" size="xs" :model-value="active" @update:model-value="$emit('click')"/>
      </div>
    </div>
    <div class="mb-2 title text-subtitle1">{{ props.session.title }}</div>
    <div class="mb-2 body text-sm text-neutral-muted">{{ props.session.speaker }}, {{ props.session.speakerTitle }}</div>
    <div class="mb-2 body text-xs text-neutral-quiet">{{ formatDate(props.session.date) }} - {{ formatDate(props.session.endDate) }}</div>
    <q-linear-progress class="mb-2" :value="usedCapacity" :color="capacityDisplay.progressColor" rounded/>
    <div class="text-xs" :class="capacityDisplay.textClass">{{ capacityDisplay.text }}</div>
  </div>
</template>
