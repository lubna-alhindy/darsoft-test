import {
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Controller,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { ApiTags } from '@nestjs/swagger';
import { AddNewsDto } from './dto/add-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { JWTAuthGuard } from 'src/guards/jwt-auth.guard';
import { IsAdminGuard } from 'src/guards/is-admin.guard';

@ApiTags('News')
@Controller('news')
@UseGuards(JWTAuthGuard)
export class NewsController {
  constructor(private readonly service: NewsService) {}

  @Get()
  getNews() {
    return this.service.getNews();
  }

  @Post()
  @UseGuards(IsAdminGuard)
  addNews(@Body() body: AddNewsDto) {
    return this.service.addNews(body);
  }

  @Delete(':id')
  @UseGuards(IsAdminGuard)
  deleteNews(@Param('id') id: string) {
    return this.service.deleteNews(id);
  }

  @Patch(':id')
  @UseGuards(IsAdminGuard)
  updateNews(@Param('id') id: string, @Body() body: UpdateNewsDto) {
    return this.service.updateNews(id, body);
  }
}
