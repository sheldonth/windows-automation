set WshShell = WScript.CreateObject("WScript.Shell")
WshShell.Run "calc"
WScript.Sleep 100
WshShell.AppActivate "Calculator"
WScript.Sleep 100
WshShell.SendKeys "1{+}"
WScript.Sleep 500
WshShell.SendKeys "2"
WScript.Sleep 500
WshShell.SendKeys "~"
WScript.Sleep 500
WshShell.SendKeys "*3"
WScript.Sleep 500
WshShell.SendKeys "~"
WScript.Sleep 2500
