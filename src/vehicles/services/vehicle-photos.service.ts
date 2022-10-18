import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehiclePhoto } from '../models/vehicle-photo.entity';
import { Vehicle } from '../models/vehicle.entity';

@Injectable()
export class VehiclePhotosService {
  constructor(
    @InjectRepository(VehiclePhoto)
    private vehiclePhotoRepo: Repository<VehiclePhoto>,
    @InjectRepository(Vehicle) private vehicleRepo: Repository<Vehicle>,
  ) {
    //
  }

  async create(id: number, files: Express.Multer.File[]) {
    const vehicle = await this.vehicleRepo.findOneBy({ id });
    if (!vehicle) throw new NotFoundException();
    const photos = new Array<VehiclePhoto>();

    for (const property in files) {
      for (const file of files[property] as unknown as Express.Multer.File[]) {
        const photo = new VehiclePhoto();
        photo.vehicle = vehicle;
        photo.groupName = file.fieldname;
        photo.name = file.originalname;
        photo.urlImage = `${process.env.UPLOAD_URL}/${file.filename}`;
        photos.push(photo);
      }
    }
    return this.vehiclePhotoRepo.save(photos);
  }
}
