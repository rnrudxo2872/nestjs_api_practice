import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    let movie = this.movies.find((movie) => movie.id === id);

    if (!movie) {
      throw new NotFoundException('No exists movie ID.');
    }
    return movie;
  }

  create(movieData: CreateMovieDTO) {
    console.log(movieData);

    this.movies.push({
      ...movieData,
      id: this.movies.length + 1,
    });
  }

  deleteOne(id: number) {
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== id);
  }

  update(id: number, updateData: CreateMovieDTO) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({ ...movie, ...updateData });
  }
}
