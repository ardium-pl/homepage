import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

interface SendEmailInput {
  content: string;
  subject: string;
  responseEmail: string;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class EmailValidationError extends Error {}

/**
 * Sends a plain-text contact email through AWS SES.
 * The recipient is fixed by CONTACT_RECIPIENT_EMAIL and is never accepted from the request.
 */
export class EmailService {
  private readonly sesClient = new SESClient({
    region: process.env.AWS_REGION,
  });

  async send({ content, subject, responseEmail }: SendEmailInput): Promise<void> {
    const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL?.trim();
    const sesSenderEmail = process.env.AWS_SENDER_EMAIL?.trim();

    this.assertString(content, 'content');
    this.assertNonEmptyString(subject, 'subject');
    this.assertEmail(responseEmail, 'senderEmail');
    this.assertEmail(recipientEmail, 'CONTACT_RECIPIENT_EMAIL');
    this.assertEmail(sesSenderEmail, 'AWS_SENDER_EMAIL');

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
      Source: sesSenderEmail,
      ReplyToAddresses: [responseEmail],
    });

    try {
      await this.sesClient.send(command);
      console.log(`Email sent to ${this.maskEmail(recipientEmail)} with subject: ${subject}`);
    } catch (error: unknown) {
      console.error(
        `Failed to send email to ${this.maskEmail(recipientEmail)}: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
      throw error;
    }
  }

  private assertString(value: unknown, field: string): asserts value is string {
    if (typeof value !== 'string') {
      throw new EmailValidationError(`${field} must be a string`);
    }
  }

  private assertNonEmptyString(value: unknown, field: string): asserts value is string {
    this.assertString(value, field);

    if (!value.trim()) {
      throw new EmailValidationError(`${field} cannot be empty`);
    }

    this.assertSafeHeader(value, field);
  }

  private assertEmail(value: unknown, field: string): asserts value is string {
    if (typeof value !== 'string' || !emailPattern.test(value) || /[\r\n]/.test(value)) {
      throw new EmailValidationError(`${field} must be a valid email address`);
    }
  }

  private assertSafeHeader(value: string, field: string): void {
    if (/[\r\n]/.test(value)) {
      throw new EmailValidationError(`${field} cannot contain line breaks`);
    }
  }

  private maskEmail(email: string): string {
    const [user, domain] = email.split('@');
    if (!domain) return '*******';
    if (user.length <= 2) return `${user}***@${domain}`;
    return `${user[0]}***${user[user.length - 1]}@${domain}`;
  }
}
