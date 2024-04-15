import { MutableRefObject, useEffect, useRef, useState } from "react"

interface Options {
	threshold?: number
	root?: Element
	rootMargin?: string
	onItersect?: () => void
}
type HookReturnType = [MutableRefObject<null>, IntersectionObserverEntry?]

const useIntersectionObserver = (options: Options): HookReturnType => {
	const {
		threshold = 1.0,
		root = null,
		rootMargin = "0px",
		onItersect,
	} = options
	const targetRef = useRef(null)

	const [entry, setEntry] = useState<IntersectionObserverEntry>()

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries: IntersectionObserverEntry[]) => {
				const [entry] = entries
				if (entry.isIntersecting && onItersect) {
					onItersect()
				}
				setEntry(entry)
			},
			{
				threshold,
				root,
				rootMargin,
			}
		)

		if (targetRef.current) {
			observer.observe(targetRef.current)
		}
		return () => {
			targetRef.current && observer.disconnect()
		}
	}, [threshold, root, rootMargin, onItersect])

	return [targetRef, entry]
}

export default useIntersectionObserver
