function getApiBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  if (typeof window !== "undefined") {
    return `${window.location.protocol}//${window.location.hostname}:5000/api`;
  }
  return "http://localhost:5000/api";
}

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("billing_auth_token");
}

export function setAuthToken(token: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem("billing_auth_token", token);
  }
}

export function removeAuthToken() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("billing_auth_token");
    localStorage.removeItem("billing_auth_user");
  }
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const baseUrl = getApiBaseUrl();
  const response = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }

  return data;
}

export const api = {
  // Auth
  auth: {
    login: (credentials: { email: string; password: string }) =>
      request<{ success: boolean; token: string; user: any; message?: string }>("/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      }),
    register: (userData: { name: string; email: string; password: string; role?: string }) =>
      request<{ success: boolean; token: string; user: any }>("/auth/register", {
        method: "POST",
        body: JSON.stringify(userData),
      }),
    getMe: () => request<{ success: boolean; user: any }>("/auth/me"),
  },

  // Users Management
  users: {
    getAll: () => request<{ success: boolean; users: any[] }>("/users"),
    create: (data: { name: string; email: string; password: string; role: string }) =>
      request<{ success: boolean; user: any }>("/users", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id: string, data: any) =>
      request<{ success: boolean; user: any }>(`/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    toggleStatus: (id: string) =>
      request<{ success: boolean; user: any }>(`/users/${id}/status`, {
        method: "PATCH",
      }),
    delete: (id: string) =>
      request<{ success: boolean; message: string }>(`/users/${id}`, {
        method: "DELETE",
      }),
  },

  // Menu & Categories
  menu: {
    getCategories: () => request<{ success: boolean; categories: any[] }>("/menu/categories"),
    createCategory: (name: string) =>
      request<{ success: boolean; category: any }>("/menu/categories", {
        method: "POST",
        body: JSON.stringify({ name }),
      }),
    getItems: (category?: string) => {
      const query = category && category !== "All" ? `?category=${encodeURIComponent(category)}` : "";
      return request<{ success: boolean; items: any[] }>(`/menu/items${query}`);
    },
    createItem: (itemData: any) =>
      request<{ success: boolean; item: any }>("/menu/items", {
        method: "POST",
        body: JSON.stringify(itemData),
      }),
    updateItem: (id: string, itemData: any) =>
      request<{ success: boolean; item: any }>(`/menu/items/${id}`, {
        method: "PUT",
        body: JSON.stringify(itemData),
      }),
    deleteItem: (id: string) =>
      request<{ success: boolean; message: string }>(`/menu/items/${id}`, {
        method: "DELETE",
      }),
  },

  // Orders
  orders: {
    getAll: () => request<{ success: boolean; orders: any[] }>("/orders"),
    create: (orderData: { items: any[]; paymentMethod: string; total: number }) =>
      request<{ success: boolean; order: any }>("/orders", {
        method: "POST",
        body: JSON.stringify(orderData),
      }),
    getStats: () => request<{ success: boolean; stats: any }>("/orders/stats"),
  },
};
