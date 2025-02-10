"use client"

import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/components/product/card";
import { Button } from "@/components/ui/button"
import { useAppStore } from "@/store";
import { useInView } from 'react-intersection-observer'
import { CreateProductDialog } from "@/components/product/create";

export interface Product {
    id: number;
    title: string;
    sku: string;
    image: string;
    price: number;
    stock: number;
    description: string;
}

export default function ProductPage() {
    const [offset, setOffset] = useState(0);
    const [total, setTotal] = useState(0);
    const { ref, inView } = useInView();

    const authCredentials = useAppStore((state) => state.authCredentials)
    const setProducts = useAppStore((state) => state.setProducts)

    const products = useAppStore((state) => state.products)

    const fetchProducts = async () => {
        const url = `http://127.0.0.1:8080/get-product`;

        const response = await fetch(url, { headers });
          if (!response.ok) {
            console.log('error');
          }
      
        const json = await response.json();
        console.log(json)
        // window.location.reload();
    }

    const headers = useMemo(() => {
        const h = new Headers();
        h.append('Authorization', authCredentials());
        return h;
    }, [authCredentials]);

    useEffect(() => {
        if (inView) {
            setOffset(offset + 8)
        }
    }, [inView])

    useEffect(() => {
        console.log('offset =>' ,offset)
        if((offset <= total)) {
            fetch(`http://127.0.0.1:8080/product?limit=8&offset=${offset > total ? total : offset}`, { headers })
            .then((res) => res.json())
            .then((response) => {
                if(products.length) {
                    const productArray = new Set([...products, ...response.data]);
                    setProducts([...productArray]);
                } else {
                    setProducts(response.data);
                }
                console.log(response)
                setTotal(parseInt(response.total))
            });
        }

        return () => {
            setProducts([]);
          };
    }, [offset, total]);
      
    return (
        <div className="items-center justify-items-center w-full h-full p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                product page
                <div className="flex gap-4">
                    <CreateProductDialog />
                </div>
                <div className="flex flex-wrap gap-4">
                    {products.length ? (
                        products.map((product, key) => (
                            <ProductCard product={product} key={key}/>
                        ))
                    ) : (
                        <div className="flex flex-col gap-6">
                            <span>Empty Data</span> 
                            <Button onClick={fetchProducts}>Fetch Product From Server</Button>
                        </div>
                    )}
                </div>
                {(total >= offset) && <div className="mt-8" ref={ref}>loading more product...</div>}
            </main>
        </div>
    );
}