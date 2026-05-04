<script setup>
import { event } from '../mocks/event';
import { useAttendee } from '../composables/attendee';
import { useSteps } from '../composables/steps';

const { attendee, ticketType, attendeeInfo } = useAttendee()
const { setStep } = useSteps();
</script>

<template>
  <q-page class="pt-0! flex flex-col items-center justify-center">
    <img class="mb-4" src="/img/Success-Icon.svg" />
    <div class="mb-4 text-success text-h2">Registration Complete!</div>
    <div class="mb-4 text-lg text-neutral">Confirmation #TC2025-47291</div>
    <div class="mb-4 text-sm text-neutral-muted">Thank you, {{ attendeeInfo.name }}! Your {{ ticketType.name }} registration for {{ event.name }} is confirmed.
You will receive a confirmation email at {{ attendeeInfo.email }}.</div>
    <button class="bg-orange-400 hover:bg-orange-500 text-white py-2 px-4 rounded-lg border-0" @click="setStep(1)">Back to Home</button>
  </q-page>
</template>
