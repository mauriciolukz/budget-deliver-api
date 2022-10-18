import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  UnprocessableEntityException,
} from '@nestjs/common';

interface FileNotValid {
  grupo: string;
  nombre: string;
  tamaño: string;
}

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(values: Express.Multer.File[], metadata: ArgumentMetadata) {
    const validations: FileNotValid[] = [];
    const fiveMB = 5 * 1000 * 1000;
    for (const property in values) {
      for (const file of values[property] as unknown as Express.Multer.File[]) {
        if (file.size > fiveMB) {
          validations.push({
            grupo: file.fieldname,
            nombre: file.originalname,
            tamaño: `${((file.size / 1000 / 1000) as number).toFixed(1)} MB`,
          });
        }
      }
    }
    if (validations.length > 0)
      throw new UnprocessableEntityException(
        validations,
        `Tamaño máximo por archivo: 5 MB`,
      );
    return values;
  }
}
