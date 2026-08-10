import { createClient } from '@sanity/client';
export const client = createClient({
  projectId: 'tdnmb8yr',
  dataset: 'production',     
  useCdn: true,
  apiVersion: '2023-01-01',
});