import { MigrationInterface, QueryRunner } from 'typeorm';
import { ItemMaster } from 'src/vehicles/entities/item-master.entity';
import { ItemType } from 'src/vehicles/enums/item-type';
import { dataSource } from '../dataSourceSeed';

export class seedItemsMaster1665965673027 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const itemsMasterRepo = dataSource.getRepository(ItemMaster);
    const allItemsMaster = await itemsMasterRepo.find();
    await itemsMasterRepo.remove(allItemsMaster);

    await itemsMasterRepo.save([
      {
        description: 'Triángulos',
        itemType: ItemType.Accesorios,
      },
      {
        description: 'Gata',
        itemType: ItemType.Accesorios,
      },
      {
        description: 'Manerales',
        itemType: ItemType.Accesorios,
      },
      {
        description: 'Extintor',
        itemType: ItemType.Accesorios,
      },
      {
        description: 'Alfombras',
        itemType: ItemType.Accesorios,
      },
      {
        description: 'Forros de asiento',
        itemType: ItemType.Accesorios,
      },
      {
        description: 'Rach',
        itemType: ItemType.Accesorios,
      },
      {
        description: 'Llave',
        itemType: ItemType.Accesorios,
      },
      {
        description: 'Antena',
        itemType: ItemType.Partes,
      },
      {
        description: 'Llanta de repuesto',
        itemType: ItemType.Partes,
      },
      {
        description: 'Radio',
        itemType: ItemType.Partes,
      },
      {
        description: 'Cámara',
        itemType: ItemType.Partes,
      },
      {
        description: 'A/C',
        itemType: ItemType.Partes,
      },
      {
        description: 'Sensores',
        itemType: ItemType.Partes,
      },
      {
        description: 'Retrovisor interno',
        itemType: ItemType.Partes,
      },
      {
        description: 'Cañuelas',
        itemType: ItemType.Partes,
      },
      {
        description: 'Emblemas',
        itemType: ItemType.Partes,
        useQty: true,
      },
      {
        description: 'Llavines',
        itemType: ItemType.Partes,
      },
      {
        description: 'Pide vias',
        itemType: ItemType.Partes,
      },
      {
        description: 'Focos',
        itemType: ItemType.Partes,
      },
      {
        description: 'Stops',
        itemType: ItemType.Partes,
      },
      {
        description: 'Loderas',
        itemType: ItemType.Partes,
      },
      {
        description: 'Retrovisores laterales',
        itemType: ItemType.Partes,
      },
      {
        description: 'Cepillos tricos',
        itemType: ItemType.Partes,
      },
      {
        description: 'Tapón combustible',
        itemType: ItemType.Partes,
      },
      {
        description: 'Tapones motor',
        itemType: ItemType.Partes,
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
        description: 'Rodamiento',
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
        description: 'Placas',
        itemType: ItemType.Documentos,
        useQty: true,
      },
      {
        description: 'Sticher no fumado',
        itemType: ItemType.Documentos,
      },
      {
        description: 'Sticker MVA',
        itemType: ItemType.Documentos,
      },
      {
        description: 'Sticker matricula',
        itemType: ItemType.Documentos,
      },
      {
        description: 'Sticker emisión gases',
        itemType: ItemType.Documentos,
      },
      {
        description: 'Sticker cambio de aceite',
        itemType: ItemType.Documentos,
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const itemsMasterRepo = dataSource.getRepository(ItemMaster);
    await itemsMasterRepo.clear();
  }
}
