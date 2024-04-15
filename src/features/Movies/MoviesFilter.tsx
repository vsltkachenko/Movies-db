import { FilterAltOutlined } from "@mui/icons-material"
import {
	Autocomplete,
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel,
	Paper,
	Skeleton,
	TextField,
	debounce,
} from "@mui/material"
import { useCallback, useState } from "react"
import { Controller, useForm } from "react-hook-form"
// import { KeywordItem } from "../../api/tmdb"
import {
	KeywordItem,
	useGetGenresQuery,
	useGetKeywordsQuery,
} from "../../services/tmdb"

export interface Filters {
	keywords: KeywordItem[]
	genres: number[]
}
interface MoviesFilterProps {
	onApply: (filters: Filters) => void
}

const MoviesFilter = ({ onApply }: MoviesFilterProps) => {
	const [keywordsQuery, setKeywordsQuery] = useState<string>("")

	const { data: keywordsOptions = [], isLoading: keywordsLoading } =
		useGetKeywordsQuery(keywordsQuery, { skip: !keywordsQuery })

	const { data: genres = [], isLoading: genresLoading } = useGetGenresQuery()

	const { handleSubmit, control } = useForm<Filters>({
		defaultValues: {
			keywords: [],
			genres: [],
		},
	})

	const fetchKeywords = useCallback(
		debounce((query: string) => {
			setKeywordsQuery(query)
		}, 1000),
		[]
	)

	return (
		<Paper sx={{ m: 2, p: 0.5, maxWidth: 350 }}>
			<form onSubmit={handleSubmit(onApply)}>
				<FormControl
					component="fieldset"
					variant="standard"
					sx={{ m: 2, display: "block" }}
				>
					<Controller
						name="keywords"
						control={control}
						render={({ field: { onChange, value } }) => (
							<Autocomplete
								multiple={true}
								disablePortal
								loading={keywordsLoading}
								loadingText={<span>Loading...</span>}
								options={keywordsOptions}
								filterOptions={x => x}
								getOptionLabel={option => option.name}
								value={value}
								onChange={(_, value) => onChange(value)}
								isOptionEqualToValue={(option, value) => option.id === value.id}
								renderInput={params => (
									<TextField {...params} label="Keywords" />
								)}
								onInputChange={(_, value) => fetchKeywords(value)}
							/>
						)}
					/>
				</FormControl>

				<FormControl
					variant="standard"
					sx={{ m: 2, display: "block" }}
					component="fieldset"
				>
					{genresLoading ? (
						<Skeleton width={300} height={480} />
					) : (
						<>
							<FormLabel component="legend">Genres</FormLabel>
							<FormGroup sx={{ maxHeight: 500 }}>
								<Controller
									name="genres"
									control={control}
									render={({ field }) => (
										<>
											{genres.map(genre => (
												<FormControlLabel
													key={genre.id}
													control={
														<Checkbox
															value={genre.id}
															checked={field.value.includes(genre.id)}
															onChange={(event, checked) => {
																const valueNumber = Number(event.target.value)
																if (checked) {
																	field.onChange([...field.value, valueNumber])
																} else {
																	field.onChange(
																		field.value.filter(
																			value => value !== valueNumber
																		)
																	)
																}
															}}
														/>
													}
													label={genre.name}
												/>
											))}
										</>
									)}
								/>
							</FormGroup>
						</>
					)}
				</FormControl>
				<Button
					type="submit"
					variant="contained"
					startIcon={<FilterAltOutlined />}
					sx={{ m: 2 }}
				>
					Apply filter
				</Button>
			</form>
		</Paper>
	)
}

export default MoviesFilter
