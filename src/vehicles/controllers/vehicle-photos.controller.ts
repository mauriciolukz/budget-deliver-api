import {
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../helpers/file-name';
import { VehiclePhotosService } from '../services/vehicle-photos.service';
import { Photos } from '../enums/photos';

@Controller('api/vehicles')
export class VehiclePhotosController {
  constructor(private vehiclePhotosService: VehiclePhotosService) {}
  // Pendiente
  // @Post('file')
  // @UseInterceptors(FileInterceptor('file', { dest: './uploads' }))
  // uploadFile(@UploadedFile() file: Express.Multer.File) {
  //   return `hello world`;
  // }

  @Post(':id/files')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: Photos.Exterior, maxCount: 4 },
        { name: Photos.Interior, maxCount: 4 },
        { name: Photos.Complementaria, maxCount: 12 },
      ],
      {
        storage: diskStorage({
          filename: editFileName,
          destination: './uploads',
        }),
        fileFilter: imageFileFilter,
      },
    ),
  )
  uploadFiles(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.vehiclePhotosService.create(id, files);
  }
}
