import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductForm } from "../product-form";
import { getAutor } from "@/model/autores/dataautor";

interface Props {
  searchParams: {
    id?: string;
  };
}

async function ProductsNewPage({ searchParams }: Props) {
  const autor = searchParams.id ? await getAutor(searchParams.id) : null;

  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>{searchParams.id ? "Edit autor" : "Create autor"}</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductForm autor={autor}/>
        </CardContent>
      </Card>
    </div>
  );
}
export default ProductsNewPage;