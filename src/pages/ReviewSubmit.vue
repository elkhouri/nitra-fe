<script setup>
import { format } from 'date-fns';
import { computed, ref } from 'vue';
import { useAttendee } from '../composables/attendee';
import { useAddons } from '../composables/addons';
import { useSessions } from '../composables/sessions';
import { useSteps } from '../composables/steps';
import { useSummary } from '../composables/summary';
import { useValidation } from '../composables/validation';
import ErrorPanel from '../components/ErrorPanel.vue';

const { ticketType, attendeeInfo } = useAttendee()
const { selectedAddons, groupedAddons, toggleAddon, hasMerchandise } = useAddons();
const { selectedSessions, toggleSession, groupedSessions } = useSessions();
const { currentStep, setStep } = useSteps()
const { workshopDiscount, totalPrice } = useSummary()
const { errors, hasErrors } = useValidation()

function formatSessionDate(dateStr) {
  return format(new Date(dateStr), 'MMM dd,hh:mm a');
}

const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
</script>

<template>
  <q-page>
    <error-panel v-if="hasErrors" class="mb-6" :errors="errors"/>
    <div class="text-h3 text-neutral q-mb-lg">Review Your Registration</div>

    <div class="card mb-6 rounded-md bg-surface-l1 p-5 space-y-3 border border-solid border-neutral-muted" :class="{error: errors['Step 1']}">
      <div class="flex justify-between">
        <div class="card-title text-subtitle1">Attendee Information</div>
        <div class="text-sm underline text-teal-500"><router-link to="/" @click="setStep(1)">Edit → Step 1</router-link></div>
      </div>
      <div class="flex justify-between">
        <div class="text-sm text-neutral-muted">Name</div>
        <div v-if="!errors['Step 1']?.['name']" class="text-sm text-neutral">{{ attendeeInfo.name }}</div>
        <div v-else class="text-sm text-danger">— (required)</div>
      </div>
      <div class="flex justify-between">
        <div  class="text-sm text-neutral-muted">Email</div>
        <div v-if="!errors['Step 1']?.['email']" class="text-sm text-neutral">{{ attendeeInfo.email }}</div>
        <div v-else-if="attendeeInfo.email" class="text-sm text-danger">{{ attendeeInfo.email }} (invalid format)</div>
        <div v-else class="text-sm text-danger">— (required)</div>
      </div>
      <div class="flex justify-between">
        <div class="text-sm text-neutral-muted">Phone</div>
        <div v-if="!errors['Step 1']?.['phone']" class="text-sm text-neutral">{{ attendeeInfo.phone }}</div>
        <div v-else-if="attendeeInfo.phone" class="text-sm text-danger">{{ attendeeInfo.phone }} (invalid format)</div>
        <div v-else class="text-sm text-danger">— (required)</div>
      </div>
      <div class="flex justify-between">
        <div class="text-sm text-neutral-muted">Company</div>
        <div v-if="!errors['Step 1']?.['company']" class="text-sm text-neutral">{{ attendeeInfo.company }}</div>
        <div v-else class="text-sm text-danger">— (required)</div>
      </div>
      <div class="flex justify-between">
        <div class="text-sm text-neutral-muted">Job Title</div>
        <div v-if="!errors['Step 1']?.['jobTitle']" class="text-sm text-neutral">{{ attendeeInfo.jobTitle }}</div>
        <div v-else class="text-sm text-danger">— (required)</div>
      </div>
      <div class="flex justify-between">
        <div class="text-sm text-neutral-muted">Ticket Type</div>
        <div class="text-sm text-neutral">{{ ticketType.name }} (${{ ticketType.price }})</div>
      </div>
      <div v-if="hasMerchandise" class="flex justify-between">
        <div class="text-sm text-neutral-muted">Shipping Address</div>
        <div v-if="!errors['Step 1']?.['shippingAddress']" class="text-sm text-neutral">{{ attendeeInfo.shippingAddress }}</div>
        <div v-else class="text-sm text-danger">— (required for merchandise)</div>
      </div>
    </div>

    <div class="card mb-6 rounded-md bg-surface-l1 p-5 space-y-3 border border-solid border-neutral-muted" :class="{error: errors['Step 2']}">
      <div class="flex justify-between">
        <div class="card-title text-subtitle1">Selected Sessions</div>
        <div class="text-sm underline text-teal-500"><router-link to="/sessions" @click="setStep(2)">Edit → Step 2</router-link></div>
      </div>
      <div class="flex justify-between" v-for="session in Object.values(selectedSessions)" :key="session.id">
        <div class="text-sm text-neutral-muted">{{ formatSessionDate(session.date) }}</div>
        <div v-if="!errors['Step 2']?.[session.id]" class="text-sm text-neutral">{{ session.title }}</div>
        <div v-else class="text-sm text-danger">{{ session.title }} (conflict)</div>
      </div>
    </div>

    <div class="card mb-6 rounded-md bg-surface-l1 p-5 space-y-3 border border-solid border-neutral-muted" :class="{error: errors['Step 3']}">
      <div class="flex justify-between">
        <div class="card-title text-subtitle1">Add-ons</div>
        <div class="text-sm underline text-teal-500"><router-link to="/addons" @click="setStep(3)">Edit → Step 3</router-link></div>
      </div>
      <div class="flex justify-between" v-for="addon in Object.values(selectedAddons)" :key="addon.id">
        <div class="text-sm text-neutral-muted capitalize">{{ addon.category }}</div>
        <div v-if="!errors['Step 3']?.[addon.id]" class="text-sm text-neutral">
          {{ addon.name }}
          <span v-if="addon.quantity">X {{ addon.quantity }}</span>
          ({{usdFormatter.format(addon.price * (addon.quantity || 1))}})</div>
        <div v-else class="text-sm text-danger">{{ addon.name }} (conflict)</div>
      </div>
    </div>

    <div class="mb-6 rounded-md bg-surface-l1 p-5 space-y-2 border border-solid border-neutral-muted">
      <div class="flex justify-between">
        <div class="text-subtitle1">Pricing Summary</div>
      </div>
      <div class="flex justify-between">
        <div class="text-sm text-neutral-muted">{{ ticketType.name }} Ticket</div>
        <div class="text-sm text-neutral-muted">{{ usdFormatter.format(ticketType.price) }}</div>
      </div>
      <div class="flex justify-between" v-for="addon in Object.values(selectedAddons)" :key="addon.id">
        <div class="text-sm text-neutral-muted">{{ addon.name }}
          <span v-if="addon.quantity">X {{ addon.quantity }}</span>
        </div>
        <div class="text-sm text-neutral-muted">{{ usdFormatter.format(addon.price * (addon.quantity || 1)) }}</div>
      </div>
      <div v-if="workshopDiscount" class="flex justify-between">
        <div class="text-xs text-brand-emphasis">Workshop Discount</div>
        <div class="text-xs text-brand-emphasis">{{ usdFormatter.format(workshopDiscount) }}</div>
      </div>
      <div class="flex justify-between pt-2 border-0 border-t border-solid border-neutral-muted">
        <div class="text-lg font-bold text-neutral">Grand Total</div>
        <div class="text-lg font-bold text-neutral">{{ usdFormatter.format(totalPrice) }}</div>
      </div>
    </div>
  </q-page>
</template>

<style scoped>
.card.error {
  border: 2px solid var(--border-danger-emphasis);

  .card-title {
    color: var(--text-danger-default);
  }
}
</style>
