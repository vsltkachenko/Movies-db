import { Component, ErrorInfo, PropsWithChildren } from "react"
import { JsxElement } from "typescript"

export class ErrorBoundary extends Component<PropsWithChildren<any>> {
	state: { hasError: boolean }
	
	constructor(props: { children: JsxElement }) {
		super(props)
		this.state = { hasError: false }
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		alert(error)
	}

	static getDerivedStateFromError() {
		return { hasError: true }
	}
	render() {
		if (this.state.hasError) {
			return <h2>Oops something went wrong...</h2>
		}
		return this.props.children
	}
}
