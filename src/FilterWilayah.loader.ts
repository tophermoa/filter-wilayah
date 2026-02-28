import type { LoaderFunctionArgs } from "react-router-dom";

export async function filterPageLoader(_: LoaderFunctionArgs) {
  const res = await fetch("/data/indonesia_regions.json");
  return res.json();
}
