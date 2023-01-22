#!/usr/bin/env node

import { program } from 'commander';
import parser from '../src/parser.js';

program 
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<filepath1> <filepath2>')
    .option('-f, --format <type>', 'output format')

    .action((filepath1, filepath2) => {
        console.log(parser(filepath1, filepath2));
    })

program.parse(process.arvs);


/*
//var 1
const command = (names) => {
    for (const name of names) {
      console.log(`Hello, ${name}!`);
    }
  };
  
program
    .version('0.0.1')
    .arguments('<names...>')
    .action(command)
    .parse(process.argv);

// var 2
program .version('0.0.1');
    //.option('-h, --help', 'display help for command');

// Commands
program
    .command('say')
    .description('Say something interesting')
    .alias('s')

    .action(function(name){
        console.log(name)
    })

// Options 
program
    .option('-d, --do', 'Do something')
    .action(function(task){
        console.log(`Doing this ${task}`)
    })
*/

