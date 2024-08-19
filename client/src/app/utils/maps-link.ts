export function createUniversalMapLink(address: string): string {
  const encodedAddress = encodeURIComponent(address);
  return `https://maps.google.com/?q=${encodedAddress}`;
}
