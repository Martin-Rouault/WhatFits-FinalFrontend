import { api, getCsrfCookie } from "@/config/axios-config";

export type ResetPasswordPayload = {
  token: string
  email: string
  password: string
  password_confirmation: string
}

export const forgotPassword = async (email: string) => {
    await getCsrfCookie();
    const response = await api.post('/forgot-password', { email });
    return response.data;
}

export const resetPassword = async (data: ResetPasswordPayload) => {
    await getCsrfCookie();
    const response = await api.post(`/reset-password/${data.token}`, data);
    return response.data;
}