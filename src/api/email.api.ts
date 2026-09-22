import { api, getCsrfCookie } from "@/config/axios-config";
import type { VerifyEmailParams } from "@/types/email";

export const resendVerification = async (email: string) => {
    await getCsrfCookie();
    const response = await api.post('/email/verification-notification', { email });
    return response.data;
}

export const verifyEmail = async ({ id, hash, expires, signature }: VerifyEmailParams) => {
    const response = await api.get(`/email/verify/${id}/${hash}`, {
        params: { expires, signature },
    });
    return response.data;
}