import { getUsuarios } from "@/model/usuarios/datausuario";
import { UsuariosBusqueda } from "./UsuariosBusqueda";

export const dynamic = "force-dynamic";

export default async function UsuariosPage() {
  const usuarios = await getUsuarios();
  return <UsuariosBusqueda usuarios={usuarios} />;
}