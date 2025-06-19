import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductForm } from "../product-form";
import { getUsuario } from "@/model/usuarios/datausuario";

interface Props {
  searchParams: {
    id?: string;
  };
}

async function ProductsNewPage({ searchParams }: Props) {
  const usuario = searchParams.id ? await getUsuario(searchParams.id) : null;

  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>{searchParams.id ? "Edit usuario" : "Create usuario"}</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductForm usuario={usuario}/>
        </CardContent>
      </Card>
    </div>
  );
}
export default ProductsNewPage;