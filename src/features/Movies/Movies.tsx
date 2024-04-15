import MovieCard from "./MovieCard"

import { Container, Grid, LinearProgress, Typography } from "@mui/material"
import { Suspense, lazy, useCallback, useContext, useState } from "react"
import { AuthContext, anonymousUser } from "../../AuthContext"
import useIntersectionObserver from "../../hooks/useIntersectionObserver"
import {
	MoviesFilters,
	MoviesQuery,
	useGetConfigurationQuery,
	useGetMoviesQuery,
} from "../../services/tmdb"

const MoviesFilter = lazy(() => import("./MoviesFilter"))

const initialQuery = {
	page: 1,
	filters: {},
}

function Movies() {
	const [query, setQuery] = useState<MoviesQuery>(initialQuery)

	const { data: configuration } = useGetConfigurationQuery()
	const { data, isFetching } = useGetMoviesQuery(query)

	const movies = data?.results ?? []
	const hasMorePages = data?.hasMorePages

	const formatImageUrl = (path?: string) => {
		return path && configuration
			? `${configuration?.images.base_url}w780${path}`
			: undefined
	}

	const { user } = useContext(AuthContext)
	const loggedIn = user !== anonymousUser

	const onItersect = useCallback(() => {
		if (hasMorePages) {
			setQuery(prev => ({ ...prev, page: prev.page + 1 }))
		}
	}, [hasMorePages])

	const [targetRef, entry] = useIntersectionObserver({ onItersect })

	const handleAddToFavorite = useCallback(
		(id: number) => {
			alert(
				`Not implemented! Action: ${user.name} is adding movie ${id} to favorites`
			)
		},
		[user.name]
	)

	return (
		<Grid container spacing={2} sx={{ flexWrap: "nowrap" }}>
			<Grid item xs={"auto"}>
				<Suspense fallback={<span>Loading filters...</span>}>
					<MoviesFilter
						onApply={filters => {
							const moviesFilters: MoviesFilters = {
								keywords: filters.keywords.map(k => k.id),
								genres: filters.genres,
							}
							setQuery({
								page: 1,
								filters: moviesFilters,
							})
						}}
					/>
				</Suspense>
			</Grid>
			<Grid item xs={12}>
				<Container sx={{ py: 8 }} maxWidth="lg">
					{!isFetching && !movies.length && (
						<Typography variant="h6">
							No movies were found that match your query
						</Typography>
					)}
					<Grid container spacing={3}>
						{movies.map((m, index) => (
							<Grid item key={`${m.id}-${index}`} xs={12} sm={6} md={4}>
								<MovieCard
									id={m.id}
									title={m.title}
									overview={m.overview}
									popularity={m.popularity}
									image={formatImageUrl(m.backdrop_path)}
									enableUserActions={loggedIn}
									onAddFavorite={handleAddToFavorite}
								/>
							</Grid>
						))}
					</Grid>
					<div ref={targetRef} className="">
						{isFetching && <LinearProgress color="secondary" sx={{ mt: 3 }} />}
					</div>
				</Container>
			</Grid>
		</Grid>
	)
}
// const mapStateToProps = (state: RootState) => ({
// 	movies: state.movies.top,
// 	loading: state.movies.loading,
// 	hasMorePages: state.movies.hasMorePages,
// })
// const connector = connect(mapStateToProps)

// export default connector(Movies)

export default Movies
