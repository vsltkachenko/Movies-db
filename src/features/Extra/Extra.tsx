import { Container, Grid, LinearProgress } from "@mui/material"
import { useState } from "react"
import { EpisodesQuery, useGetEpisodesQuery } from "../../services/rickandmorty"
import EpisodeCard from "./EpisodeCard"
import Pager from "./Pager"

const defaultQuery = { page: 1 }

const Extra = () => {
	const [query, setQuery] = useState<EpisodesQuery>(defaultQuery)
	const { data, isFetching } = useGetEpisodesQuery(query)

	const isNextPage = data && data.results.length !== 20 ? false : true

	return (
		<Container sx={{ py: 3 }} maxWidth="xl">
			<Pager
				current={query.page}
				onNext={() => isNextPage && setQuery(q => ({ ...q, page: q.page + 1 }))}
				onPrev={() =>
					query.page > 1 && setQuery(q => ({ ...q, page: q.page - 1 }))
				}
				isNextPage={isNextPage}
			/>
			{isFetching && <LinearProgress sx={{ mb: 2 }} />}
			<Grid container spacing={2}>
				{data?.results.map(e => (
					<Grid item key={e.episode} xs={12} sm={6} md={4} lg={3}>
						<EpisodeCard
							name={e.name}
							episode={e.episode}
							airDate={e.air_date}
							characters={e.characters}
						/>
					</Grid>
				))}
			</Grid>
		</Container>
	)
}

export default Extra
