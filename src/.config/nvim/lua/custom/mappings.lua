local M = {}

M.general = {
	n = {
		["<C-X>"] = { ":Lazy home <CR>" },
		["<A-h>"] = { "<C-w>h" },
		["<A-l>"] = { "<C-w>l" },
		["<A-j>"] = { "ddp" },
		["<A-k>"] = { "ddkP" },
		["J"] = { "10j" },
		["K"] = { "10k" },
		["<C-g>"] = { ":b# <CR>" },

		["<F5>"] = { "<cmd> ! ./deploy<CR>" },
		["+"] = { "<cmd> vertical res +5<CR>" },
		["-"] = { "<cmd> vertical res -5<CR>" },
	},

	i = {
		["jj"] = { "<Esc><Esc>" },
	},

	v = {
		["J"] = { "10j" },
		["K"] = { "10k" },
	},
}

M.telescope = {
	plugin = true,

	n = {
		["<C-p>"] = { ":Telescope find_files find_command=rg,--ignore,--hidden,--files prompt_prefix=🔍 <CR>" },
		["<C-o>"] = { ":Telescope oldfiles <CR>" },
		["F"] = { ":Telescope live_grep find_command=rg prompt_prefix=🔍 <CR>" },
		["U"] = { ":Telescope undo initial_mode=normal <CR>" },
	},
}

M.comment = {
	plugin = true,

	-- toggle comment in both modes
	n = {
		["<leader>7"] = {
			function()
				require("Comment.api").toggle.linewise.current()
			end,
			"Toggle comment",
		},
	},

	v = {
		["<leader>7"] = {
			"<ESC><cmd>lua require('Comment.api').toggle.linewise(vim.fn.visualmode())<CR>",
			"Toggle comment",
		},
	},
}

return M
