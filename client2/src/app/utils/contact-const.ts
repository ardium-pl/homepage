import { createMailto } from "./mailto";
import { createUniversalMapLink } from "./maps-link";

export const EMAIL = 'contact@ardium.pl';
export const PHONE = '+48&puncsp;667&puncsp;447&puncsp;776'; // &puncsp; character is a bit narrower than a normal space
export const ADDRESS = 'Aleje Jerozolimskie 134 02-305, Warsaw, Poland';

export const EMAIL_HREF = createMailto(EMAIL);
export const PHONE_HREF = `tel:${PHONE.replace(/[^+\d]/g, '')}`;
export const ADDRESS_HREF = createUniversalMapLink(ADDRESS);