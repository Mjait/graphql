export function createSVGElement(tag, attrs) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (let key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
  return el;
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function formatBytes(bytes) {
  if (bytes >= 1024 * 1024) {
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  } else if (bytes >= 1024) {
    return (bytes / 1024).toFixed(2) + ' KB';
  }
  return bytes + ' bytes';
}

export function getUserRank(level) {
  if (level < 10) return 'Aspiring Developer';
  if (level < 20) return 'Beginner Developer';
  if (level < 30) return 'Apprentice Developer';
  if (level < 40) return 'Assistant Developer';
  if (level < 50) return 'Basic Developer';
  return 'Junior Developer';
}