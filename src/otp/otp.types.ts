export interface RequestOTPInput {
    phone: string;
}

export interface VerifyOTPInput {
    phone: string;
    otp: string;
}
