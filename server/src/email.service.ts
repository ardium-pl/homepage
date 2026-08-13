import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

interface SendEmailInput {
  content: string;
  subject: string;
  senderEmail: string;
}

const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL?.trim();
const sesClient = new SESClient({
  region: process.env.AWS_REGION,
});

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class EmailValidationError extends Error {}

/**
 * Sends a plain-text contact email through AWS SES.
 * The recipient is fixed by CONTACT_RECIPIENT_EMAIL and is never accepted from the request.
 */
export async function sendEmail({ content, subject, senderEmail }: SendEmailInput): Promise<void> {
  assertString(content, 'content');
  assertNonEmptyString(subject, 'subject');
  assertEmail(senderEmail, 'senderEmail');
  assertEmail(recipientEmail, 'CONTACT_RECIPIENT_EMAIL');

  const command = new SendEmailCommand({
    Destination: {
      ToAddresses: [recipientEmail],
    },
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: content,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject,
      },
    },
    Source: senderEmail,
  });

  try {
    await sesClient.send(command);
    console.log(`Email sent to ${maskEmail(recipientEmail)} with subject: ${subject}`);
  } catch (error: unknown) {
    console.error(
      `Failed to send email to ${maskEmail(recipientEmail)}: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
    throw error;
  }
}

function assertString(value: unknown, field: string): asserts value is string {
  if (typeof value !== 'string') {
    throw new EmailValidationError(`${field} must be a string`);
  }
}

function assertNonEmptyString(value: unknown, field: string): asserts value is string {
  assertString(value, field);

  if (!value.trim()) {
    throw new EmailValidationError(`${field} cannot be empty`);
  }

  assertSafeHeader(value, field);
}

function assertEmail(value: unknown, field: string): asserts value is string {
  if (typeof value !== 'string' || !emailPattern.test(value) || /[\r\n]/.test(value)) {
    throw new EmailValidationError(`${field} must be a valid email address`);
  }
}

function assertSafeHeader(value: string, field: string): void {
  if (/[\r\n]/.test(value)) {
    throw new EmailValidationError(`${field} cannot contain line breaks`);
  }
}

function maskEmail(email: string): string {
  const [user, domain] = email.split('@');
  if (!domain) return '*******';
  if (user.length <= 2) return `${user}***@${domain}`;
  return `${user[0]}***${user[user.length - 1]}@${domain}`;
}
