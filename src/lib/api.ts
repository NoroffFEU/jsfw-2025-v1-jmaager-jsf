import { NoroffResponse, Product } from "@/types/shop";

const BASE_URL =
  process.env.NEXT_PUBLIC_NOROFF_API_BASE_URL ?? "https://v2.api.noroff.dev";
const API_KEY = process.env.NEXT_PUBLIC_NOROFF_API_KEY;
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_NOROFF_ACCESS_TOKEN;

function getHeaders() {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (API_KEY) {
    headers["X-Noroff-API-Key"] = API_KEY;
  }

  if (ACCESS_TOKEN) {
    headers.Authorization = `Bearer ${ACCESS_TOKEN}`;
  }

  return headers;
}

async function request<T>(path: string, revalidate = 300) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: getHeaders(),
    next: { revalidate },
  });

  if (!response.ok) {
    throw new Error(`Failed API request (${response.status}) on ${path}`);
  }

  const json = (await response.json()) as NoroffResponse<T>;
  return json.data;
}

export async function fetchProducts() {
  return request<Product[]>("/online-shop");
}

export async function fetchProductById(id: string) {
  return request<Product>(`/online-shop/${id}`);
}
