const spawn = require('child_process').spawn
const execFile = require('child_process').execFile
const assert = require('assert')
const path = require('path')
const fs = require('fs')
const async = require('async')
const child_process = require('child_process')
const symbols = ["AAPL", "FB", "TSLA"]
const window_title = 'Chart'
function main() {
	app_activate(window_title)
	timeoutSet(1000, () => {
		nir_activate_window("activate", "Command Prompt")
		// async.forEachSeries(symbols, get_ticker_image, () => {
		// 	console.log('Done!')
		// })
	})
}

function autoit_script (script_string) {
	const autoit = child_process.exec(script_string)
}

function nir_activate_window (window_action, window_title) {
	const nir_path = path.join(__dirname + '/nircmd/nircmd.exe win ' + window_action + ' title \"' + window_title + '\"' + ' 1')
	console.log(nir_path);
	const nir = child_process.exec(nir_path)
	nir.on('exit', (result) => {
		assert.equal(result, 0)
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

function app_activate (app_name_string) {
	const eol = '\r\n'
	const file_string = [
		'set WshShell = WScript.CreateObject("WScript.Shell")',
		('WshShell.AppActivate "' + app_name_string + '"')
	].join(eol) + eol
	const file_data = new Buffer(file_string, 'utf8')
	const vbscriptPath = path.join(__dirname, 'temp1.vbs')
	fs.writeFileSync(vbscriptPath, file_data)

	spawn('wscript.exe', [vbscriptPath])
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
	get_ticker_image,
	app_activate,
	nir_activate_window
}
