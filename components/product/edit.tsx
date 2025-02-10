import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useMemo } from "react"
import { useAppStore } from "@/store"

export interface Product {
    title: string;
    sku: string;
    image: string;
    price: number;
    stock: number;
    description: string;
}

export function EditProductDialog({ ...props }: Product) {
    const form = useForm({
        defaultValues: {
          title: props.title,
          sku: props.sku,
          image: props.image,
          price: props.price,
          stock: props.stock,
          description: props.description
        },
    })

    const authCredentials = useAppStore((state) => state.authCredentials)

    const headers = useMemo(() => {
        const h = new Headers();
        h.append('Authorization', authCredentials());
        h.append("Content-Type", "application/json");
        return h;
    }, [authCredentials]);

      const onSubmit = (values: Product) => {
        const url = 'http://127.0.0.1:8080/product';
        
        fetch(url, { method: 'PUT', body: JSON.stringify(values), headers })
        .then(response => response.json())
        .then(json => {
          console.log(json)
          if(json.status === 'ok') {
                window.location.reload()
            }
        })
        .catch(error => console.log(error));
      }
      
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full" variant="default">Edit Product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
             Edit the product detail here. Click save to keep the changes.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                            <Input placeholder="enter title" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="sku"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>SKU</FormLabel>
                        <FormControl>
                            <Input placeholder="enter SKU" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Image</FormLabel>
                        <FormControl>
                            <Input placeholder="enter Image URL" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                            <Input placeholder="enter Price" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Stock</FormLabel>
                        <FormControl>
                            <Input placeholder="enter Stock" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Input placeholder="enter Description" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </form>
        </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}