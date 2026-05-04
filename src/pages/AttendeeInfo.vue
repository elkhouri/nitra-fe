<script setup>
import TicketType from '../components/TicketType.vue';
import { event } from '../mocks/event';
import { useAttendee } from '../composables/attendee';
import { useValidation } from '../composables/validation';
import { useAddons } from '../composables/addons';

const { attendee, ticketType, attendeeInfo } = useAttendee()
const { errors, hasErrors } = useValidation()
const { hasMerchandise } = useAddons()
ticketType.value = event.ticketTypes[0]
</script>

<template>
  <q-page>
    <div class="text-subtitle1 text-neutral q-mb-md">Select Ticket Type</div>
    <div class="mb-8 flex space-x-4">
      <ticket-type
        v-for="ticket in event.ticketTypes"
        :key="ticket.id"
        :ticket="ticket"
        class="flex-1"
        :active="ticketType && ticketType.id === ticket.id"
        @click="ticketType = ticket"
      />
    </div>
    <h1 class="mb-8 text-h3">Attendee Information</h1>
    <form class="mb-5 space-y-5">
      <div class="flex space-x-6">
        <div class="flex-1" :class="{error: errors['Step 1']?.name}">
          <label class="text-sm text-neutral mb-1.5 block font-medium" for="name">Full Name</label>
          <input id="name" type="text" v-model="attendeeInfo.name" class="w-full py-2.5 px-3 border border-solid border-neutral-muted rounded-lg text-lg" placeholder="John Doe"/>
          <span v-if="errors['Step 1']?.name" class="mt-1.5 text-xs text-danger">{{ errors['Step 1'].name }}</span>
        </div>
        <div class="flex-1" :class="{error: errors['Step 1']?.email}">
          <label class="text-sm text-neutral mb-1.5 block font-medium" for="email">Email</label>
          <input id="email" type="email" v-model="attendeeInfo.email" class="w-full py-2.5 px-3 border border-solid border-neutral-muted rounded-lg text-lg" placeholder="john.doe@example.com"/>
          <span v-if="errors['Step 1']?.email" class="mt-1.5 text-xs text-danger">{{ errors['Step 1'].email }}</span>
        </div>
      </div>
      <div class="flex space-x-6">
        <div class="flex-1" :class="{error: errors['Step 1']?.phone}">
          <label class="text-sm text-neutral mb-1.5 block font-medium" for="phone">Phone</label>
          <input id="phone" type="text" v-model="attendeeInfo.phone" class="w-full py-2.5 px-3 border border-solid border-neutral-muted rounded-lg text-lg" placeholder="123-456-7890"/>
          <span v-if="errors['Step 1']?.phone" class="mt-1.5 text-xs text-danger">{{ errors['Step 1'].phone }}</span>

        </div>
        <div class="flex-1" :class="{error: errors['Step 1']?.company}">
          <label class="text-sm text-neutral mb-1.5 block font-medium" for="company">Company</label>
          <input id="company" type="text" v-model="attendeeInfo.company" class="w-full py-2.5 px-3 border border-solid border-neutral-muted rounded-lg text-lg" placeholder="Company Name"/>
          <span v-if="errors['Step 1']?.company" class="mt-1.5 text-xs text-danger">{{ errors['Step 1'].company }}</span>
        </div>
      </div>
      <div :class="{error: errors['Step 1']?.jobTitle}">
        <label class="text-sm text-neutral mb-1.5 block font-medium" for="job-title">Job Title</label>
        <input id="job-title" type="text" v-model="attendeeInfo.jobTitle" class="w-full py-2.5 px-3 border border-solid border-neutral-muted rounded-lg text-lg" placeholder="Job Title"/>
        <span v-if="errors['Step 1']?.jobTitle" class="mt-1.5 text-xs text-danger">{{ errors['Step 1'].jobTitle }}</span>
      </div>
      <div :class="{error: errors['Step 1']?.shippingAddress}">
        <label class="text-sm text-neutral mb-1.5 block font-medium" for="shipping-address">Shipping Address
          <span>{{ hasMerchandise ? '*' : '(Optional)' }}</span>
        </label>
        <input id="shipping-address" type="text" v-model="attendeeInfo.shippingAddress" class="w-full py-2.5 px-3 border border-solid border-neutral-muted rounded-lg text-lg" placeholder="Shipping Address"/>
        <span v-if="errors['Step 1']?.shippingAddress" class="mt-1.5 text-xs text-danger">{{ errors['Step 1'].shippingAddress }}</span>
      </div>
    </form>
  </q-page>
</template>

<style scoped>
.error {
  label {
    color: var(--text-danger-default);
  }
  input {
    border-color: var(--border-danger-emphasis);
  }
}
</style>
