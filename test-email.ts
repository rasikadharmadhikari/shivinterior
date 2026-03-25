import nodemailer from "nodemailer";
import { readFileSync } from "fs";
import { resolve } from "path";

// Manually load .env
const envPath = resolve(".env");
const envContent = readFileSync(envPath, "utf-8");
envContent.split("\n").forEach((line) => {
  const [key, ...valueParts] = line.split("=");
  const value = valueParts.join("=").trim();
  if (key && !key.startsWith("#") && value && !value.startsWith("#")) {
    process.env[key.trim()] = value;
  }
});

async function testEmailConfig() {
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;
  const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL;

  console.log("Testing Email Configuration...");
  console.log("GMAIL_USER:", gmailUser);
  console.log("GMAIL_APP_PASSWORD:", gmailPass ? "✓ Set" : "✗ Not set");
  console.log("CONTACT_RECEIVER_EMAIL:", receiverEmail);

  if (!gmailUser || !gmailPass) {
    console.error("❌ Missing Gmail credentials");
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    console.log("\n📧 Verifying SMTP connection...");
    await transporter.verify();
    console.log("✓ SMTP connection verified successfully!");

    console.log("\n📤 Sending test email...");
    const result = await transporter.sendMail({
      from: gmailUser,
      to: receiverEmail || gmailUser,
      subject: "Test Email from Shiv Interior Project",
      text: "This is a test email to verify your email configuration is working.",
      html: "<p>This is a test email to verify your email configuration is working.</p>",
    });

    console.log("✓ Test email sent successfully!");
    console.log("Message ID:", result.messageId);
    console.log("\n✅ Email configuration is working correctly!");
  } catch (error) {
    console.error("❌ Error:", error instanceof Error ? error.message : String(error));
  }
}

testEmailConfig();
