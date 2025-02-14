<template>
  <div>
    <NuxtLink to="/">&larr; Back to List</NuxtLink>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="contact" class="divText">
      <h1>{{ contact.firstName }} {{ contact.lastName }}</h1>
      <p class="text"><strong>Email:</strong> {{ contact.email }}</p>
      <p class="text"><strong>Phone:</strong> {{ contact.phone }}</p>
      <div class="buttonDiv">
        <button @click="openModal" class="button">Edit</button>
        <button @click="deleteCurrentContact" class="button">Delete</button>
      </div>
      <ContactForm :show="showModal" :contactData="contact" @save="handleSave" @close="closeModal" />
    </div>
    <div v-else>
      <p>Contact not found.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useContacts } from "@/composables/useContacts";
import ContactForm from '@/components/ContactForm.vue';

const { getContactById, updateContact, deleteContact } = useContacts();
const route = useRoute();
const router = useRouter();
const showModal = ref(false);
const contact = ref(null);
const isLoading = ref(true);

onMounted(async () => {
  try {
    contact.value = await getContactById(route.params.id);
  } catch (error) {
    console.error("Greška pri dohvaćanju kontakta:", error);
  } finally {
    isLoading.value = false;
  }
});

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const handleSave = async (updatedContact) => {
  await updateContact(route.params.id, updatedContact);
  contact.value = updatedContact;
  alert('Contact updated successfully!');
  closeModal();
};

const deleteCurrentContact = async () => {
  await deleteContact(route.params.id);
  router.push("/");
};
</script>