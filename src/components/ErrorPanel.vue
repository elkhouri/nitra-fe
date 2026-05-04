<script setup>
defineProps({
  errors: {
    type: Object,
    default: () => []
  }
});
</script>

<template>
  <div class="p-4 rounded-md border border-danger-muted bg-danger-muted-rest">
    <div class="mb-2 text-sm font-medium text-danger">Please fix the following errors before submitting</div>
    <ul class="text-sm list-disc list-inside text-danger pl-0 space-y-2 m-0">
      <template v-for="(value, key) in errors">
        <li v-for="error in value" :key="error">{{ key }}: {{ error }}</li>
      </template>
    </ul>
  </div>
</template>
