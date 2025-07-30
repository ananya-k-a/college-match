export async function fetchCollegesFromSheet() {
  const res = await fetch(
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vScywZfXVOgP0uSFvUO2HIDqS7XDp97DlITAQn9wCTwtSMZZsTX-j9CQ2vvyOkGfvlFBuTAeCNdAKVU/pub?output=csv'
  );
  const text = await res.text();

  const rows = text.trim().split('\n').slice(1);
  return rows.map(row => {
    const [
      name, state, acceptanceRate, avgGPA, avgSAT,
      tuition, type, size, link
    ] = row.split(',');

    return {
      name,
      state,
      acceptanceRate: parseFloat(acceptanceRate),
      avgGPA: parseFloat(avgGPA),
      avgSAT: parseInt(avgSAT),
      tuition: parseInt(tuition),
      type,
      size: parseInt(size),
      link
    };
  });
}
