export type VerifyEmailParams = {
    id: string;
    hash: string;
    expires: string;
    signature: string;
};