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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AddNewsDto } from './dto/add-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { JWTAuthGuard } from 'src/guards/jwt-auth.guard';
import { IsAdminGuard } from 'src/guards/is-admin.guard';

@ApiTags('News')
@Controller('news')
@UseGuards(JWTAuthGuard)
export class NewsController {
  constructor(private readonly service: NewsService) {}

  @ApiBearerAuth('authorization')
  @Get()
  getNews() {
    return this.service.getNews();
  }

  @ApiBearerAuth('authorization')
  @Post()
  @UseGuards(IsAdminGuard)
  addNews(@Body() body: AddNewsDto) {
    return this.service.addNews(body);
  }

  @ApiBearerAuth('authorization')
  @Delete(':id')
  @UseGuards(IsAdminGuard)
  deleteNews(@Param('id') id: string) {
    return this.service.deleteNews(id);
  }

  @ApiBearerAuth('authorization')
  @Patch(':id')
  @UseGuards(IsAdminGuard)
  updateNews(@Param('id') id: string, @Body() body: UpdateNewsDto) {
    return this.service.updateNews(id, body);
  }
}
