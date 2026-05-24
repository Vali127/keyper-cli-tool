import crypto from 'crypto';

const ITERATIONS = 100_000;
const KEY_LENGTH = 64;
const DIGEST = 'sha256';

export function hashMasterPassword(masterPassword, salt) {
    return crypto.pbkdf2Sync(masterPassword, salt, ITERATIONS, KEY_LENGTH, DIGEST).toString('hex');
}

export function createVerifier(masterPassword) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = hashMasterPassword(masterPassword, salt);
    return { salt, hash };
}

export function verifyMasterPassword(masterPassword, verifier) {
    const hash = hashMasterPassword(masterPassword, verifier.salt);
    return hash === verifier.hash;
}