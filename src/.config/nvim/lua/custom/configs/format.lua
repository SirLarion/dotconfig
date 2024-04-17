local conform = require("conform")

conform.setup({
	formatters_by_ft = {
		lua = { "stylua" },
		javascript = { "prettierd" },
		javascriptreact = { "prettierd" },
		typescript = { "prettierd" },
		typescriptreact = { "prettierd" },
		json = { "prettierd" },
		css = { "prettierd" },
		html = { "prettierd" },
		c = { "clang_format" },
		cpp = { "clang_format" },
		arduino = { "clang_format" },
		bash = { "beautysh" },
		xml = { "xmlformat" },
		opml = { "xmlformat" },
		rs = { "rustfmt" },
		kotlin = { "ktlint" },
	},
	format_on_save = {
		timeout_ms = 200,
		lsp_fallback = true,
	},
})
