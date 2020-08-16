import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ProdutoModule } from './produto/produto.module';
import { ClienteModule } from './cliente/cliente.module';
import { RegistroOcorenciaModule } from './registro-ocorencia/registro-ocorencia.module';
import { Produto } from './produto/produto.entities';
import { ProdutoController } from './produto/produto.controller';
import { Cliente } from './cliente/cliente.entities';
import { ClienteController } from './cliente/cliente.controller';
import { AppController } from './app.controller';
import { RegistroOcorencia} from './registro-ocorencia/registro.entities';
import { RegistroService } from './registro-ocorencia/registro.service';
import { ProdutoService } from './produto/produto.service';
import { ClienteService } from './cliente/cliente.service';


@Module({
  imports: [ScheduleModule.forRoot(), ProdutoModule, ClienteModule, RegistroOcorenciaModule,
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'pos',
    database: 'job',
    entities: [Produto, Cliente, RegistroOcorencia
    ],
    synchronize: true,
    logging: true
  }),
  TypeOrmModule.forFeature([
    Produto, Cliente, RegistroOcorencia
  ])
],
  controllers: [ProdutoController, ClienteController, AppController],
  providers: [AppService, ProdutoService, ClienteService, RegistroService],
})
export class AppModule {}
