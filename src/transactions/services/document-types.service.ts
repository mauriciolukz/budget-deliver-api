import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateDocumentConfigDto } from '../dtos/document-config.dto';
import { DocumentConfig } from '../entities/document-config.entity';

@Injectable()
export class DocumentConfigsService {
  constructor(
    @InjectRepository(DocumentConfig)
    private documentConfigsRepo: Repository<DocumentConfig>,
  ) {}

  getByType(documentType: number) {
    return this.documentConfigsRepo.findOneBy({ documentType });
  }

  async update(id: number, changes: UpdateDocumentConfigDto) {
    const document = await this.documentConfigsRepo.findOneBy({ id });
    if (!document) throw new NotFoundException();
    const merge = await this.documentConfigsRepo.merge(document, changes);
    return this.documentConfigsRepo.save(merge);
  }
}
