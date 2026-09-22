import { api, getCsrfCookie } from "@/config/axios-config";
import type { LoginPayload, RegisterPayload,  } from "@/types/auth";
import type { Me, User } from "@/types/user";

export const login = async (data: LoginPayload): Promise<User> => {
    await getCsrfCookie();
    const response = await api.post('/login', data);
    return response.data.user;    
}
export const logout = async () => {
    const response = await api.post('/logout');
    return response.data;    
}

export const register = async (data: RegisterPayload) => {
    await getCsrfCookie();
    const response = await api.post('/register', data);
    return response.data;    
}

export const me = async (): Promise<Me> => {
    const response = await api.get('/me');
    return response.data.data;    
}

