import nodemailer from "nodemailer";
import type { InsertContactMessage } from "@shared/schema";

const CONTACT_RECEIVER = process.env.CONTACT_RECEIVER_EMAIL || "rasikaa0818@gmail.com";

function buildTransport() {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : undefined;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;

  if (smtpHost && smtpPort && smtpUser && smtpPass) {
    return nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });
  }

  const gmailUser = process.env.GMAIL_USER || smtpUser;
  const gmailPass = process.env.GMAIL_APP_PASSWORD || smtpPass;

  if (gmailUser && gmailPass) {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });
  }

  return null;
}

export async function sendConsultationEmail(input: InsertContactMessage): Promise<void> {
  const transporter = buildTransport();
  if (!transporter) {
    throw new Error(
      "Email service is not configured. Set SMTP or Gmail credentials in environment variables.",
    );
  }

  const sender = process.env.SMTP_FROM_EMAIL || process.env.GMAIL_USER || process.env.SMTP_USER;
  if (!sender) {
    throw new Error("Missing sender email. Set SMTP_FROM_EMAIL or GMAIL_USER.");
  }

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937;">
      <h2 style="margin: 0 0 12px;">New Consultation Request</h2>
      <p style="margin: 0 0 16px; color: #6b7280;">A new landing-page form has been submitted.</p>
      <table cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 640px;">
        <tr>
          <td style="border: 1px solid #e5e7eb; width: 170px;"><strong>Name</strong></td>
          <td style="border: 1px solid #e5e7eb;">${input.name}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #e5e7eb;"><strong>Phone</strong></td>
          <td style="border: 1px solid #e5e7eb;">${input.phone}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #e5e7eb;"><strong>Email</strong></td>
          <td style="border: 1px solid #e5e7eb;">${input.email}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #e5e7eb; vertical-align: top;"><strong>Project Details</strong></td>
          <td style="border: 1px solid #e5e7eb; white-space: pre-wrap;">${input.message}</td>
        </tr>
      </table>
    </div>
  `;

  await transporter.sendMail({
    from: sender,
    to: CONTACT_RECEIVER,
    replyTo: input.email,
    subject: `New Consultation Request - ${input.name}`,
    text: [
      "New consultation request",
      `Name: ${input.name}`,
      `Phone: ${input.phone}`,
      `Email: ${input.email}`,
      `Project Details: ${input.message}`,
    ].join("\n"),
    html,
  });
}
