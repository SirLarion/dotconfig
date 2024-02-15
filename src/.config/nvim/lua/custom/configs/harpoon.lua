local harpoon = require("harpoon")

harpoon:setup()

vim.keymap.set("n", "<C-a>", function()
  harpoon:list():append()
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
  local file_paths = {}
  for _, item in ipairs(harpoon_files.items) do
    table.insert(file_paths, item.value)
  end

  require("telescope.pickers")
      .new({}, {
        prompt_title = "Harpoon",
        finder = require("telescope.finders").new_table({
          results = file_paths,
        }),
        previewer = conf.file_previewer({}),
        sorter = conf.generic_sorter({}),
        initial_mode = "normal",
      })
      :find()
end

vim.keymap.set("n", "<C-e>", function()
  toggle_telescope(harpoon:list())
end, { desc = "Open harpoon window" })
