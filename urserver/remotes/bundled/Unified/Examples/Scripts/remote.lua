local script = libs.script;


-- Documentation
-- http://www.unifiedremote.com/api

-- Script Library
-- http://www.unifiedremote.com/api/libs/script


--@help Launch startpage
actions.open_startpage = function ()
	script.default("bash /home/sirlarion/repos/startpage/scripts/startup.sh");
end


--@help Command 2
actions.command2 = function ()
	script.default("echo $PWD");
end


--@help Command 3
actions.command3 = function ()
	script.default("...");
end

