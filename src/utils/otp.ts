import axios from "axios";

export function generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendSMS(
    phoneNumber: string,
    otp: string,
): Promise<boolean> {
    try {
        const response = await axios.post(
            "https://api.sms.ir/v1/send/verify",
            {
                mobile: phoneNumber,
                templateId: 131523,
                parameters: [{ name: "otp", value: otp }],
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key":
                        "WuatspwdbP8uEziiLAxr1rXsg5pUDbB6HeBjcUCD3W6cvdXC",
                    Accept: "text/plain",
                },
            },
        );

        return response.status === 200;
    } catch (error) {
        console.error("Error sending SMS:", error);
        return false;
    }
}
