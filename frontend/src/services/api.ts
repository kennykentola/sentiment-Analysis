import { account } from './appwrite';

const rawApiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/v1';
export const API_BASE_URL = rawApiUrl.endsWith('/api/v1') ? rawApiUrl : `${rawApiUrl}/api/v1`;

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
    try {
        const jwtResponse = await account.createJWT();
        const jwt = jwtResponse.jwt;

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
            'X-Appwrite-JWT': jwt,
            ...options.headers,
        };

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers,
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
        throw error;
    }
}

export const AnalyticsAPI = {
    getLiveAnalytics: () => fetchWithAuth('/analytics/latest'),
    getTrends: () => fetchWithAuth('/analytics/trends'),
    getUniversities: () => fetchWithAuth('/analytics/universities'),
    getTopics: () => fetchWithAuth('/analytics/topics'),
    getRegional: () => fetchWithAuth('/analytics/regional'),
};

export const RolesAPI = {
    getRoles: () => fetchWithAuth('/roles/'),
    createRole: (data: any) => fetchWithAuth('/roles/', {
        method: 'POST',
        body: JSON.stringify(data)
    }),
    deleteRole: (id: string) => fetchWithAuth(`/roles/${id}`, {
        method: 'DELETE'
    })
};

export const UsersAPI = {
    getUsers: () => fetchWithAuth('/users/'),
    updateUserRole: (userId: string, role: string) => fetchWithAuth(`/users/${userId}/role`, {
        method: 'PUT',
        body: JSON.stringify({ role })
    })
};
