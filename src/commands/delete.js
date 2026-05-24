import { Command } from 'commander';
import pc from 'picocolors';
import select from '@inquirer/select';
import { askSearch, askConfirm, resolveMasterPassword } from '../utils/prompt.utils.js';
import { findEntries, deleteEntry } from '../services/storage.service.js';

export const deleteCommand = new Command('delete')
    .description('Delete a password entry')
    .action(async () => {
        const masterPassword = await resolveMasterPassword();
        const filters = await askSearch();
        const entries = await findEntries(masterPassword, filters);

        if (entries.length === 0) {
            console.log(pc.yellow('\n No entries found.'));
            return;
        }

        try {
            const selected = await select({
                message: pc.cyan('Select an entry to delete:'),
                choices: entries.map((e) => ({
                    name: `${pc.bold(e.group)} — ${e.username}`,
                    value: e,
                })),
                theme: {
                    style: {
                        highlight: (text) => pc.bold(pc.cyan(text)),
                    },
                },
            });

            const confirmed = await askConfirm(`Delete "${selected.group} — ${selected.username}" ?`);
            if (!confirmed) {
                console.log(pc.yellow('\n Cancelled.'));
                return;
            }

            await deleteEntry(selected.id);
            console.log(pc.green('\n✔ Entry deleted successfully!'));
        } catch (e) {
            console.log(pc.yellow('\n Operation cancelled.'));
            process.exit(0);
        }
    });