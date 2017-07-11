#!/usr/bin/env node
require("babel-core/register")
const { version } = require('../package.json')
// Native
const { resolve } = require('path')

// ours
const { error } = require('../lib/utils/error')

// Check if the current path exists and throw and error
// if the user is trying to deploy a non-existing path!
// This needs to be done exactly in this place, because
// the utility imports are taking advantage of it
try {
  process.cwd()
} catch (err) {
  if (err.code === 'ENOENT' && err.syscall === 'uv_cwd') {
    console.log(`Current path doesn't exist!`)
  } else {
    console.log(err)
  }
  process.exit(1)
}


const commands = new Set([
  'help',
  'get',
  'push',
  'normalize',
  'norm',
  'purge',
  'configure',
  'validate',
  'info',
  'init',
  'cat',
  'login'
])

const aliases = new Map([
  ['configure', 'config'],
  ['norm', 'normalize']
])


// Parse args and dispatch to relevant command
let args = process.argv.slice(2)

if (args[0] === '-v' || args[0] === '--version') {
  console.log(`Version: ${version}`)
  process.exit()
}

// default command
let cmd = 'help'
const index = args.findIndex(a => commands.has(a))

if (index > -1) {
  cmd = args[index]
  args.splice(index, 1)

  // dispatch to the underlying command and help will be called there
  if (cmd === 'help' && index < args.length && commands.has(args[index])) {
    cmd = args[index]
    args.splice(index, 1)
    args.unshift('--help')
  }

  cmd = aliases.get(cmd) || cmd
  if (cmd.includes(' ')) {
    const parts = cmd.split(' ')
    cmd = parts.shift()
    args = [].concat(parts, args)
  }
} else {
  // one final option is no command in which case show help
  if (args.length === 0) {
    cmd = 'help'
  } else {
    error(`Command does not exist "` + args[0] + '"')
    console.error(`\nTo see a list of available commands run:`)
    console.error(`\n  data help\n`)
    process.exit(1)
  }
}

const bin = resolve(__dirname, 'data-' + cmd + '.js')

// Prepare process.argv for subcommand
process.argv = process.argv.slice(0, 2).concat(args)

// Load sub command
// With custom parameter to make "pkg" happy
require(bin, 'may-exclude')
