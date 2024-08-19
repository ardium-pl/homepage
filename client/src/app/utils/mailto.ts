interface MailtoParams {
  subject?: string;
  body?: string;
  cc?: string;
  bcc?: string;
}

export function createMailto(email: string, params?: MailtoParams): string {
  if (!params) {
    return `mailto:${email}`;
  }

  const queryString = Object.keys(params)
    .map(key => {
      const encodedValue = encodeURIComponent(params[key as keyof MailtoParams]!);
      return `${key}=${encodedValue}`;
    })
    .join('&');

  return `mailto:${email}?${queryString}`;
}
