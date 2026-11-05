import { useAuthStore } from '@/stores/auth';
import { router } from '@/router';

const rawApiUrl = import.meta.env.VITE_API_URL || '';
const baseUrl = rawApiUrl.endsWith('/') ? rawApiUrl : `${rawApiUrl}/`;

export async function api(
    url: string,
    options: RequestInit = {}
): Promise<Response> {
    const authStore = useAuthStore();
    const cleanUrl = url.startsWith('/') ? url.slice(1) : url;

    const res = await fetch(baseUrl + cleanUrl, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {}),
            ...(authStore.token && {
                Authorization: `Bearer ${authStore.token}`
            })
        }
    });

    if (res.status === 401) {
        authStore.logout();
        router.push('/login');
    }

    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw {
            status: res.status,
            error
        };
    }

    return res;
}