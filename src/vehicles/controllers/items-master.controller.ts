import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  CreateItemMasterDto,
  FilterItemsMasterDto,
  UpdateItemMasterDto,
} from '../dtos/item-master.dto';
import { ItemsMasterService } from '../services/items-master.service';

@UseGuards(AuthGuard('jwt'))
@Controller('api/items-master')
export class ItemsMasterController {
  constructor(private itemsMasterService: ItemsMasterService) {}

  @Get()
  getAll(@Query() params: FilterItemsMasterDto) {
    return this.itemsMasterService.findAll(params);
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.itemsMasterService.findById(id);
  }

  @Post()
  create(@Body() data: CreateItemMasterDto) {
    return this.itemsMasterService.create(data);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateItemMasterDto,
  ) {
    return this.itemsMasterService.update(id, data);
  }
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.itemsMasterService.delete(id);
  }
}
