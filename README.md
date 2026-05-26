<h1 align="center"> <img width="45" height="45" alt="logo" src="https://github.com/Vali127/keyper-cli-tool/blob/main/src/assets/images/keyper.png" /><br />Keyper</h1>
<h3 align="center">
  An open-source lightweight and secure CLI password manager built with Node.js.
</h3>
<p align="center">
  <img src="https://img.shields.io/npm/v/@mh-valimbavaka/keyper" />
  <img src="https://img.shields.io/github/last-commit/Vali127/keyper-cli-tool" />
  <img src="https://img.shields.io/npm/l/@mh-valimbavaka/keyper" />
</p>

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

**Via npm (recommended):**
```bash
npm install -g @mh-valimbavaka/keyper
```

**Via source:**
```bash
git clone https://github.com/Vali127/keyper-cli-tool.git
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
Node.js, Commander, Inquirer, Lowdb, Clipboardy, Picocolors, crypto (native)
