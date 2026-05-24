import { Command } from 'commander';
import pc from 'picocolors';
import { resolveMasterPassword, askSearch } from '../utils/prompt.utils.js';
import { findEntries } from '../services/storage.service.js';

export const listCommand = new Command('list')
    .description('List password entries')
    .action(async () => {
        const masterPassword = await resolveMasterPassword();
        const filters = await askSearch();
        const entries = await findEntries(masterPassword, filters);

        if (entries.length === 0) {
            console.log(pc.yellow('\n No entries found.'));
            return;
        }

        console.log(pc.cyan(`\n Found ${entries.length} entry(ies):\n`));
        entries.forEach((e) => {
            console.log(pc.white(`  ID       : ${pc.dim(e.id)}`));
            console.log(pc.white(`  Group    : ${pc.bold(e.group)}`));
            console.log(pc.white(`  Username : ${e.username}`));
            console.log(pc.white(`  Created  : ${e.createdAt}`));
            console.log(pc.dim('  ─────────────────────────────────'));
        });
    });