local conform = require("conform")

conform.setup({
	formatters_by_ft = {
		lua = { "stylua" },
		javascript = { { "prettierd", "prettier" } },
		javascriptreact = { { "prettierd", "prettier" } },
		typescript = { { "prettierd", "prettier" } },
		typescriptreact = { { "prettierd", "prettier" } },
		css = { { "prettierd", "prettier" } },
		html = { { "prettierd", "prettier" } },
		c = { "clang_format" },
		cpp = { "clang_format" },
		arduino = { "clang_format" },
		bash = { "beautysh" },
	},
	format_on_save = {
		timeout_ms = 200,
		lsp_fallback = true,
	},
})
