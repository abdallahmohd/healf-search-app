import fs from 'fs';
import Papa from 'papaparse';

const csv = fs.readFileSync('products.csv', 'utf8');

const { data } = Papa.parse(csv, {
  header: true,
  skipEmptyLines: true,
});

fs.writeFileSync('products.json', JSON.stringify(data, null, 2));
console.log(`✅ Converted ${data.length} rows to JSON`);
