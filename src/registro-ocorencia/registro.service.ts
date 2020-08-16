import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RegistroOcorencia } from './registro.entities';

  
@Injectable()
export class RegistroService{

    constructor(
        @InjectRepository(RegistroOcorencia)
        private readonly repository: Repository<RegistroOcorencia>) {
    }

    save(registro: RegistroOcorencia) {
        this.repository.save(registro);
    }

    delete(id: number) {
        return this.repository.delete(id);
    }

    findAll() {
        return this.repository.find();
    }

    findById(id: number) {
        return this.repository.findOne(id);
    }
}