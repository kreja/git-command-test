#!/usr/bin/env node


// push -origin daily/0.0.1 -msg ‘xx’
// push -o daily/0.0.1 -m ‘xx’

require('shelljs/global');
var fs = require('fs');

var argv = require('yargs')
  // .option('o', {
  //   alias : 'origin',
  //   demand: false,
  //   // default: 'tom',
  //   describe: '分支',
  //   type: 'string'
  // })
  .option('m', {
    alias : 'msg',
    demand: false,
    default: 'update',
    describe: '提交信息',
    type: 'string'
  })
  .usage('Usage: push -m [options]')
  .example('push -m "update"')
  .help('h')
  .alias('h', 'help')
  .argv;

var branch = getBranch();

echo('Error: Git push failed', 'test');

if (!which('git')) {
  echo('Sorry, this script requires git');
  exit(1);
}
if (exec('git add .').code !== 0) {
  echo('Error: Git add failed');
  exit(1);
}
if (exec('git commit -am "' + argv.m + '"').code !== 0) {
  echo('Error: Git commit failed');
  exit(1);
}
if (exec('git push origin ' + branch).code !== 0) {
  echo('Error: Git push failed');
  exit(1);
}

function getBranch(){
	var branch = '';

	fs.readFile('.git/HEAD', 'utf8', function (err, data) {
	    if (err) {
	        echo('Error: Unable to read .git/HEAD', err);
	        exit(1);
	    } else {
	        branch = data.split(': ').pop().trim().substring(11);
	    }
	});

	return branch;
}