local lint = require("lint")

lint.linters_by_ft = {
	typescript = { "eslint_d" },
	json = { "jsonlint" },
	markdown = { "vale" },
	python = { "ruff" },
}

vim.api.nvim_create_autocmd({ "BufWritePost" }, {
	callback = function()
		lint.try_lint()
	end,
})
