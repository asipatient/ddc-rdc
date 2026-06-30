import { redirect } from "next/navigation";

export default function ActualitesAliasPage() {
  redirect("/publications?categorie=Actualit%C3%A9s");
}
