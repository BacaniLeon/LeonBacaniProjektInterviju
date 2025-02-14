export const useContacts = () => {
    const config = useRuntimeConfig();
    const apiBase = config.public.apiBase;
  
    const getContacts = async () => {
      try {
        const data = await $fetch(`${apiBase}`);
        return data || [];
      } catch (error) {
        console.error('Greška pri dohvaćanju kontakata:', error);
        return [];
      }
    };
  
    const getContactById = async (id: string) => {
        try {
          if (!id) throw new Error("ID nije definiran!");
          return await $fetch(`${apiBase}/${id}`);
        } catch (error) {
          console.error(`Greška pri dohvaćanju kontakta ID: ${id}`, error);
          return null;
        }
      };
      
  
    const addContact = async (contact: any) => {
      try {
        return await $fetch(`${apiBase}`, { method: 'POST', body: contact });
      } catch (error) {
        console.error('Greška pri dodavanju kontakta:', error);
      }
    };
  
    const updateContact = async (id: string, contact: any) => {
      try {
        return await $fetch(`${apiBase}/${id}`, { method: 'PUT', body: contact });
      } catch (error) {
        console.error(`Greška pri ažuriranju kontakta ID: ${id}`, error);
      }
    };
  
    const deleteContact = async (id: string) => {
      try {
        return await $fetch(`${apiBase}/${id}`, { method: 'DELETE' });
      } catch (error) {
        console.error(`Greška pri brisanju kontakta ID: ${id}`, error);
      }
    };
  
    return { getContacts, getContactById, addContact, updateContact, deleteContact };
  };
  