<template>
    <div v-if="show">
      <div class="editAndAddDiv">
        <h2>{{ contact.id ? 'Edit Contact' : 'Add Contact' }}</h2>
        <input v-model="contact.firstName" placeholder="First Name" class="input" />
        <input v-model="contact.lastName" placeholder="Last Name" class="input" />
        <input v-model="contact.email" type="email" placeholder="Email" class="input" />
        <input v-model="contact.phone" placeholder="Phone" class="input" />
        <div class="buttonDiv">
          <button @click="saveContact" class="button">{{ contact.id ? 'Update' : 'Save' }}</button>
          <button @click="close" class="button">Cancel</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits, watch } from 'vue';
  const props = defineProps({ show: Boolean, contactData: Object });
  const emit = defineEmits(['close', 'save']);
  
  const contact = ref({ firstName: '', lastName: '', email: '', phone: '' });
  
  watch(() => props.contactData, (newVal) => {
    contact.value = newVal ? { ...newVal } : { firstName: '', lastName: '', email: '', phone: '' };
  }, { immediate: true });
  
  const close = () => emit('close');
  const saveContact = () => emit('save', contact.value);
  </script>