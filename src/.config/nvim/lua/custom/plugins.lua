--@type NvPluginSpec[]
local plugins = {
	{
		"christoomey/vim-tmux-navigator",
		lazy = false,
	},
	{
		"jose-elias-alvarez/null-ls.nvim",
		lazy = false,
		config = function()
			require("custom.configs.null-ls")
		end,
	},
	{
		"LhKipp/nvim-nu",
		ft = "nu",
		config = function()
			require("nu").setup()
			vim.g.nu_auto_format = 1
		end,
	},
	{
		"rinx/nvim-ripgrep",
		config = function()
			require("nvim-ripgrep").setup()
		end,
		lazy = false,
	},
	{
		"mg979/vim-visual-multi",
		init = function()
			vim.g.VM_maps = {
				["Find Under"] = "<C-d>",
				["Find Subword Under"] = "<C-d>",
			}
		end,
		lazy = false,
	},
	{
		"nvim-tree/nvim-tree.lua",
		opts = {
			filters = { custom = { "^.git$" } },
		},
	},
	{
		"nvim-telescope/telescope.nvim",
		lazy = false,
	},
	{
		"andrewferrier/wrapping.nvim",
		config = function()
			require("wrapping").setup({
				create_keymaps = false,
				auto_set_mode_filetype_allowlist = {
					"latex",
					"markdown",
					"tex",
				},
			})
		end,
	},
	{
		"neovim/nvim-lspconfig",
		config = function()
			require("plugins.configs.lspconfig")
			require("custom.configs.lspconfig")
		end,
	},
	{
		"windwp/nvim-ts-autotag",
		config = function()
			require("nvim-ts-autotag").setup()
		end,
		lazy = false,
	},
}

return plugins