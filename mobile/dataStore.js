import { create } from 'zustand';

const useStore = create((set) => ({
    client: null, 
    data: [],
    setClient: (newClient) => set({ client: newClient }),
    setData: (newData) => set({ data: newData }),
  }));
  
  export default useStore;
