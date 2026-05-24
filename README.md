# Keyper

A lightweight and secure CLI password manager built with Node.js.

## How it works ?
Basically, the queried password is directly copied to the clipboard instead of being shown in plaintext on the terminal.
check the [usage](#usage) section for more information about queries.

## Features

- Add, list, get, and delete password entries
- Organize entries by group (e.g. GitHub, Gmail)
- Generate secure random passwords
- Copy passwords directly to clipboard
- Filter entries by group or username

## Installation

```bash
git clone https://github.com/your-username/keyper.git
cd keyper-cli-tool
npm install
npm link
```

## Usage

```bash
keyper            # opens interactive menu
keyper add        # add a new entry
keyper list       # list entries with optional filters
keyper get        # retrieve and copy a password
keyper delete     # delete an entry
keyper generate   # generate a random password
```

## Security

- 100% local
- working with master password
- AES-256-GCM encryption (for stored data).
- using SHA-256 hash algorithm (For master password).

## Tech Stack

Node.js, Commander, inquirer, Lowdb, Clipboardy, Picocolors, crypto (native)

## License

MIT