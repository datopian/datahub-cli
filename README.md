[![Build Status](https://travis-ci.org/datopian/datahub-cli.svg?branch=master)](https://travis-ci.org/datopian/datahub-cli)

# DataHub CLI in JavaScript

The DataHub CLI is used to manage DataHub data packages from the command line.

# Install

### For development
```
npm install
```

### For Command Line Usage

```
npm install -g
```

# Command Line Usage

### Options

```
datahub --help [-h]
datahub --version [-V]
```

### Commands

```
datahub get <resource> [dir]

# View data in stdout
datahub get {publisher}/{package}/{resource}.[extension]

# Get data on disk
datahub get {publisher}/{package}/{resource}.[extension] [my_dir]
```

# Tests

```
npm test
```