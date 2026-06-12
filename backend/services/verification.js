/** In-memory email verification codes (expire after 15 minutes) */
const TTL_MS = 15 * 60 * 1000;
const codes = new Map();

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function generateCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function saveCode(email, code) {
  const key = normalizeEmail(email);
  codes.set(key, {
    code,
    expiresAt: Date.now() + TTL_MS,
  });
}

function verifyCode(email, code) {
  const key = normalizeEmail(email);
  const entry = codes.get(key);
  if (!entry) {
    return { ok: false, message: 'No verification code found. Please request a new one.' };
  }
  if (Date.now() > entry.expiresAt) {
    codes.delete(key);
    return { ok: false, message: 'Verification code expired. Please request a new one.' };
  }
  if (String(code).trim() !== entry.code) {
    return { ok: false, message: 'Invalid verification code.' };
  }
  codes.delete(key);
  return { ok: true };
}

function clearCode(email) {
  codes.delete(normalizeEmail(email));
}

module.exports = {
  generateCode,
  saveCode,
  verifyCode,
  clearCode,
};
