import { sendTestEmail } from "@/libs/nodemailer/gmail";
import { BASE_PATH } from "../next_host";

const sendPasswordResetEmail = async (email: string, token: string) => {
  const from = "your_email@gmail.com", // Sender's email address
    to = email, // Recipient's email address
    subject = "Password Reset",
    body = `To reset your password, click the following link: ${BASE_PATH}/password-reset/${token}`;

  try {
    await sendTestEmail(to, subject, body);

    return true;
  } catch (error) {
    return false;
  }
};
