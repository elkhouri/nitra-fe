<script setup>
import { format } from 'date-fns';
import { useAttendee } from '../composables/attendee';
import { useAddons } from '../composables/addons';
import { useSessions } from '../composables/sessions';
import { useSteps } from '../composables/steps';
import { useSummary } from '../composables/summary';

const { attendee, ticketType, attendeeInfo } = useAttendee()
const { selectedAddons, groupedAddons, toggleAddon } = useAddons();
const { selectedSessions, toggleSession, groupedSessions } = useSessions();
const { currentStep } = useSteps()
const { workshopDiscount, totalPrice } = useSummary()

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
    <div class="text-h3 text-neutral q-mb-lg">Review Your Registration</div>

    <div class="mb-6 rounded-md bg-surface-l1 p-5 space-y-3 border border-solid border-neutral-muted">
      <div class="flex justify-between">
        <div class="text-subtitle1">Attendee Information</div>
        <div class="text-sm underline text-teal-500"><router-link to="/" @click="currentStep = 1">Edit → Step 1</router-link></div>
      </div>
      <div class="flex justify-between">
        <div class="text-sm text-neutral-muted">Name</div>
        <div class="text-sm text-neutral">{{ attendeeInfo.name }}</div>
      </div>
      <div class="flex justify-between">
        <div class="text-sm text-neutral-muted">Email</div>
        <div class="text-sm text-neutral">{{ attendeeInfo.email }}</div>
      </div>
      <div class="flex justify-between">
        <div class="text-sm text-neutral-muted">Phone</div>
        <div class="text-sm text-neutral">{{ attendeeInfo.phone }}</div>
      </div>
      <div class="flex justify-between">
        <div class="text-sm text-neutral-muted">Company</div>
        <div class="text-sm text-neutral">{{ attendeeInfo.company }}</div>
      </div>
      <div class="flex justify-between">
        <div class="text-sm text-neutral-muted">Job Title</div>
        <div class="text-sm text-neutral">{{ attendeeInfo.jobTitle }}</div>
      </div>
      <div class="flex justify-between">
        <div class="text-sm text-neutral-muted">Ticket Type</div>
        <div class="text-sm text-neutral">{{ ticketType.name }} (${{ ticketType.price }})</div>
      </div>
    </div>

    <div class="mb-6 rounded-md bg-surface-l1 p-5 space-y-3 border border-solid border-neutral-muted">
      <div class="flex justify-between">
        <div class="text-subtitle1">Selected Sessions</div>
        <div class="text-sm underline text-teal-500"><router-link to="/sessions" @click="currentStep = 2">Edit → Step 2</router-link></div>
      </div>
      <div class="flex justify-between" v-for="session in Object.values(selectedSessions)" :key="session.id">
        <div class="text-sm text-neutral-muted">{{ formatSessionDate(session.date) }}</div>
        <div class="text-sm text-neutral">{{ session.title }}</div>
      </div>
    </div>

    <div class="mb-6 rounded-md bg-surface-l1 p-5 space-y-3 border border-solid border-neutral-muted">
      <div class="flex justify-between">
        <div class="text-subtitle1">Add-ons</div>
        <div class="text-sm underline text-teal-500"><router-link to="/addons" @click="currentStep = 3">Edit → Step 3</router-link></div>
      </div>
      <div class="flex justify-between" v-for="addon in Object.values(selectedAddons)" :key="addon.id">
        <div class="text-sm text-neutral-muted capitalize">{{ addon.category }}</div>
        <div class="text-sm text-neutral">
          {{ addon.name }}
          <span v-if="addon.quantity">X {{ addon.quantity }}</span>
          ({{usdFormatter.format(addon.price * (addon.quantity || 1))}})</div>
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
