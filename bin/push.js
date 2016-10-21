#!/usr/bin/env node

require('shelljs/global');
var fs = require('fs');
var Spinner = require('cli-spinner').Spinner;

var argv = require('yargs')
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

var spinner = new Spinner('processing.. %s');
spinner.setSpinnerString('|/-\\');
spinner.start();


if (!which('git')) {
  echo('Sorry, this script requires git');
  exit(1);
}
echo('adding...');
if (exec('git add .').code !== 0) {
  echo('Error: Git add failed');
  exit(1);
}
echo('committing...');
if (exec('git commit -am "' + argv.m + '"').code !== 0) {
  echo('Error: Git commit failed');
  exit(1);
}
obj.stop()
echo('pushing...');
if (exec('git push origin ' + branch).code !== 0) {
  echo('Error: Git push failed');
  exit(1);
}
echo('=========== DONE! ===========');

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