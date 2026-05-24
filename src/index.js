#!/usr/bin/env node
import { program } from 'commander';
import pc from 'picocolors';
import { addCommand } from './commands/add.js';
import { listCommand } from './commands/list.js';
import { getCommand } from './commands/get.js';
import { deleteCommand } from './commands/delete.js';
import { generateCommand } from './commands/generate.js';
import select from '@inquirer/select';
import figlet from "figlet";
import { readFileSync } from 'fs';

figlet.parseFont('3d', readFileSync('./src/assets/ANSI Regular.flf', 'utf8'));

program
    .name('keyper')
    .description(pc.cyan('🔐 Keyper - Secure CLI Password Manager'))
    .version('1.0.0');

program.addCommand(addCommand);
program.addCommand(listCommand);
program.addCommand(getCommand);
program.addCommand(deleteCommand);
program.addCommand(generateCommand);

console.log(pc.gray("\nstarting...\n"));
console.log(pc.white(figlet.textSync('Keyper', { font: '3d' })));
console.log(pc.gray("A lightweight and secure CLI password manager built with Node.js.\n"))
//Menu if there are no given arguments
if (process.argv.length === 2) {
    try {
        const action = await select({
            message: pc.bold('What do you want to do?'),
            choices: [
                { name: 'Add a password',      value: 'add' },
                { name: 'List passwords',      value: 'list' },
                { name: 'Get a password',      value: 'get' },
                { name: 'Generate a password', value: 'generate' },
                { name: 'Delete a password',   value: 'delete' },
            ],
            theme: {
                style: {
                    highlight: (text) => pc.bold(pc.blue(text)),
                },
            },
        });
        process.argv.push(action);
    } catch (e) {
        console.log(pc.yellow('\n Bye!'));
        process.exit(0);
    }
}

program.parse(process.argv);