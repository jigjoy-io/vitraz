export abstract class KeyCommand {
	protected context: KeyHandlerContext

	constructor(context: KeyHandlerContext) {
		this.context = context
	}

	abstract execute(): void
}
