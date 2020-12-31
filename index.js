#!/usr/bin/env node
var { exec } = require('child_process');
var fs = require('fs');
var npm = require('npm-programmatic');
const simpleGit = require('simple-git');
const firebase = require('firebase/app');
require('firebase/analytics');
require('colors');
var firebaseConfig = {
  apiKey: "AIzaSyDWVPl0eBGOvVkGce-h-0IDtkc--cwWtUc",
  authDomain: "express-ejs.firebaseapp.com",
  projectId: "express-ejs",
  storageBucket: "express-ejs.appspot.com",
  messagingSenderId: "373283735977",
  appId: "1:373283735977:web:7c1dc597146fbce5ecdcb8",
  measurementId: "G-W2TFPD40CF"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();
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