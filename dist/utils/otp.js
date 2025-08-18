"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOTP = generateOTP;
exports.sendSMS = sendSMS;
const axios_1 = __importDefault(require("axios"));
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}
async function sendSMS(phoneNumber, otp) {
    try {
        const response = await axios_1.default.post("https://api.sms.ir/v1/send/verify", {
            mobile: phoneNumber,
            templateId: 131523,
            parameters: [{ name: "otp", value: otp }],
        }, {
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "WuatspwdbP8uEziiLAxr1rXsg5pUDbB6HeBjcUCD3W6cvdXC",
                Accept: "text/plain",
            },
        });
        return response.status === 200;
    }
    catch (error) {
        console.error("Error sending SMS:", error);
        return false;
    }
}
