export type TrustedUsCompanyData = {
  readonly logoSrc: string;
  readonly name: string;
  readonly description: string;
};

export const TRUSTED_US_COMPANIES: Readonly<TrustedUsCompanyData[]> = [
  {
    logoSrc: 'assets/logo1.png',
    name: 'Firma 1',
    description: 'Opis firmy 1',
  },
  {
    logoSrc: 'assets/logo2.png',
    name: 'Firma 2',
    description: 'Opis firmy 2',
  },
  {
    logoSrc: 'assets/logo3.png',
    name: 'Firma 3',
    description: 'Opis firmy 3',
  },
  {
    logoSrc: 'assets/logo4.png',
    name: 'Firma 4',
    description: 'Opis firmy 4',
  },
];
