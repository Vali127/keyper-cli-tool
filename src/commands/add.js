import { Command } from 'commander';
import pc from 'picocolors';
import {askEntryDetails, resolveMasterPassword} from '../utils/prompt.utils.js';
import { addEntry } from '../services/storage.service.js';

export const addCommand = new Command('add')
    .description('Add a new password entry')
    .action(async () => {
        const masterPassword = await resolveMasterPassword();
        const entry = await askEntryDetails();

        await addEntry(entry, masterPassword);

        console.log(pc.green('\n✔ Entry added successfully!'));
    });