import { ApiProperty } from '@nestjs/swagger';
export class CreateMovieDto {
	@ApiProperty({ type: String, description: 'id' })
	readonly id: string
	@ApiProperty({ type: String, description: 'title' })
	readonly title: string
	@ApiProperty({ type: Number, description: 'year' })
	readonly year: number
	@ApiProperty({ type: Array, description: 'genres' })
	readonly genres: string[]
	@ApiProperty({ type: Array, description: 'ratings' })
	readonly ratings: number[]
	@ApiProperty({ type: String, description: 'poster' })
	readonly poster: string
	@ApiProperty({ type: String, description: 'contentRating' })
	readonly contentRating: string
	@ApiProperty({ type: String, description: 'duration' })
	readonly duration: string
	@ApiProperty({ type: String, description: 'releaseDate' })
	readonly releaseDate: string
	@ApiProperty({ type: Number, description: 'averageRating' })
	readonly averageRating: number
	@ApiProperty({ type: String, description: 'originalTitle' })
	readonly originalTitle: string
	@ApiProperty({ type: String, description: 'storyline' })
	readonly storyline: string
	@ApiProperty({ type: Array, description: 'actors' })
	readonly actors: string[]
	@ApiProperty({ type: String, description: 'imdbRating' })
	readonly imdbRating: string
	@ApiProperty({ type: String, description: 'posterurl' })
	readonly posterurl: string	
}