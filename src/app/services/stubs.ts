class RouterStub {
	public navigate(): void {}
}

class ActivatedRouteStub {
	public snapshot = {
		params: {
			id: '',
		},
	};
}

export {
	RouterStub,
	ActivatedRouteStub,
}
