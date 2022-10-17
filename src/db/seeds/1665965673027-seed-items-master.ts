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
        itemType: ItemType.accessory,
      },
      {
        description: 'Llanta de repuesto',
        itemType: ItemType.accessory,
      },
      {
        description: 'Radio',
        itemType: ItemType.accessory,
      },
      {
        description: 'Cámara',
        itemType: ItemType.accessory,
      },
      {
        description: 'Herramientas',
        itemType: ItemType.accessory,
      },
      {
        description: 'Triángulo',
        itemType: ItemType.accessory,
      },
      {
        description: 'Extinguidor',
        itemType: ItemType.accessory,
      },
      {
        description: 'Rodamiento del año',
        itemType: ItemType.document,
      },
      {
        description: 'Circulación',
        itemType: ItemType.document,
      },
      {
        description: 'Seguro',
        itemType: ItemType.document,
      },
      {
        description: 'Emisión de gases',
        itemType: ItemType.document,
      },
      {
        description: 'Inspección Mecánica',
        itemType: ItemType.document,
      },
      {
        description: 'Rack',
        itemType: ItemType.part,
      },
      {
        description: 'Alfombras',
        itemType: ItemType.part,
      },
      {
        description: 'Loderas',
        itemType: ItemType.part,
      },
      {
        description: 'Llave',
        itemType: ItemType.part,
      },
      {
        description: 'Forros',
        itemType: ItemType.part,
      },
      {
        description: 'Pide vías',
        itemType: ItemType.part,
      },
      {
        description: 'Cañuelas',
        itemType: ItemType.part,
      },
      {
        description: 'Cepillos tricos',
        itemType: ItemType.part,
      },
      {
        description: 'Llavines',
        itemType: ItemType.part,
      },
      {
        description: 'Retrovisor interno',
        itemType: ItemType.part,
      },
      {
        description: 'Tapón de combustible',
        itemType: ItemType.part,
      },
      {
        description: 'Tapones del motor',
        itemType: ItemType.part,
      },
      {
        description: 'Emblema',
        itemType: ItemType.part,
        useQty: true,
      },
      {
        description: 'Placas',
        itemType: ItemType.document,
        useQty: true,
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const itemsMasterRepo = dataSource.getRepository(ItemMaster);
    await itemsMasterRepo.clear()
  }
}
