import { create } from 'zustand';

const useStore = create((set) => ({
    client: null, 
    data: [],
    ask: [false, null],
    setClient: (newClient) => set({ client: newClient }),
    setData: (newData) => set({ data: newData }),
    setAsk: (newRequest) => set({ ask: newRequest })
  }));
  
  export default useStore;
