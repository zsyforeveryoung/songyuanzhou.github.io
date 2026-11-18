// Edit this list to publish news. Use YYYY-MM-DD dates; newest items appear first.
// Example (remove // to use, then replace with your actual activity):
// { date: "2026-11-18", text: "I attended EVENT NAME in CITY.", url: "https://example.org" },
const news = [
];

const container = document.getElementById('news-items');
const items = news.filter(item => /^\d{4}-\d{2}-\d{2}$/.test(item.date) && item.text && !Number.isNaN(Date.parse(item.date)));
items.sort((a, b) => b.date.localeCompare(a.date));
if (items.length) {
  document.getElementById('news-empty').remove();
  const list = document.createElement('ul');
  list.className = 'news-list';
  for (const item of items) {
    const row = document.createElement('li');
    row.className = 'news-item';
    const date = document.createElement('time');
    date.dateTime = item.date;
    date.textContent = new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(item.date));
    const text = document.createElement('p');
    text.textContent = item.text;
    if (item.url) {
      try {
        const url = new URL(item.url);
        if (['https:', 'http:'].includes(url.protocol)) {
          const link = document.createElement('a');
          link.href = url.href;
          link.textContent = 'Event details';
          text.append(' ', link);
        }
      } catch { /* Keep news visible even when its optional link is invalid. */ }
    }
    row.append(date, text);
    list.append(row);
  }
  container.append(list);
}
