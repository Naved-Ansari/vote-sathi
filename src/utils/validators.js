export function validateAge(age) {
  const num = parseInt(age, 10);
  if (isNaN(num) || num < 1 || num > 150) return { valid: false, error: 'Please enter a valid age (1-150)' };
  return { valid: true, value: num };
}

export function checkEligibility({ age, isCitizen, isResident, isDisqualified }) {
  if (age < 18) return { eligible: false, reason: 'age', futureDate: getFutureEligibilityDate(age) };
  if (!isCitizen) return { eligible: false, reason: 'citizenship' };
  if (!isResident) return { eligible: false, reason: 'residence' };
  if (isDisqualified) return { eligible: false, reason: 'disqualified' };
  return { eligible: true };
}

function getFutureEligibilityDate(age) {
  const yearsLeft = 18 - age;
  const future = new Date();
  future.setFullYear(future.getFullYear() + yearsLeft);
  return future.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function getDaysUntil(dateStr) {
  const target = new Date(dateStr);
  const now = new Date();
  const diff = target - now;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function sanitizeInput(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[<>\"'&]/g, '').trim();
}
