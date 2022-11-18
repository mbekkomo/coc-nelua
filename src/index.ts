import path from 'path';
import fs from 'fs';
import { commands, CompleteResult, ExtensionContext, LanguageClient, LanguageClientOptions, ServerOptions, services, sources, window, workspace } from 'coc.nvim';

interface NeluaConfig {
	enable: boolean
	neluaBin: string
	serverDir: string
}

export async function activate(context: ExtensionContext): Promise<void> {
	const config = workspace.getConfiguration().get('nelua',{}) as NeluaConfig
	if ( ! config.enable ) return;

	const serverOptions: ServerOptions = {
		command: (config.neluaBin || 'nelua'),
		args: ['--add-path',config.serverDir,'--script',`${config.serverDir}/nelua-lsp.lua`]
	};

	const clientOptions: LanguageClientOptions = {
		documentSelector: ['nelua']
	};

	const client = new LanguageClient('nelua','nelua-lsp',serverOptions,clientOptions);

	context.subscriptions.push(
		services.registLanguageClient(client),
		commands.registerCommand('coc-nelua.version', async () => {
			const rootDir = path.join(__dirname,'..');
			const { version } = JSON.parse(fs.readFileSync(path.resolve(rootDir,'package.json'),'utf-8'));

			window.showMessage(
`Version: ${version}
Node: ${process.versions.node}`,'more')
		})
	);
}
