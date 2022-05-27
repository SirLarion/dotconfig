local mouse = libs.mouse;
local keyboard = libs.keyboard;

dragging = false;


function update (r)
	--server.update({id = "touch", text = r });
end

actions.down = function ()
	update("down");
end

actions.up = function ()
	update("up");
end

actions.tap = function ()
	update("tap");
	if (dragging) then
		dragging = false;
		mouse.dragend();
		mouse.up();
	else
		mouse.click("left");
	end
end

actions.double = function ()
	update("double");
	mouse.double("left");
end

actions.hold = function ()
	update("hold");
	mouse.down();
	mouse.dragbegin();
	dragging = true;
end

actions.delta = function  (id, x, y)
	update("delta: " .. x .. " " .. y);
	mouse.moveraw(x, y);
end

actions.left = function ()
	mouse.click("left");
end

actions.right = function ()
	mouse.click("right");
end




--@help Close current tab
actions.close_tab = function()
	keyboard.stroke("control", "W");
end

--@help Go to next tab
actions.next_tab = function()
	keyboard.stroke("lctrl", "pagedown");
end

--@help Go to previous tab
actions.previous_tab = function()
	keyboard.stroke("lctrl", "pageup");
end

--@help Open up Media Kiosk
actions.launch_kiosk = function ()
	os.start("firefox", "--kiosk", "http://localhost:5000");
end
