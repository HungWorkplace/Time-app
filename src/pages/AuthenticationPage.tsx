import { useLoaderData, json } from "react-router-dom";

import { Authentication } from "@/features";

function AuthenticationPage() {
  const viewParam = useLoaderData() as string;

  return <Authentication method={viewParam} />;
}

export default AuthenticationPage;

export function loader({ params, request }) {
  const url = new URL(request.url);
  const view = url.searchParams.get("view");

  // if (!view) throw json({ message: "Invalid view parameter" }, { status: 404 });
  if (!view) return "login";

  if (!["login", "signup"].includes(view)) {
    throw json({ message: "Invalid link to login or sigup" }, { status: 404 });
  }

  return view;
}
