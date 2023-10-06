interface Transaction {
  type: number;
  date: string;
  product: string;
  value: number;
  seller: string;
}

export function parseFile(fileContent: string | ArrayBuffer | null): Transaction[] | null {
  if (!fileContent) {
    return null;
  }

  const lines = (typeof fileContent === 'string' ? fileContent : Buffer.from(fileContent).toString('utf-8')).split('\n');

  const transactions: Transaction[] = [];

  lines.forEach((line: string) => {
    if (line.trim() === '') return;

    const type = parseInt(line.substring(0, 1));
    const date = line.substring(1, 26);
    const product = line.substring(26, 56).trim();
    const value = parseInt(line.substring(56, 66));
    const seller = line.substring(66, 86).trim();

    transactions.push({
      type,
      date,
      product,
      value: value / 100,
      seller,
    });
  });

  return transactions;
}