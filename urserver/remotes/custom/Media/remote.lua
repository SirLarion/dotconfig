local mouse = libs.mouse;
local keyboard = libs.keyboard;
local device = libs.device;
local de = "";

events.create = function ()
	-- Try to determine the current DE
	local desktop = os.getenv("XDG_CURRENT_DESKTOP");
	local session = os.getenv("GDMSESSION");
	if (desktop == "Unity") then
		de = "Unity";
	elseif (desktop == "KDE" or utf8.contains(session, "kde")) then
		de = "KDE";
	elseif (desktop == "GNOME") then
		de = "GNOME";
	elseif (desktop == "LXDE") then
		de = "LXDE";
	else
		de = "";
	end
end

dragging = false;
scroll_amount = 0;

actions.scroll = function (id, x, y)
  absy = math.abs(y);
  sign = y / absy;
  scroll_amount = scroll_amount + math.min(math.max(0.25, absy*0.01), 1);
  if(scroll_amount >= 1) then
    mouse.vscroll(sign);
    scroll_amount = scroll_amount -1;
  end
end


actions.tap = function ()
	if (dragging) then
		dragging = false;
		mouse.dragend();
		mouse.up();
	else
		mouse.click("left");
	end
end

actions.double = function ()
	mouse.double("left");
end

actions.hold = function ()
	mouse.down();
	mouse.dragbegin();
	dragging = true;
end

actions.delta = function (id, x, y)
	mouse.moveraw(x, y);
end

actions.left = function ()
	mouse.click("left");
end

actions.right = function ()
	mouse.click("right");
end


--@help Open search in current tab
actions.search = function ()
  keyboard.stroke("control", "L"); 
  device.keyboard();
end

--@help Open new window
actions.new_app = function ()
  keyboard.stroke("control", "N");
  actions.search();
end

--@help Close current window
actions.close_app = function()
	keyboard.stroke("control", "Q");
end

--@help Go to next window
-- NOTE: this only works if "switch application" has been configured to use this keybinding
actions.next_app = function()
	keyboard.stroke("control", "shift", "tab");
end

actions.arrow_left = function()
	keyboard.stroke("left");
end

actions.arrow_right = function()
	keyboard.stroke("right");
end

actions.arrow_up = function()
	keyboard.stroke("up");
end

actions.arrow_down = function()
	keyboard.stroke("down");
end

--@help Force system shutdown
actions.shutdown = function ()
	-- Alternatives for other DEs should be added here...
	if (de == "KDE") then
		os.execute("qdbus org.kde.ksmserver /KSMServer logout 0 2 2");
	else
		os.execute('dbus-send --system --print-reply --dest="org.freedesktop.login1" /org/freedesktop/login1 org.freedesktop.login1.Manager.PowerOff boolean:true');
	end
end

--@help Open up Media Kiosk
actions.launch_kiosk = function ()
	os.start("firefox", "--kiosk", "http://localhost:12345");
end
