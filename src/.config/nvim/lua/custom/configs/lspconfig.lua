local on_attach = require("plugins.configs.lspconfig").on_attach
local capabilities = require("plugins.configs.lspconfig").capabilities

local lspconfig = require("lspconfig")

local servers = {
	"cssls",
	"rust_analyzer",
	"texlab",
	"html",
	"clangd",
	"lemminx",
	"arduino_language_server",
	"jsonls",
	"taplo",
	"kotlin_language_server",
	"jdtls",
}

local utils = require("core.utils")
local on_init = function(client)
	if not utils.load_config().ui.lsp_semantic_tokens and client.supports_method("textDocument/semanticTokens") then
		client.server_capabilities.semanticTokensProvider = nil
	end
end

for _, lsp in ipairs(servers) do
	lspconfig[lsp].setup({
		on_attach = on_attach,
		on_init = on_init,
		capabilities = capabilities,
	})
end

-- Fix for multiple definitions in React when using gd
-- https://github.com/typescript-language-server/typescript-language-server/issues/216
local function filter(arr, fn)
	if type(arr) ~= "table" then
		return arr
	end

	local filtered = {}
	for k, v in pairs(arr) do
		if fn(v, k, arr) then
			table.insert(filtered, v)
		end
	end

	return filtered
end

local function filterDts(value)
	local uri = value.uri ~= nil and value.uri or value.targetUri
	if uri == nil then
		uri = value.filename ~= nil and value.filename or ""
	end
	return string.match(uri, "%.d.ts") == nil
end

lspconfig.tsserver.setup({
	on_attach = on_attach,
	on_init = on_init,
	capabilities = capabilities,
	init_options = {
		preferences = {
			disableSuggestions = true,
		},
	},
	handlers = {
		["textDocument/definition"] = function(err, result, method, ...)
			if vim.tbl_islist(result) and #result > 1 then
				local filtered_result = filter(result, filterDts)
				return vim.lsp.handlers["textDocument/definition"](err, filtered_result, method, ...)
			end

			vim.lsp.handlers["textDocument/definition"](err, result, method, ...)
		end,
	},
})

vim.lsp.handlers["textDocument/references"] = function()
	require("telescope.builtin").lsp_references({
		initial_mode = "normal",
	})
end
