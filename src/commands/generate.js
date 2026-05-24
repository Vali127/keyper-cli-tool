import { Command } from 'commander';
import pc from 'picocolors';
import crypto from 'crypto';
import clipboard from 'clipboardy';
import number from '@inquirer/number';
import checkbox from '@inquirer/checkbox';

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
        try {
            const length = await number({
                message: pc.cyan('Password length:'),
                default: 16,
                validate: (v) => v >= 8 || 'Minimum 8 characters',
            });

            const types = await checkbox({
                message: pc.cyan('Character types:'),
                choices: [
                    { name: 'Lowercase', value: 'lowercase', checked: true },
                    { name: 'Uppercase', value: 'uppercase', checked: true },
                    { name: 'Numbers',   value: 'numbers',   checked: true },
                    { name: 'Symbols',   value: 'symbols',   checked: false },
                ],
                validate: (v) => v.length > 0 || 'Select at least one',
            });

            const charset = types.map((t) => CHARSETS[t]).join('');
            const password = generatePassword(length, charset);

            console.log(pc.cyan('\n Generated password:'));
            console.log(pc.bold(pc.white(`  ${password}\n`)));

            await clipboard.write(password);
            console.log(pc.green('✔ Copied to clipboard!'));
        } catch (e) {
            console.log(pc.yellow('\n Operation cancelled.'));
            process.exit(0);
        }
    });