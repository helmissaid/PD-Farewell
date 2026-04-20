
async function run() {
  const url = 'https://docs.google.com/spreadsheets/d/149CREi9w3iN7SBRb0kKaJnrdmOBJV21LNwlOQ-HLP3c/edit';
  const res = await fetch(url);
  const text = await res.text();
  const matches = [...text.matchAll(/"sheetId":(\d+),"name":"([^"]+)"/g)];
  console.log('Matches:', matches.map(m => `ID: ${m[1]}, Name: ${m[2]}`));
}
run();
