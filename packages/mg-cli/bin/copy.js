const downloadGitRepo = require("download-git-repo");
const ora = require("ora"); // 引入ora

function download(projectTemplate, dest) {
  return new Promise((resolve, reject) => {
    // 定义loading
    const loading = ora("正在下载模版...");
    // 开始loading
    loading.start();
    downloadGitRepo(
      "direct:" + projectTemplate,
      dest,
      { clone: true },
      function (err) {
        if (err) {
          reject(err);
        } else {
          loading.succeed("创建模版成功");
          resolve(true);
        }
      }
    );
  });
}

module.exports = download;
