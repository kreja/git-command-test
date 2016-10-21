#!/usr/bin/env node

// var name = process.argv[2];
// var exec = require('child_process').exec;

// var child = exec('echo hello ' + name, function(err, stdout, stderr) {
//   if (err) throw err;
//   console.log(stdout);
// });


// todo:: daily/0.0.1 可以自己获取

// push -origin daily/0.0.1 -msg ‘xx’
// push -o daily/0.0.1 -m ‘xx’

require('shelljs/global');

var argv = require('yargs')
  .command("morning", "good morning", function (yargs) {
      console.log("Good Morning");
    })
  .option('o', {
    alias : 'origin',
    demand: false,
    // default: 'tom',
    describe: '分支',
    type: 'string'
  })
  .option('m', {
    alias : 'msg',
    demand: false,
    default: 'update',
    describe: '提交信息',
    type: 'string'
  })
  .usage('Usage: push -o [options] -m [options]')
  .example('push -o daily/0.0.1 -m "update"')
  .help('h')
  .alias('h', 'help')
  .argv;


if (!which('git')) {
  echo('Sorry, this script requires git');
  exit(1);
}

// Run external tool synchronously
if (exec('git add .').code !== 0) {
  echo('Error: Git add failed');
  exit(1);
}
if (exec('git commit -am "' + argv.m + '"').code !== 0) {
  echo('Error: Git commit failed');
  exit(1);
}
if (exec('git push origin ' + argv.o).code !== 0) {
  echo('Error: Git push failed');
  exit(1);
}
