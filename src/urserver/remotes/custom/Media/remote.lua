local mouse = libs.mouse
local keyboard = libs.keyboard

dragging = false
scroll_amount = 0

actions.scroll = function(id, x, y)
	absy = math.abs(y)
	sign = y / absy
	scroll_amount = scroll_amount + math.min(math.max(0.25, absy * 0.01), 1)
	if scroll_amount >= 1 then
		mouse.vscroll(sign)
		scroll_amount = scroll_amount - 1
	end
end

actions.tap = function()
	if dragging then
		dragging = false
		mouse.dragend()
		mouse.up()
	else
		mouse.click("left")
	end
end

actions.double = function()
	mouse.double("left")
end

actions.hold = function()
	mouse.down()
	mouse.dragbegin()
	dragging = true
end

actions.delta = function(id, x, y)
	mouse.moveraw(x, y)
end

actions.left = function()
	mouse.down()
	mouse.up()
end

actions.right = function()
	mouse.click("right")
end

--@help Open search in current tab
actions.search = function()
	keyboard.stroke("control", "L")
end

--@help Open new window
actions.new_app = function()
	keyboard.stroke("control", "N")
	actions.search()
end

--@help Close current window
actions.close_app = function()
	keyboard.stroke("control", "Q")
end

--@help Go to next window
-- NOTE: this only works if "switch application" has been configured to use this keybinding
actions.next_app = function()
	keyboard.stroke("control", "shift", "tab")
end

actions.arrow_left = function()
	keyboard.stroke("left")
end

actions.arrow_right = function()
	keyboard.stroke("right")
end

actions.arrow_up = function()
	keyboard.stroke("up")
end

actions.arrow_down = function()
	keyboard.stroke("down")
end

--@help Force system shutdown
actions.shutdown = function()
	os.execute(
		'dbus-send --system --print-reply --dest="org.freedesktop.login1" /org/freedesktop/login1 org.freedesktop.login1.Manager.PowerOff boolean:true'
	)
end

--@help Open up Media Kiosk
actions.launch_kiosk = function()
	os.start("firefox", "--kiosk", "http://localhost:12345")
end
