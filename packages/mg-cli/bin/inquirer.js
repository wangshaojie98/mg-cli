const inquirer = require('inquirer');
const templates = require('./templates');
const fs = require('fs-extra')
const path = require("path")

function inquirerPrompt(argv) {
  return new Promise(async (resolve, reject) => {
    try {
      let { name, type } = argv;
      if (!name) {
        const answer = await inquirer.prompt({
          type: 'input',
          name: 'name',
          message: '项目名称',
          default: name,
          validate: function (val) {
            if (!/^[a-zA-Z_-]+$/.test(val)) {
              return "模板名称只能含有英文，下划线或中划线";
            }
            return true;
          },
        })
        name = answer.name
      }

      if (!type) {
        const answer = await inquirer.prompt([
          {
            type: 'list',
            name: 'type',
            message: '模板类型',
            choices: templates.map(it => it.name),
            filter: function (value) {
              return templates.find(it => it.name === value);
            },
          }
        ])
        type = answer.type.value;
      }

      // 获取目标文件夹路径
      const dest = path.join(process.cwd(), name)
      // 判断文件夹是否存在，存在就交互询问用户是否覆盖
      if(fs.existsSync(dest)) {
        const { force } = await inquirer.prompt({
          type: 'confirm',
          name: 'force',
          message: '目录已存在，是否覆盖？'
        })
        // 如果覆盖就删除文件夹继续往下执行，否的话就退出进程
        force ? fs.removeSync(dest) : process.exit(1)
      }

      resolve({ name, type, dest })
    } catch (error) {
     reject(error) 
    }
  })

}

exports.inquirerPrompt = inquirerPrompt;
