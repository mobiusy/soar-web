const exec = require('child_process').exec;

// let sql = `select dim.name,count(1) num
// from basic_company_info company inner join basic_dim_industry dim on substr(company.domain, 2, 2) = dim.industry_id
// where projectCode = '1'
// group by dim.name`

function soar(sql) {
    const cmd = `echo "${sql}" | ./soar -report-type html`;
    // const cmd = `./soar -list-report-types `
    return new Promise((resolve, reject) => {
        exec(cmd, function(error, stdout) {
          // 获取命令执行的输出
          if (error) {
              reject(error);
          } else {
              resolve(stdout);
          }
        });
    })
}

// soar(sql).then(result => console.log(result))

module.exports = soar;