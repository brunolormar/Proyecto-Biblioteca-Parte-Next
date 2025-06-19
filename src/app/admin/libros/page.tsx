import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductForm } from "./product-form";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getLibros } from "@/model/libros/datalibro";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { ProductCard } from "./component/product-card";


export const dynamic = "force-dynamic"

async function ProductsNewPage() {
  const products = await getLibros();

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">NextNestApp</h1>
      
        <Link href="/admin/libros/new" className={buttonVariants()}>
          Create Libro
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
        {products.map((libro) => (
          <ProductCard libro={libro} key={libro.id} />
        ))}
      </div>
    </>
  );
}
export default ProductsNewPage;