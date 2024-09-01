local nvimTree = require("nvim-tree")
local api = require("nvim-tree.api")

-- 	cmd = { "NvimTreeToggle", "NvimTreeFocus" },
-- 	opts = {
-- 		filters = {
-- 			dotfiles = false,
-- 		},
-- 		disable_netrw = true,
-- 		hijack_netrw = true,
-- 		hijack_cursor = true,
-- 		hijack_unnamed_buffer_when_opening = false,
-- 		sync_root_with_cwd = true,
-- 		update_focused_file = {
-- 			enable = true,
-- 			update_root = false,
-- 		},
-- 		view = {
-- 			adaptive_size = false,
-- 			side = "left",
-- 			width = 30,
-- 			preserve_window_proportions = true,
-- 		},
-- 		git = {
-- 			enable = false,
-- 			ignore = true,
-- 		},
-- 		filesystem_watchers = {
-- 			enable = true,
-- 		},
-- 		actions = {
-- 			open_file = {
-- 				resize_window = true,
-- 			},
-- 		},
-- 		renderer = {
-- 			root_folder_label = false,
-- 			highlight_git = false,
-- 			highlight_opened_files = "none",
--
-- 			indent_markers = {
-- 				enable = false,
-- 			},
--
-- 			icons = {
-- 				show = {
-- 					file = true,
-- 					folder = true,
-- 					folder_arrow = true,
-- 					git = false,
-- 				},
--
-- 				glyphs = {
-- 					default = "󰈚",
-- 					symlink = "",
-- 					folder = {
-- 						default = "",
-- 						empty = "",
-- 						empty_open = "",
-- 						open = "",
-- 						symlink = "",
-- 						symlink_open = "",
-- 						arrow_open = "",
-- 						arrow_closed = "",
-- 					},
-- 					git = {
-- 						unstaged = "✗",
-- 						staged = "✓",
-- 						unmerged = "",
-- 						renamed = "➜",
-- 						untracked = "★",
-- 						deleted = "",
-- 						ignored = "◌",
-- 					},
-- 				},
-- 			},
-- 		},
-- 	},
-- 	config = function(_, opts)
-- 		dofile(vim.g.base46_cache .. "nvimtree")
-- 		require("nvim-tree").setup(opts)
-- 	end,
-- },
local options = {
	on_attach = function(bufnr)
		api.config.mappings.default_on_attach(bufnr)
		vim.keymap.set("n", "l", api.node.open.edit, { buffer = bufnr })
		vim.keymap.set("n", "H", api.tree.collapse_all, { buffer = bufnr })
		vim.keymap.set("n", "h", api.node.navigate.parent_close, { buffer = bufnr })
	end,
	filters = {
		dotfiles = false,
		exclude = { vim.fn.stdpath("config") .. "/lua/custom" },
	},
	disable_netrw = true,
	hijack_netrw = true,
	hijack_cursor = true,
	hijack_unnamed_buffer_when_opening = false,
	sync_root_with_cwd = true,
	update_focused_file = {
		enable = true,
		update_root = false,
	},
	view = {
		centralize_selection = true,
		adaptive_size = false,
		side = "left",
		width = 30,
		preserve_window_proportions = true,
	},
	git = {
		enable = false,
	},
	filesystem_watchers = {
		enable = true,
	},
	actions = {
		open_file = {
			resize_window = true,
		},
	},
	renderer = {
		indent_width = 1,
		root_folder_label = false,
		highlight_git = false,
		highlight_opened_files = "none",

		indent_markers = {
			enable = false,
		},

		icons = {
			show = {
				file = true,
				folder = true,
				folder_arrow = true,
				git = false,
			},

			glyphs = {
				default = "󰈚",
				symlink = "",
				folder = {
					default = "",
					empty = "",
					empty_open = "",
					open = "",
					symlink = "",
					symlink_open = "",
					arrow_open = "",
					arrow_closed = "",
				},
				git = {
					unstaged = "✗",
					staged = "✓",
					unmerged = "",
					renamed = "➜",
					untracked = "★",
					deleted = "",
					ignored = "◌",
				},
			},
		},
	},
}

nvimTree.setup(options)
