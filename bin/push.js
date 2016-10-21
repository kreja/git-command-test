#!/usr/bin/env node

// var name = process.argv[2];
// var exec = require('child_process').exec;

// var child = exec('echo hello ' + name, function(err, stdout, stderr) {
//   if (err) throw err;
//   console.log(stdout);
// });



require('shelljs/global');

var argv = require('yargs').argv;

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
