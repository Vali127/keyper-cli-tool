import { Command } from 'commander';
import pc from 'picocolors';
import clipboard from 'clipboardy';
import prompts from 'prompts';
import {askSearch, resolveMasterPassword} from '../utils/prompt.utils.js';
import { findEntries } from '../services/storage.service.js';

export const getCommand = new Command('get')
    .description('Get a password and copy it to clipboard')
    .action(async () => {
        const masterPassword = await resolveMasterPassword();
        const filters = await askSearch();
        const entries = await findEntries(masterPassword, filters);

        if (entries.length === 0) {
            console.log(pc.yellow('\n No entries found.'));
            return;
        }

        const { selected } = await prompts({
            type: 'select',
            name: 'selected',
            message: pc.cyan('Select an entry:'),
            choices: entries.map((e) => ({
                title: `${pc.bold(e.group)} — ${e.username}`,
                value: e,
            })),
        });

        await clipboard.write(selected.password);
        console.log(pc.green('\n✔ Password copied to clipboard!'));
    });