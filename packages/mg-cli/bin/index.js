#!/usr/bin/env node
const yargs = require('yargs');
const {inquirerPrompt} = require('./inquirer')
const download = require('./copy')
// 1. 生成一个模板的子命令，create
yargs.command(
  ['create', 'c'],
  '新建一个模板',
  // function(yargs) {
  //   return yargs.option('name', {
  //     alias: 'n',
  //     demandOption: false,
  //     describe: '模板名称',
  //     type: 'string'
  //   })
  // },
  function(argv) {
    inquirerPrompt(argv).then(async answers => {
      console.log('answers: ', answers);
      const isDone = await download(answers.type, answers.dest)
      if (isDone) {
        console.log('创建模板成功');
        console.log(`\ncd ${answers.name}`);
        console.log('npm i');
        console.log('npm run dev');
      }
    })

  }
).argv;