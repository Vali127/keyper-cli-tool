import prompts from 'prompts';
import pc from 'picocolors';
import {checkOrInitMasterPassword} from "../services/storage.service.js";

function onCancel() {
    console.log(pc.yellow('\n Operation cancelled.'));
    process.exit(0);
}

export async function resolveMasterPassword() {
    const masterPassword = await askMasterPassword();
    await checkOrInitMasterPassword(masterPassword);
    return masterPassword;
}

export async function askMasterPassword() {
    const { masterPassword } = await prompts(
        {
            type: 'password',
            name: 'masterPassword',
            message: pc.cyan('Master password:'),
            validate: (v) => v.length >= 6 || 'Minimum 6 characters',
        },
        { onCancel }
    );
    return masterPassword;
}

export async function askEntryDetails() {
    return prompts(
        [
            {
                type: 'text',
                name: 'group',
                message: pc.cyan('Group (ex: github):'),
                validate: (v) => v.length > 0 || 'Required',
            },
            {
                type: 'text',
                name: 'username',
                message: pc.cyan('Username:'),
                validate: (v) => v.length > 0 || 'Required',
            },
            {
                type: 'password',
                name: 'password',
                message: pc.cyan('Password:'),
                validate: (v) => v.length > 0 || 'Required',
            },
        ],
        { onCancel }
    );
}

export async function askConfirm(message) {
    const { confirmed } = await prompts(
        {
            type: 'confirm',
            name: 'confirmed',
            message: pc.yellow(message),
            initial: false,
        },
        { onCancel }
    );
    return confirmed;
}

export async function askSearch() {
    return prompts(
        [
            {
                type: 'text',
                name: 'group',
                message: pc.cyan('Group (leave empty to skip):'),
            },
            {
                type: 'text',
                name: 'username',
                message: pc.cyan('Username (leave empty to skip):'),
            },
        ],
        { onCancel }
    );
}