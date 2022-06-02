local mouse = libs.mouse;
local keyboard = libs.keyboard;
local device = libs.device;

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

--@help Open new tab
actions.new_tab = function ()
  keyboard.stroke("control", "T");
  actions.search();
end

--@help Close current tab
actions.close_tab = function()
	keyboard.stroke("control", "W");
end

--@help Go to next tab
actions.next_tab = function()
	keyboard.stroke("lctrl", "pagedown");
  device.keyboard();
end

--@help Go to previous tab
actions.previous_tab = function()
	keyboard.stroke("lctrl", "pageup");
end

--@help Open up Media Kiosk
actions.launch_kiosk = function ()
  os.start("node", "/home/sirlarion/repos/startpage/backend/index.js");
	os.start("firefox", "--kiosk", "http://localhost:5000");
end
