import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductForm } from "../product-form";
import { getLibro } from "@/model/libros/datalibro";

interface Props {
  params: {
    id: string;
  };
}

async function ProductsNewPage({params}: Props) {
  const libro = await getLibro(params.id);

  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>{params.id ? "Edit Libro" : "Create Libro"}</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductForm libro={libro}/>
        </CardContent>
      </Card>
    </div>
  );
}
export default ProductsNewPage;