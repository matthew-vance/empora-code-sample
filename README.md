# Empora Code Sample

This code sample is a CLI tool that reads addresses from a CSV file and corrects them using a third-party API. Most of the information about the project can be found in this readme but there are also some comments throughout the code that explain the logic in more detail.

[![CI](https://github.com/matthew-vance/empora-code-sample/actions/workflows/ci.yml/badge.svg)](https://github.com/matthew-vance/empora-code-sample/actions/workflows/ci.yml)

## Requirements

### Node.js

This project requires Node.js to be installed. My favorite tool for managing Node.js installs is [fnm](https://github.com/Schniz/fnm).

### Smarty Account

The third-party API used in this project is the [Smarty](https://www.smarty.com/) API. You will need to sign up for an account and get an API key to use this tool.

## Setup

### Clone the Repository

```sh
git clone https://github.com/matthew-vance/empora-code-sample.git
cd empora-code-sample
```

### Set Environment Variables

Create a `.env` file base on `example.env` in the root of the project and replace the values with your Smarty auth ID and token.

```sh
cp example.env .env
```

### Install Dependencies

```sh
npm install
```

## Usage

### Scripts

```sh
# Build the application
npm run build

# Build the application and watch for changes
npm run dev

# Run tests with coverage (watch mode in non CI enironments)
npm test

# Lint and check types
npm run vet
```

### CLI

```sh
# Build script must be ran first
./bin/cli.js -h
```

```sh
cli.js

Usage:
  $ cli.js <file>

Commands:
  <file>  Correct addresses in a CSV file. CSV file must contain columns 'City', 'Street', and 'Zip Code'.

For more info, run any command with the `--help` flag:
  $ cli.js --help

Options:
  -h, --help  Display this message
```

## Project Overview

Entry points live in the `/bin` directory. These are directly executable and contain no logic. The only entry point for this sample is `cli.js` which executes the cli.

All CLI logic is in the `/cli` directory. Here we set up actions to be exectued based on the command line arguments. This is also where we resolve any dependencies that are required for the actions.

The `/scripts` directory contains any scripts that are ran directly from the command line like build or deployment scripts.

The `/test` directory contains utilities for testing, including any global setup and fixtures. The tests themselves live alongside the code they are testing.

The rest of the code lives in the `/lib` directory. This directory contains any logic that could be reused for things beyond the CLI.

## Future Improvements

- **Make the CLI installable** - Right now the CLI requires the consumer to build and execute it from the project root.
- **Put together a more robust dependency container solution** - The dependecy graph is managed by hand now but would quickly become unmanageable as the project grows.
- **Add custom error handling** - Currently the CLI only uses the built in error class for error handling. This works well for small projects but would not be ideal for larger ones.
- **Add a debug mode** - This would allow developers to see more detailed logs and make debugging easier.
- **Support bulk address correction** - The Smarty API supports sending up to 100 addresses at a time for correction. This would be a superior but more complex implemenation that I felt was beyond the scope of this exercise.
- **Support streaming the CSV** - This would allow the CLI to handle larger datasets without running out of memory. The current implementation reads the entire CSV into memory before processing it.
- **Support reading and writing from/to different sources** - The current implementation only supports reading from CSV files and writing to the console.
