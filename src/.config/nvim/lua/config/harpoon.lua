local harpoon = require("harpoon")

harpoon:setup()

vim.keymap.set("n", "<C-a>", function()
	harpoon:list():add()
end)

vim.keymap.set("n", "H", function()
	harpoon:list():prev()
end)
vim.keymap.set("n", "L", function()
	harpoon:list():next()
end)

--
-- Basic telescope configuration
--
require("telescope").load_extension("harpoon")

local conf = require("telescope.config").values

local function toggle_telescope(harpoon_files)
	local make_finder = function()
		local file_paths = {}
		for _, item in ipairs(harpoon_files.items) do
			table.insert(file_paths, item.value)
		end

		return require("telescope.finders").new_table({ results = file_paths })
	end

	require("telescope.pickers")
			.new({}, {
				prompt_title = "Harpoon",
				finder = make_finder(),
				previewer = conf.file_previewer({}),
				sorter = conf.generic_sorter({}),
				initial_mode = "normal",
				attach_mappings = function(prompt_buffer_number, map)
					map("n", "d", function()
						local state = require("telescope.actions.state")
						local selected_entry = state.get_selected_entry()
						local current_picker = state.get_current_picker(prompt_buffer_number)

						harpoon:list():removeAt(selected_entry.index)
						current_picker:refresh(make_finder())
					end)

					return true
				end,
			})
			:find()
end

vim.keymap.set("n", "<C-e>", function()
	toggle_telescope(harpoon:list())
end, { desc = "Open harpoon window" })
