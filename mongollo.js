#!/usr/bin/env node
const [,, ...args] = process.argv

String.prototype.capitalize = function(){
  const arr = Array.from(this)
  const firstChar = arr.shift()
  return ([firstChar.toUpperCase()].concat(arr)).join('')
}

String.prototype.uncapitalize = function(){
  const arr = Array.from(this)
  const firstChar = arr.shift()
  return ([firstChar.toLowerCase()].concat(arr)).join('')
}

const commandName = args[0] || ''
let command

try {
  command = require(`./commands/${commandName}`)
} catch (ex) {
  console.error(`command "${commandName}" not found`, ex)
}
command(args.slice(1))

