"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  activate: () => activate
});
module.exports = __toCommonJS(src_exports);
var import_path = __toESM(require("path"));
var import_fs = __toESM(require("fs"));
var import_coc = require("coc.nvim");
async function activate(context) {
  const config = import_coc.workspace.getConfiguration().get("coc-nelua", {});
  if (!(config.enable || true))
    return;
  const serverOptions = {
    command: config.neluaBin || "nelua",
    args: ["--add-path", config.serverDir, "--script", `${config.serverDir}/nelua-lsp.lua`]
  };
  const clientOptions = {
    documentSelector: ["nelua"]
  };
  const client = new import_coc.LanguageClient("nelua", "nelua-lsp", serverOptions, clientOptions);
  context.subscriptions.push(
    import_coc.services.registLanguageClient(client),
    import_coc.commands.registerCommand("coc-nelua.version", async () => {
      const rootDir = import_path.default.join(__dirname, "..");
      const { version } = JSON.parse(import_fs.default.readFileSync(import_path.default.resolve(rootDir, "package.json"), "utf-8"));
      import_coc.window.showMessage(
        `
Version: ${version}
Node: ${process.versions.node}`,
        "more"
      );
    })
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate
});
