--@type NvPluginSpec[]
local plugins = {
  {
    "christoomey/vim-tmux-navigator",
    lazy = false,
  },
  {
    "jose-elias-alvarez/null-ls.nvim",
    lazy = false,
    config = function ()
      local null_ls = require("null-ls")
      null_ls.setup({
          sources = {
              null_ls.builtins.formatting.stylua,
              null_ls.builtins.diagnostics.eslint,
              null_ls.builtins.completion.spell,
          },
      })
    end
  },
  {
    "LhKipp/nvim-nu",
    ft = "nu",
    config = function()
      require("nu").setup()
      vim.g.nu_auto_format = 1
    end
  },
  {
    "rinx/nvim-ripgrep",
    config = function()
      require("nvim-ripgrep").setup()
    end,
    lazy = false
  },
  {
    "mg979/vim-visual-multi"
  },
  {
    "nvim-tree/nvim-tree.lua",
    opts = {
      filters = { custom = { "^.git$" } }
    }
  },
  {
    "nvim-telescope/telescope.nvim",
    lazy = false,
  },
  {
    "andrewferrier/wrapping.nvim",
    config = function ()
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
}

return plugins
