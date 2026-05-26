import figlet from 'figlet';
import pc from 'picocolors';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

figlet.parseFont('ANSI Regular', readFileSync(join(__dirname, '../assets/ANSI Regular.flf'), 'utf8'));

export function showBanner() {
    console.log(pc.gray("\nStarting...\n"))
    console.log(pc.white(figlet.textSync('Keyper', { font: 'ANSI Regular' })));
    console.log(pc.gray('A lightweight and secure CLI password manager built with Node.js.\n'));
}