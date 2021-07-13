import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll(): string {
    return 'Movies';
  }

  @Get('search')
  search(@Query('year') year: number) {
    return `search create : ${year}`;
  }

  @Get(':id')
  getOne(@Param('id') movieId: string): string {
    return `This will return one Movie the id: ${movieId}`;
  }

  @Post()
  createMovie(@Body() movieData) {
    return movieData;
  }

  @Delete(':id')
  remove(@Param('id') movieId: string) {
    return `This will delete a movie ID : ${movieId}`;
  }

  @Patch(':id')
  path(@Param('id') movieId: string, @Body() updateData) {
    return {
      movieId: Number(movieId),
      ...updateData,
    };
  }
}
