const async = require('async')
const readline = require('readline')
const fs = require('fs')
const src = require('./src.js')
const inquirer = require('inquirer')
const _ = require('underscore')
const monitor = require('active-window')
ndaq = []
function timeoutSet (x, y) {
	setTimeout(y, x)
}
index = 3
// cb = function (window) {
// 	if (window.title !== null) {
// 		title = window.title;
// 	}
// }
// monitor.getActiveWindow(cb)

ask_next = function() {
  q = {
    "type":"list",
    "message":"Next Ticker:",
    "name":"ticker",
    "choices": function() {
				return ndaq
			},
    "default":ndaq[index+1]
  }
  inquirer.prompt([q]).then(function (answers) {
		console.log(answers);
    index = _.indexOf(ndaq, answers.ticker)
		console.log(ndaq);
		console.log(index);
    src.app_activate('Fidelity Active Trader Pro')
    timeoutSet(200, function() {
      src.send_keys('{BS}{BS}{BS}{BS}{BS}{DEL}{DEL}{DEL}{DEL}' + ndaq[index] + '{ENTER}')
      timeoutSet(200, function() {
				_title = "cmd - node external_operation.js"
				src.app_activate("Command Prompt")
				src.send_keys('')
				// src.nir_activate_window("activate", _title)
				// src.nir_activate_window("settopmost", _title)
				// src.nir_activate_window("dlgsetfocus", _title);
				// src.nir_activate_window("hideshow", _title)
				// src.nir_activate_window("disable", _title)
				// src.nir_activate_window("enable", _title)
				// src.nir_activate_window("focus", _title)
				// src.nir_activate_window("settopmost", _title)
				// src.nir_activate_window("activate", _title)
        timeoutSet(200, function(){
          ask_next()
        })
      })
    })
  })
}

main = function() {
	console.log('Opening: ' + process.argv[2]);
  var lineReader = readline.createInterface({
    input:fs.createReadStream(process.argv[2])
  })

  lineReader.on('line', function(line) {
    ticker = line.split("|")[0]
    ndaq.push(ticker)
  })

  lineReader.on('close', function() {
    // ndaq.shift()
    ask_next()
  })
}

if(!module.parent)
  main()
