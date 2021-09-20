import { ApiProperty } from '@nestjs/swagger';
export class UpdateMovieDto {
	@ApiProperty({ type: String, description: 'title' })
	readonly title: string
	@ApiProperty({ type: Number, description: 'year' })
	readonly year: string
	@ApiProperty({ type: String, description: 'imdbRating' })
	readonly imdbRating: string
	@ApiProperty({ type: String, description: 'contentRating' })
	readonly contentRating: string
	@ApiProperty({ type: [Number], description: 'usersRating' })
	readonly usersRating: number[]
	@ApiProperty({ type: [String], description: 'genres' })
	readonly genres: string[]
	@ApiProperty({ type: [String], description: 'actors' })
	readonly actors: string[]
}