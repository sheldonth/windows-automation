const spawn = require('child_process').spawn
const assert = require('assert')
const path = require('path')
const fs = require('fs')
const async = require('async')

const symbols = ["AAPL", "FB", "TSLA"]

function main() {
	timeoutSet(4000, () => {
		async.forEachSeries(symbols, get_ticker_image, () => {
			console.log('Done!')
		})
	})
}

function get_ticker_image (symbol, callback) {
	const filename = Date.now() + '.png'
	send_keys(symbol + '{ENTER}')
	timeoutSet(3000, () => {
		take_screenshot(filename)
		timeoutSet(3000, () => {
			// TODO upload screenshot, symbol
			// TODO delete screenshot
			callback(null)
		})
	})
}

function take_screenshot (filename) {
	const bat = spawn('cmd.exe', ['/c', 'screenCapture.bat', filename]);
	bat.on('exit', (result) => {
		assert.equal(result, 0)
		console.log("Screenshot taken")
	})
}


function send_keys (sendkeysCode) {
	const eol = '\r\n'
	const file_string = [
		'set WshShell = WScript.CreateObject("WScript.Shell")',
		('WshShell.SendKeys "' + sendkeysCode + '"')
	].join(eol) + eol
	const file_data = new Buffer(file_string, 'utf8')

	const vbscriptPath = path.join(__dirname, 'temp.vbs')
	fs.writeFileSync(vbscriptPath, file_data)

	spawn('wscript.exe', [vbscriptPath])
}

function timeoutSet (x, y) {
	setTimeout(y, x)
}

if (!module.parent)
	main()
	
module.exports = {
	send_keys,
	take_screenshot,
	get_ticker_image
}
