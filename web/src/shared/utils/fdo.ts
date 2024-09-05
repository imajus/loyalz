interface ReceiptData {
  id: string;
  items: {
    sku: string;
    quantity: number;
  }[];
}

export async function fetchReceiptData(link: string): Promise<ReceiptData> {
  link = link.replace(/^http:/, 'https:');
  if (!link.startsWith('https://consumer.oofd.kz')) {
    throw new Error('Unsupported Fiscal Data Operator');
  }
  const url = new URL('https://n8n.bishmanov.kz/webhook/kaztel-ofd');
  url.searchParams.set('qr-data', link);
  const res = await fetch(url);
  return res.json();
}
