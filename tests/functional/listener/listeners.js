var Table = require('cli-table');
const fs = require('fs');
var tableify = require('tableify');


module.exports = [{
  type: 'master:end',
  listener: function (context, _instances) {
    let output = formatSummary(_instances);
    let jsonTable = []
    let tabl = new Table({
      head: ['tags', 'pass', 'fail', 'total']
    });
    jsonTable.push(['tags', 'pass', 'fail', 'total'])
    output.instances.forEach(function (instance) {
      let tags = '';
      Object.keys(instance.tags).forEach(function (key) {
        if (key === 'reportFile') {          
          tags = `<a href='${context.config._store.data.ReportURL}${instance.tags[key]}'>${key}: ${instance.tags[key]}<\a>\n`;
        }
      });
      //tabl.push([tags, instance.summary.pass, instance.summary.fail, instance.summary.total]);
      if(instance.summary.total > 0){
        jsonTable.push([tags, instance.summary.pass, instance.summary.fail, instance.summary.total])
      }      
    });
    //tabl.push(['TOTALS', output.totals.pass, output.totals.fail, output.totals.total]);
    jsonTable.push(['TOTALS', output.totals.pass, output.totals.fail, output.totals.total])
    logToFile(jsonTable);
  }
}];

async function logToFile(tabl){
  var html = tableify(tabl)
  await fs.writeFile('tests/functional/output/emailReport.html', html, (err) => {  
      // throws an error, you could also catch it here
      if (err) throw err;    
      // success case, the file was saved
      console.log('emailReport saved!');
  });
   
}

function formatSummary(_instances) {
  let instances = _instances.map(instance => Object.assign({}, instance));
  let totals = {total: 0, pass: 0, fail: 0};
  instances.forEach(instance => {
    let instanceSummary = {total: 0, pass: 0, fail: 0};
    instance.testResults.forEach(test => {
      instanceSummary.total = instanceSummary.total + 1;
      instanceSummary.pass = (test.state === 'passed') ? instanceSummary.pass + 1 : instanceSummary.pass;
      instanceSummary.fail = (test.state === 'failed') ? instanceSummary.fail + 1 : instanceSummary.fail;
    });
    instance.summary = instanceSummary;
    totals.total = totals.total + instanceSummary.total;
    totals.pass = totals.pass + instanceSummary.pass;
    totals.fail = totals.fail + instanceSummary.fail;
  });
  // slim this down for summary purposes
  instances.forEach(instance => delete instance.testResults);
  return {totals, instances};
};