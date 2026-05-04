<script setup>
import { sessions } from '../mocks/sessions';
import Session from '../components/Session.vue';
</script>

<template>
  <q-page>
    <h1 class="mb-8 text-h3">Select Sessions</h1>
    <q-btn-group class="mb-6">
      <q-btn label="Nov 15" color="primary" />
      <q-btn label="Nov 16" color="primary" />
    </q-btn-group>

    <div class="mb-6">3 sessions selected</div>

    <div class="mb-10 grid grid-cols-2 gap-4">
      <session
        v-for="session in sessions"
        :key="session.id"
        :session="session"
      />
    </div>
  </q-page>
</template>
