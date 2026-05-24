import pc from 'picocolors';
import input from '@inquirer/input';
import password from '@inquirer/password';
import confirm from '@inquirer/confirm';
import { checkOrInitMasterPassword } from '../services/storage.service.js';

function handleCancel() {
    console.log(pc.yellow('\n Operation cancelled.'));
    process.exit(0);
}

export async function resolveMasterPassword() {
    const masterPassword = await askMasterPassword();
    await checkOrInitMasterPassword(masterPassword);
    return masterPassword;
}

export async function askMasterPassword() {
    try {
        return await password({
            message: pc.cyan('Master password:'),
            validate: (v) => v.length >= 6 || 'Minimum 6 characters',
        });
    } catch (e) { handleCancel(); }
}

export async function askEntryDetails() {
    try {
        const group = await input({
            message: pc.cyan('Group (ex: github):'),
            validate: (v) => v.length > 0 || 'Required',
        });
        const username = await input({
            message: pc.cyan('Username:'),
            validate: (v) => v.length > 0 || 'Required',
        });
        const pass = await password({
            message: pc.cyan('Password:'),
            validate: (v) => v.length > 0 || 'Required',
        });
        return { group, username, password: pass };
    } catch (e) { handleCancel(); }
}

export async function askConfirm(message) {
    try {
        return await confirm({
            message: pc.yellow(message),
            default: false,
        });
    } catch (e) { handleCancel(); }
}

export async function askSearch() {
    try {
        const group = await input({ message: pc.cyan('Group (leave empty to skip):') });
        const username = await input({ message: pc.cyan('Username (leave empty to skip):') });
        return { group, username };
    } catch (e) { handleCancel(); }
}