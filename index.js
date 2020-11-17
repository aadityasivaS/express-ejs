#!/usr/bin/env node
var { exec } = require('child_process');
var fs = require('fs');
var npm = require('npm-programmatic');
const simpleGit = require('simple-git');
require('colors');
const git = simpleGit();
var Args = process.argv.slice(2);
console.log('Making your project');
const loading = require('loading-cli');
const load = loading("Cloning Template!!").start()
let packageMod = `{
    "name": "${Args[0]}",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "start": "nodemon index.js"
    },
    "license": "ISC",
    "dependencies": {
      
    }
  }`;
exec(`git clone https://github.com/aadityasivaS/express-ejs-template.git ${Args[0]}`, (err, stdout, stderr) => {
  load.color = 'yellow';
  load.text = ' Installing Packages';
  if (!err) {
    fs.writeFile(`${Args[0]}/package.json`, packageMod, function (err) {
      npm.install(['express', 'ejs', 'nodemon'], {
        cwd: `${Args[0]}`,
        save: true,
      })
        .then(function () {
          git.cwd(`${Args[0]}`);
          git.add(['package.json', 'package-lock.json']).then(function () {
            git.commit('Cloned repo', (err) => {
              load.stop();
              console.log("SUCCESS!!! run npm start in the directory to start the server".green);
            });
          });

        })
    });
  }
});