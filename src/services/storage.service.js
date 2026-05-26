import { join } from 'path';
import { homedir } from 'os';
import { mkdirSync } from 'fs';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import pc from 'picocolors';
import { encrypt, decrypt } from './crypto.service.js';
import { createVerifier, verifyMasterPassword } from '../utils/validator.utils.js';

const VAULT_DIR = join(homedir(), '.keyper');
const VAULT_PATH = join(VAULT_DIR, 'vault.json');

mkdirSync(VAULT_DIR, { recursive: true });

const adapter = new JSONFile(VAULT_PATH);
const db = new Low(adapter, { verifier: null, entries: [] });

export async function loadVault() {
    await db.read();
}

export async function saveVault() {
    await db.write();
}

export async function checkOrInitMasterPassword(masterPassword) {
    await loadVault();

    if (!db.data.verifier) {
        db.data.verifier = createVerifier(masterPassword);
        await saveVault();
        console.log(pc.green('\n✔ Vault initialized with your master password!\n'));
        return true;
    }

    const valid = verifyMasterPassword(masterPassword, db.data.verifier);
    if (!valid) {
        console.log(pc.red('\n✖ Wrong master password.\n'));
        process.exit(1);
    }

    return true;
}

export async function getAllEntries(masterPassword) {
    await loadVault();
    return db.data.entries.map((entry) => ({
        ...entry,
        password: decrypt(entry.password, masterPassword),
    }));
}

export async function addEntry(entry, masterPassword) {
    await loadVault();
    db.data.entries.push({
        id: crypto.randomUUID(),
        group: entry.group,
        username: entry.username,
        password: encrypt(entry.password, masterPassword),
        createdAt: new Date().toISOString(),
    });
    await saveVault();
}

export async function deleteEntry(id) {
    await loadVault();
    db.data.entries = db.data.entries.filter((e) => e.id !== id);
    await saveVault();
}

export async function findEntries(masterPassword, { group, username } = {}) {
    const entries = await getAllEntries(masterPassword);
    return entries.filter((e) => {
        if (group && !e.group.toLowerCase().includes(group.toLowerCase())) return false;
        if (username && !e.username.toLowerCase().includes(username.toLowerCase())) return false;
        return true;
    });
}