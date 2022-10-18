import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  UnprocessableEntityException,
} from '@nestjs/common';

interface FileNotValid {
  grupo: string;
  nombre: string;
}

@Injectable()
export class FileTypeValidationPipe implements PipeTransform {
  transform(values: Express.Multer.File[], metadata: ArgumentMetadata) {
    // "value" is an object containing the file's attributes and metadata
    const validations: FileNotValid[] = [];
    for (const property in values) {
      for (const file of values[property] as unknown as Express.Multer.File[]) {
        if (!file.mimetype.match(/.(png|jpg|jpeg)$/)) {
          validations.push({
            grupo: file.fieldname,
            nombre: file.originalname,
          });
        }
      }
    }
    if (validations.length > 0)
      throw new UnprocessableEntityException(
        validations,
        `Tipo de archivo no válido`,
      );
    return values;
  }
}
