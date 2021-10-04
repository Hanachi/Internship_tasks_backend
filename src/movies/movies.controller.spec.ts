import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from '../../src/user/service/user-service/user.service';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';


describe('MoviesController', () => {
  let controller: MoviesController;
  let moviesService: MoviesService;
  let findOne: jest.Mock;

  class Movie {
    id:string;
    year:string;
    title:string;
    imdbRating:string;
  }

  const movieById = { id: '3', year: '2020', title: '5', imdbRating: '5', };


  beforeEach(async () => {
    findOne = jest.fn();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [
        {
          provide: MoviesService,
          useValue: {
            getById() {
              return movieById;
            }
          }
        },
        {
          provide: UserService,
          useValue: {}
        },
        {
          provide: getRepositoryToken(Movie),
          useValue: {
            findOne
          }
        }
      ]
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    moviesService = await module.get(MoviesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getById', () => {
    describe('findOne return movie', () => {
      let movie: Movie = movieById;
      beforeEach(() => {
        findOne.mockReturnValue(Promise.resolve(movie));
      })
      it('Service return movie', async () => {
        const returnedMovie = await moviesService.getById('5');
        expect(returnedMovie).toEqual(movie);
      })
    })
    });
});
