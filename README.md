# Empora Code Sample

This code sample is a CLI tool that reads addresses from a CSV file and corrects them using a third-party API.

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

```sh
# Build the application
npm run build

# Build the application and watch for changes
npm run dev

# Run the application (build or dev script must be ran first)
./bin/cli.js <path-to-csv-file>

# See help message
./bin/cli.js --help

# Run tests with coverage (watch mode in non CI enironments)
npm test

#Lint and check types
npm run vet
```
