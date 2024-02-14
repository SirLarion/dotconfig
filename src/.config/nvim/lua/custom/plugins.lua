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
      indent = { enable = true, disable = { "dart" } },
    },
  },
  {
    "nvim-tree/nvim-tree.lua",
    config = function()
      require("custom.configs.nvimtree")
    end,
  },
  {
    "nvim-telescope/telescope.nvim",
    lazy = false,
  },
  {
    "nvim-telescope/telescope-fzy-native.nvim",
    lazy = false,
    config = function()
      require("telescope").load_extension("fzy_native")
    end,
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
        "eslint-lsp"
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
    lazy = false,
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
    "nvimtools/none-ls.nvim",
    config = function()
      local none_ls = require("none-ls")
      none_ls.setup({
        sources = {
          none_ls.builtins.code_actions.eslint_d,
        }
      })
    end,
  }
}

return plugins
