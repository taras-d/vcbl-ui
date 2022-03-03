const formatter = new Intl.DateTimeFormat('en-US', {
  hour: '2-digit',
  hourCycle: 'h23',
  minute: '2-digit',
  second: '2-digit',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

function formatToParts(date: Date): Record<Intl.DateTimeFormatPartTypes, string> {
  return formatter.formatToParts(new Date(date))
    .reduce((cur: Record<string, string>, part: Intl.DateTimeFormatPart) => {
      cur[part.type] = part.value;
      return cur;
    }, {});
}

export function formatDate(date: string | number | Date): string {
  const p = formatToParts(new Date(date));
  return `${p.hour}:${p.minute}:${p.second} ${p.day}.${p.month}.${p.year}`;
}