import pc from 'picocolors';
import select from '@inquirer/select';

export async function showMenu() {
    try {
        return await select({
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
    } catch (e) {
        console.log(pc.yellow('\n Bye!'));
        process.exit(0);
    }
}