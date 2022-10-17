import { MigrationInterface, QueryRunner } from 'typeorm';
import { ItemMaster } from 'src/vehicles/models/item-master.entity';
import { ItemType } from 'src/vehicles/types/item-type';
import { dataSource } from '../dataSourceSeed';

export class seedItemsMaster1665965673027 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const itemsMasterRepo = dataSource.getRepository(ItemMaster);
    const allItemsMaster = await itemsMasterRepo.find();
    await itemsMasterRepo.remove(allItemsMaster);

    await itemsMasterRepo.save([
      {
        description: 'Antena',
        itemType: ItemType.Accesorios,
      },
      {
        description: 'Llanta de repuesto',
        itemType: ItemType.Accesorios,
      },
      {
        description: 'Radio',
        itemType: ItemType.Accesorios,
      },
      {
        description: 'Cámara',
        itemType: ItemType.Accesorios,
      },
      {
        description: 'Herramientas',
        itemType: ItemType.Accesorios,
      },
      {
        description: 'Triángulo',
        itemType: ItemType.Accesorios,
      },
      {
        description: 'Extinguidor',
        itemType: ItemType.Accesorios,
      },
      {
        description: 'Rodamiento del año',
        itemType: ItemType.Documentos,
      },
      {
        description: 'Circulación',
        itemType: ItemType.Documentos,
      },
      {
        description: 'Seguro',
        itemType: ItemType.Documentos,
      },
      {
        description: 'Emisión de gases',
        itemType: ItemType.Documentos,
      },
      {
        description: 'Inspección Mecánica',
        itemType: ItemType.Documentos,
      },
      {
        description: 'Rack',
        itemType: ItemType.Partes,
      },
      {
        description: 'Alfombras',
        itemType: ItemType.Partes,
      },
      {
        description: 'Loderas',
        itemType: ItemType.Partes,
      },
      {
        description: 'Llave',
        itemType: ItemType.Partes,
      },
      {
        description: 'Forros',
        itemType: ItemType.Partes,
      },
      {
        description: 'Pide vías',
        itemType: ItemType.Partes,
      },
      {
        description: 'Cañuelas',
        itemType: ItemType.Partes,
      },
      {
        description: 'Cepillos tricos',
        itemType: ItemType.Partes,
      },
      {
        description: 'Llavines',
        itemType: ItemType.Partes,
      },
      {
        description: 'Retrovisor interno',
        itemType: ItemType.Partes,
      },
      {
        description: 'Tapón de combustible',
        itemType: ItemType.Partes,
      },
      {
        description: 'Tapones del motor',
        itemType: ItemType.Partes,
      },
      {
        description: 'Emblema',
        itemType: ItemType.Partes,
        useQty: true,
      },
      {
        description: 'Placas',
        itemType: ItemType.Documentos,
        useQty: true,
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const itemsMasterRepo = dataSource.getRepository(ItemMaster);
    await itemsMasterRepo.clear()
  }
}
