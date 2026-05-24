#!/usr/bin/env node

import { program } from 'commander';
import pc from 'picocolors';
import prompts from 'prompts';
import { addCommand } from './commands/add.js';
import { listCommand } from './commands/list.js';
import { getCommand } from './commands/get.js';
import { deleteCommand } from './commands/delete.js';
import { generateCommand } from './commands/generate.js';

program
    .name('keyper')
    .description(pc.cyan('🔐 Keyper - Secure CLI Password Manager'))
    .version('1.0.0');

program.addCommand(addCommand);
program.addCommand(listCommand);
program.addCommand(getCommand);
program.addCommand(deleteCommand);
program.addCommand(generateCommand);

// Menu interactif si aucune commande
if (process.argv.length === 2) {
    const { action } = await prompts({
        type: 'select',
        name: 'action',
        message: pc.cyan('What do you want to do?'),
        choices: [
            { title: '➕  Add a password',      value: 'add' },
            { title: '📋  List passwords',       value: 'list' },
            { title: '🔑  Get a password',       value: 'get' },
            { title: '⚡  Generate a password',  value: 'generate' },
            { title: '🗑️   Delete a password',   value: 'delete' },
        ],
    });

    process.argv.push(action);
}

program.parse(process.argv);