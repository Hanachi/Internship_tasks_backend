import { ApiProperty } from '@nestjs/swagger';
export class UpdateMovieDto {
	@ApiProperty({ type: String, description: 'title' })
	readonly title: string
	@ApiProperty({ type: Number, description: 'year' })
	readonly year: number
	@ApiProperty({ type: Array, description: 'genres' })
	readonly genres: string[]
	@ApiProperty({ type: Array, description: 'actors' })
	readonly actors: string[]
}