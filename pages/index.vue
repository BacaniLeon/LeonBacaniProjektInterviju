<template>
    <div>
        <h1>Contact List</h1>
    <div class="searchAndAdd">
        <input v-model="searchQuery" placeholder="Search contacts" class="searchBar" />
        <button @click="openModal()" class="button">Add Contact</button>
    </div>
    <ContactForm :show="showModal" :contactData="selectedContact" @save="handleSave" @close="closeModal" />
    <div v-if="filteredContacts?.length > 0">
        <ul class="table">
          <li v-for="contact in filteredContacts" :key="contact.id">
            <NuxtLink :to="`/contact/${contact.id}`" class="">{{ contact.firstName }} {{ contact.lastName }}</NuxtLink>
            <div class="buttonDiv">
              <button @click="openModal(contact)" class="buttonEditAndDelete">Edit</button>
              <button @click="handleDelete(contact.id)" class="buttonEditAndDelete">Delete</button>
            </div>
          </li>
        </ul>
    </div>
    <div v-else>Prazna lista kontakata.</div>
      
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import ContactForm from '@/components/ContactForm.vue';
  const { getContacts, addContact, updateContact, deleteContact } = useContacts();
  
  const contacts = ref([]);
  const showModal = ref(false);
  const selectedContact = ref(null);
  const searchQuery = ref('');
  
  onMounted(async () => {
    try {
      contacts.value = await getContacts() || [];
    } catch (error) {
      console.error("Greška pri dohvaćanju kontakata:", error);
      contacts.value = [];
    }
  });
  
  const filteredContacts = computed(() => {
    return (contacts.value || []).filter(contact =>
      `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
  
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this contact?')) return;
    await deleteContact(id);
    contacts.value = await getContacts();
    alert('Contact deleted successfully!');
  };
  
  const openModal = (contact = null) => {
    selectedContact.value = contact;
    showModal.value = true;
  };
  
  const closeModal = () => {
    showModal.value = false;
    selectedContact.value = null;
  };
  
  const handleSave = async (contact) => {
    if (contact.id) {
      await updateContact(contact.id, contact);
      alert('Contact updated successfully!');
    } else {
      await addContact(contact);
      alert('Contact added successfully!');
    }
    contacts.value = await getContacts();
    closeModal();
  };
  </script>