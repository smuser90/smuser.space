const CryptoJS = require("crypto-js");
const { Client } = require('@notionhq/client');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Initialize Notion client
const notion = new Client({ auth: process.env.NOTION_TOKEN });


let HASH_STASH = 0;
async function checkForChanges() {
    try {
        console.log("Checking for notion changes");
        const response = await notion.search({});
        const hash = JSON.stringify(response.results);
        if (hash != HASH_STASH) {
            console.log("Notion changes detected");
            exec('node infra/exportNotion.js', (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
                console.error(`stderr: ${stderr}`);
            });
            HASH_STASH = hash;
        }
    } catch (e) {
        console.error(e);
    }
}

process.once('SIGINT', function (code) {
    console.log('SIGINT received...');
    server.close();
  });

async function main() {
    const interval = setInterval( () => {
        checkForChanges();
    }, 5000);

    process.once('SIGINT', function (code) {
        console.log('SIGINT received...');
        clearInterval(interval);
      });
}

main();
