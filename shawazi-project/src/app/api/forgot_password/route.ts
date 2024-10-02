// import { sendResetSms } from './smsService';
// import { generateResetToken, storeToken } from './tokenService';
// export async function POST(request) {
//     try {
//         const { phone_number } = await request.json();
//         if (!phone_number) {
//             return new Response(JSON.stringify({ message: "Phone number is required." }), { status: 400 });
//         }
//         const token = generateResetToken();
//         storeToken(phone_number, token);
//         await sendResetSms(phone_number, token);
//         return new Response(JSON.stringify({ message: "Reset code sent to your phone." }), { status: 200 });
//     } catch (error) {
//         console.error("Error in forgot password:", error);
//         return new Response(JSON.stringify({ message: "Internal server error." }), { status: 500 });
//     }
// }






