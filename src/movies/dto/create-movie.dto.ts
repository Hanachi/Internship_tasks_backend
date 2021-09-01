export class CreateMovieDto {
	readonly title: string
	readonly year: number
	readonly cast: string[]
	readonly genres: string[]
}