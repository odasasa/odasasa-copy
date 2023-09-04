import { headers } from 'next/dist/client/components/headers';
export async function getHostPath() {
  const host = (await headers().get('host')) || '';
  return host.includes('localhost') ? `{http://${host}/}` : `{https://${host}}`;
}
