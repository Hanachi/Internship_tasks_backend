import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
	@ApiProperty({type: String, description: 'title'})
	readonly title: string
	@ApiProperty({type: Number, description: 'year'})
	readonly year: number
	@ApiProperty({ type: Array, description: 'cast' })
	readonly cast: string[]
	@ApiProperty({ type: Array, description: 'genres' })
	readonly genres: string[]
}