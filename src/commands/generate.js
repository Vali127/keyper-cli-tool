import { Command } from 'commander';
import pc from 'picocolors';
import crypto from 'crypto';
import clipboard from 'clipboardy';
import prompts from 'prompts';

const CHARSETS = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
};

function generatePassword(length, charset) {
    return Array.from(crypto.randomBytes(length))
        .map((byte) => charset[byte % charset.length])
        .join('');
}

export const generateCommand = new Command('generate')
    .description('Generate a secure random password')
    .action(async () => {
        const { length, types } = await prompts([
            {
                type: 'number',
                name: 'length',
                message: pc.cyan('Password length:'),
                initial: 16,
                validate: (v) => v >= 8 || 'Minimum 8 characters',
            },
            {
                type: 'multiselect',
                name: 'types',
                message: pc.cyan('Character types:'),
                choices: [
                    { title: 'Lowercase', value: 'lowercase', selected: true },
                    { title: 'Uppercase', value: 'uppercase', selected: true },
                    { title: 'Numbers',   value: 'numbers',   selected: true },
                    { title: 'Symbols',   value: 'symbols',   selected: false },
                ],
                min: 1,
            },
        ]);

        const charset = types.map((t) => CHARSETS[t]).join('');
        const password = generatePassword(length, charset);

        console.log(pc.cyan('\n Generated password:'));
        console.log(pc.bold(pc.white(`  ${password}\n`)));

        await clipboard.write(password);
        console.log(pc.green('✔ Copied to clipboard!'));
    });