export function generateCalendarUrl(event) {
  const { title, description, startDate, endDate, location } = event;
  const fmt = (d) => new Date(d).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const start = fmt(startDate);
  const end = fmt(endDate || new Date(new Date(startDate).getTime() + 3600000));
  const params = new URLSearchParams({
    action: 'TEMPLATE', text: title, dates: `${start}/${end}`,
    details: description || '', location: location || '', sf: 'true', output: 'xml'
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

export function generateICSFile(event) {
  const { title, description, startDate, endDate, location } = event;
  const fmt = (d) => new Date(d).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  return [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//VoteSathi//EN', 'BEGIN:VEVENT',
    `DTSTART:${fmt(startDate)}`, `DTEND:${fmt(endDate || startDate)}`,
    `SUMMARY:${title}`, `DESCRIPTION:${description || ''}`,
    `LOCATION:${location || ''}`, 'END:VEVENT', 'END:VCALENDAR'
  ].join('\r\n');
}

export function downloadICS(event) {
  const ics = generateICSFile(event);
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${event.title.replace(/\s+/g, '_')}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}
