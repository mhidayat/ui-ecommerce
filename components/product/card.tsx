import { Trash } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
//   CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import { Product } from "@/app/dashboard/product/page"
import { EditProductDialog } from "./edit"

type CardProps = React.ComponentProps<typeof Card>

export function ProductCard({ className, product, ...props }: CardProps & { product: Product }) {

  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <CardHeader>
        <CardTitle>{ product.title }</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md border p-4">
            <Image width={200} height={400} src={product.image} alt="image" />
        </div>
        <div>
            <div
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  ${product.price}
                </p>
              </div>
            </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
          <EditProductDialog title={product.title} sku={product.sku} image={product.image} price={product.price} stock={product.stock} description={product.description} />
          <Button variant="destructive"><Trash/></Button>
      </CardFooter>
    </Card>
  )
}