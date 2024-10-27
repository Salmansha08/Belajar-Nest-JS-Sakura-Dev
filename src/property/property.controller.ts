import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  ParseIntPipe,
  Query,
  ParseBoolPipe,
  ValidationPipe,
  Patch,
  UsePipes,
  Headers,
} from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { IdParamDto } from './dto/id-param.dto';
import { ZodValidationPipe } from './pipes/zod-validation-pipe';
import {
  CreatePropertySchema,
  CreatePropertyZodDto,
} from './dto/create-property-zod.dto';
import { HeadersDto } from './dto/headers.dto';
import { RequestHeader } from './pipes/request-header';
import { PropertyService } from './property.service';

@Controller('property')
export class PropertyController {
  readonlypropertyService: PropertyService;
  constructor(private propertyService: PropertyService) {
    // Don't create your dependecy, instead use DI in NestJS
    // this.propertyService = new PropertyService();
    // this.propertyService = propertyService;
  }

  @Get()
  findAll() {
    return this.propertyService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: string,
    @Query('sort', ParseBoolPipe) sort: string,
  ) {
    return this.propertyService.findOne();
  }

  @Post()
  // @HttpCode(202)
  @UsePipes(new ZodValidationPipe(CreatePropertySchema))
  create(
    @Body()
    body: CreatePropertyZodDto,
  ) {
    return this.propertyService.create();
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id,
    @Body()
    body: CreatePropertyDto,
    @RequestHeader(new ValidationPipe({ validateCustomDecorators: true }))
    header: HeadersDto,
  ) {
    return this.propertyService.update();
  }
}
