--@type NvPluginSpec[]
local plugins = {
	{
		"stevearc/conform.nvim",
		lazy = false,
		config = function()
			require("custom.configs.format")
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
				["Run Normal"] = "jj",
			}
		end,
		lazy = false,
	},
	{
		"nvim-treesitter/nvim-treesitter",
		opts = {
			indent = { enable = true },
		},
	},
	{
		"nvim-tree/nvim-tree.lua",
		config = function()
			require("custom.configs.nvimtree")
		end,
	},
	{
		"nvim-telescope/telescope-fzy-native.nvim",
		config = function()
			require("telescope").load_extension("fzy_native")
		end,
	},
	{
		"debugloop/telescope-undo.nvim",
		config = function()
			require("telescope").load_extension("undo")
		end,
	},
	{
		"nvim-telescope/telescope-ui-select.nvim",
		config = function()
			require("telescope").load_extension("ui-select")
		end,
		lazy = false,
	},
	{
		"nvim-telescope/telescope.nvim",
		dependencies = {
			"nvim-lua/plenary.nvim",
			"debugloop/telescope-undo.nvim",
			"nvim-telescope/telescope-fzy-native.nvim",
			"nvim-telescope/telescope-ui-select.nvim",
		},
		opts = (function()
			local actions = require("telescope.actions")
			return {
				defaults = {
					mappings = {
						n = {
							["l"] = actions.file_edit,
						},
						i = {
							["<C-u>"] = false,
						},
					},
				},
				extensions = {
					["ui-select"] = {
						require("telescope.themes").get_dropdown({ initial_mode = "normal" }),
					},
				},
			}
		end)(),
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
		"williamboman/mason.nvim",
		opts = {
			ensure_installed = {
				"typescript-language-server",
				"rust-analyzer",
				"eslint-lsp",
			},
		},
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
		ft = { "javascriptreact", "typescriptreact", "html" },
	},
	{
		"ThePrimeagen/harpoon",
		branch = "harpoon2",
		config = function()
			require("custom.configs.harpoon")
		end,
		dependencies = { "nvim-lua/plenary.nvim" },
		lazy = false,
	},
	{
		"lewis6991/gitsigns.nvim",
		opts = {
			current_line_blame = true,
		},
	},
	{
		"mfussenegger/nvim-jdtls",
		config = function()
			require("custom.configs.jdtls")
		end,
	},
}

return plugins
