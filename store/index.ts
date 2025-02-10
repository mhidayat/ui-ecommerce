import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Product } from '@/app/dashboard/product/page';
import { Transaction } from '@/app/dashboard/transaction/page';


interface Credentials {
    username: string;
    password: string;
}

interface AppState {
    authenticated: boolean;
    credentials: Credentials;
    products: Product[];
    transactions: Transaction[];
    limit: number;
    offset: number;
    toggleAuth: () => void;
    setCredentials: (username: string, password: string) => void;
    authCredentials: () => string;
    setProducts: (products: Product[]) => void;
    setTransactions: (transactions: Transaction[]) => void;
    setOffset: (offset: number) => void;
    appendProducts: (newProducts: Product[]) => void;
  }

export const useAppStore = create<AppState>()(
    persist(
        (set, get) => ({
            authenticated: false,
            credentials : {
                username: '',
                password: ''
            },
            products: [],
            transactions: [],
            limit: 8,
            offset: 0,
            toggleAuth: () => set((state: { authenticated: boolean }) => ({ authenticated: !state.authenticated })),
            setCredentials: (username: string, password: string) => set({ credentials: { username, password } }),
            authCredentials: () => 'Basic ' + btoa(get().credentials.username + ":" + get().credentials.password),
            setProducts: (products: Product[]) => set(() => ({ products: products })),
            setTransactions: (transactions: Transaction[]) => set(() => ({ transactions })),
            setOffset: (offset: number) => set({ offset }),
            appendProducts: (newProducts: Product[]) => set((state) => ({ products: [...state.products, ...newProducts] })),
        }), 
    {
        name: 'app-storage',
        storage: createJSONStorage(() => sessionStorage)
    })
)