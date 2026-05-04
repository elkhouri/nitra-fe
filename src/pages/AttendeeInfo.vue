<script setup>
import TicketType from '../components/TicketType.vue';
import { event } from '../mocks/event';
import { useAttendee } from '../composables/attendee';

const { attendee, ticketType, attendeeInfo } = useAttendee()
ticketType.value = event.ticketTypes[0].id
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
        :active="ticketType && ticketType === ticket.id"
        @click="ticketType = ticket.id"
      />
    </div>
    <h1 class="mb-8 text-h3">Attendee Information</h1>
    <form class="mb-5 space-y-5">
      <div class="flex space-x-6">
        <div class="grow">
          <label class="text-sm text-neutral mb-1.5 block font-medium" for="name">Full Name</label>
          <input id="name" type="text" v-model="attendeeInfo.name" class="w-full py-2.5 px-3 border border-solid border-neutral-muted rounded-lg text-lg" placeholder="John Doe"/>
        </div>
        <div class="grow">
          <label class="text-sm text-neutral mb-1.5 block font-medium" for="email">Email</label>
          <input id="email" type="email" v-model="attendeeInfo.email" class="w-full py-2.5 px-3 border border-solid border-neutral-muted rounded-lg text-lg" placeholder="john.doe@example.com"/>
        </div>
      </div>
      <div class="flex space-x-6">
        <div class="grow">
          <label class="text-sm text-neutral mb-1.5 block font-medium" for="phone">Phone</label>
          <input id="phone" type="text" v-model="attendeeInfo.phone" class="w-full py-2.5 px-3 border border-solid border-neutral-muted rounded-lg text-lg" placeholder="123-456-7890"/>
        </div>
        <div class="grow">
          <label class="text-sm text-neutral mb-1.5 block font-medium" for="company">Company</label>
          <input id="company" type="text" v-model="attendeeInfo.company" class="w-full py-2.5 px-3 border border-solid border-neutral-muted rounded-lg text-lg" placeholder="Company Name"/>
        </div>
      </div>
      <div>
        <label class="text-sm text-neutral mb-1.5 block font-medium" for="job-title">Job Title</label>
        <input id="job-title" type="text" v-model="attendeeInfo.jobTitle" class="w-full py-2.5 px-3 border border-solid border-neutral-muted rounded-lg text-lg" placeholder="Job Title"/>
      </div>
      <div>
        <label class="text-sm text-neutral mb-1.5 block font-medium" for="shipping-address">Shipping Address (Optional)</label>
        <input id="shipping-address" type="text" v-model="attendeeInfo.shippingAddress" class="w-full py-2.5 px-3 border border-solid border-neutral-muted rounded-lg text-lg" placeholder="Shipping Address"/>
      </div>
    </form>
  </q-page>
</template>
