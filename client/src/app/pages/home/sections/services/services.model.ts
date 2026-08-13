export interface ServiceItem {
  key: string;
  title: string;
  description: string;
  iconUrl: string;
}

export interface ServicesContent {
  preHeading: string;
  title: string;
  subtitle: string;
  list: ServiceItem[];
}
