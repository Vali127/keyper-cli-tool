#!/usr/bin/env node
import { program } from 'commander';
import pc from 'picocolors';
import { addCommand } from './commands/add.js';
import { listCommand } from './commands/list.js';
import { getCommand } from './commands/get.js';
import { deleteCommand } from './commands/delete.js';
import { generateCommand } from './commands/generate.js';
import { showBanner } from './ui/banner.js';
import { showMenu } from './ui/menu.js';

program
    .name('keyper')
    .description(pc.cyan('🔐 Keyper - Secure CLI Password Manager'))
    .version('1.0.0');

program.addCommand(addCommand);
program.addCommand(listCommand);
program.addCommand(getCommand);
program.addCommand(deleteCommand);
program.addCommand(generateCommand);

showBanner();

if (process.argv.length === 2) {
    const action = await showMenu();
    process.argv.push(action);
}

program.parse(process.argv);