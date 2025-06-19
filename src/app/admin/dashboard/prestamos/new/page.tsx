import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductForm } from "../product-form";
import { getPrestamo } from "@/model/prestamos/dataprestamo";

interface Props {
  searchParams: {
    libro_id?: number;
    usuario_id?: string;
    fecha_del_prestamo?: string;
  };
}

async function ProductsNewPage({ searchParams }: Props) {
  let prestamo = null;

  const { libro_id, usuario_id, fecha_del_prestamo } = searchParams;

  const isEditing = libro_id && usuario_id && fecha_del_prestamo;

  if (isEditing) {
    prestamo = await getPrestamo(libro_id, usuario_id, fecha_del_prestamo);
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? "Editar Préstamo" : "Crear Préstamo"}</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductForm prestamo={prestamo}/>
        </CardContent>
      </Card>
    </div>
  );
}
export default ProductsNewPage;