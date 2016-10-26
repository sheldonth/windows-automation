set WshShell = WScript.CreateObject("WScript.Shell")
'WshShell.Run "calc"
WScript.Sleep 4000
WshShell.SendKeys "TSLA{ENTER}"
