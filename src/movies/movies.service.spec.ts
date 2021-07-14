import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    service.create({
      title: 'test Movie',
      genres: ['test'],
      year: 2000,
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should retrun a movie', () => {
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
    });

    it('should throw 404 err', () => {
      try {
        service.getOne(99);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('deleteOne', () => {
    it('delete Movie', () => {
      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;

      expect(beforeDelete).toBeGreaterThan(afterDelete);
    });
    it('should return 404', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should be created', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'test Movie',
        genres: ['test'],
        year: 2000,
      });
      const afterCreate = service.getAll().length;
      console.log(beforeCreate, afterCreate);

      expect(beforeCreate).toBeLessThan(afterCreate);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      const title = 'Update Test!';
      const beforeTitle = service.getOne(1).title;
      service.update(1, { title });
      const afterTitle = service.getOne(1).title;
      expect(afterTitle).toEqual(title);
      expect(beforeTitle).not.toEqual(afterTitle);
    });

    it('should throw NotFoundException', () => {
      try {
        service.update(123, { title: 'ttt' });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
