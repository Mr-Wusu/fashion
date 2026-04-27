import { Cloth } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

const apiClient = {
  async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      credentials: "include",
      ...options,
    };

    const response = await fetch(url, config);

    if (response.status === 401) return null;

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ error: "Network error" }));
      throw new Error(error.error || "Request failed");
    }

    return response.json();
  },

  // Auth Methods
  async register(userData: unknown) {
    return apiClient.request("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  async login(email: string, password: string) {
    return apiClient.request("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  async logout() {
    return apiClient.request("/api/auth/logout", {
      method: "POST",
    });
  },

  async getCurrentUser() {
    return apiClient.request("/api/auth/me");
  },

  // User Methods
  async getClothes(): Promise<Cloth[]> {
    const data = await apiClient.request("/api/clothes");
    return data?.clothes ?? []; // ← unwrap here
  },

  async addOrderItem(clothId: string, quantity: number) {
    return apiClient.request("/api/order_items", {
      method: "POST",
      body: JSON.stringify({ clothId, quantity }),
    });
  },

  async changeOrderItem(orderItemId: string, quantity: number) {
    return apiClient.request("/api/order_items", {
      method: "PATCH",
      body: JSON.stringify({ orderItemId, quantity }),
    });
  },

  async removeOrderItem(orderItemId: string) {
    return apiClient.request("/api/order_items", {
      method: "DELETE",
      body: JSON.stringify({ orderItemId }),
    });
  },

  async suggest(userData: unknown) {
    return apiClient.request("/api/suggestions", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },
  // Admin Methods
  async updateUserRole(userId: string, role: string) {
    return apiClient.request(`/api/users/${userId}/role`, {
      method: "PATCH",
      body: JSON.stringify({ role }),
    });
  },

  async getSuggestions() {
    return apiClient.request("/api/suggestions");
  },

  async getUsers() {
    return apiClient.request("/api/users");
  },

  async getOrders() {
    return apiClient.request("/api/orders");
  },

  async assignUserToTeam(userId: string, teamId: string | null) {
    return apiClient.request(`/api/users/${userId}/team`, {
      method: "PATCH",
      body: JSON.stringify({ teamId }),
    });
  },

  async storeCloth(clothData: unknown) {
    return apiClient.request(`/api/clothes`, {
      method: "POST",
      body: JSON.stringify(clothData),
    });
  },

  async deleteClothFromDb(clothId: string) {
    return apiClient.request(`/api/clothes`, {
      method: "DELETE",
      body: JSON.stringify({ id: clothId }),
    });
  },

  async updateClothInDB(clothData: unknown) {
    return apiClient.request(`/api/clothes`, {
      method: "PATCH",
      body: JSON.stringify({ clothData }),
    });
  },
};

export default apiClient;
