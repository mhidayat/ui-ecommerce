"use client"
import { useRouter } from 'next/navigation'
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAppStore } from "@/store"
import { useEffect } from 'react'

interface Credentials {
  username: string;
  password: string;
}

export default function Home() {

  const router = useRouter()
  const isAuthenticated = useAppStore((state) => state.authenticated)
  const toggleAuth = useAppStore((state) => state.toggleAuth)
  const setCredentials = useAppStore((state) => state.setCredentials)
  
  useEffect(() => {
    console.log(isAuthenticated)
    if(isAuthenticated) {
      router.push('dashboard/product');
    }
  }, [isAuthenticated, router]);

  const form = useForm({
    defaultValues: {
      username: "",
      password: ""
    },
  })

  const onSubmit = (values: Credentials) => {
    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(values.username + ":" + values.password));
    const url = 'http://127.0.0.1:8080/auth';
    
    fetch(url, { method:'POST', headers })
    .then(response => response.json())
    .then(json => {
      console.log(json)
      if(json.statusCode === 200) {
        toggleAuth();
        setCredentials(values.username, values.password);
      }
    })
    .catch(error => console.log(error));
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <span className="text-2xl font-bold">Ecommerce UI Login</span>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="enter username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="enter password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      </main>
    </div>
  );
}
