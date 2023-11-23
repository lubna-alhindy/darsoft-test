import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { News } from './entities/news.entity';
import { AddNewsDto } from './dto/add-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { NewsGateway } from './news.gateway';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private newsRepository: Repository<News>,
    private newsGateway: NewsGateway,
  ) {}

  async getNews() {
    return await this.newsRepository.find();
  }

  async addNews(body: AddNewsDto) {
    const news = await this.newsRepository.save(
      this.newsRepository.create({
        title: body.title,
        description: body.description,
      }),
    );
    this.newsGateway.lastNewsChange(news, 'added');
    return news;
  }

  async deleteNews(id: string) {
    const news = await this.newsRepository.findOne({
      where: {
        _id: new ObjectId(id),
      },
    });

    if (!news) {
      throw new NotFoundException('news not found');
    }
    this.newsGateway.lastNewsChange(news, 'deleted');

    return {
      message: 'deleted successfully',
    };
  }

  async updateNews(id: string, body: UpdateNewsDto) {
    const news = await this.newsRepository.findOne({
      where: {
        _id: new ObjectId(id),
      },
    });

    if (!news) {
      throw new NotFoundException('news not found');
    }

    Object.assign(news, body);
    await this.newsRepository.save(news);
    this.newsGateway.lastNewsChange(news, 'updated');

    return news;
  }
}
