interface ReceiptData {
  organisationId: string;
  fiscalId: string;
  transactionId: string;
  items: {
    productId: string;
    name: string;
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
  const [{ orgId, ticket }] = await res.json();
  const { fiscalId, transactionId, items } = ticket;
  return {
    organisationId: orgId,
    fiscalId,
    transactionId,
    // @ts-ignore
    items: items.map(({ commodity: { productId, name, quantity } }) => ({
      productId,
      name,
      quantity,
    })),
  };
}
