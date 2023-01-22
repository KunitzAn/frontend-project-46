#!/usr/bin/env node

import { program } from 'commander';


program 
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.')

program.parse(process.arvs);



/*
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

