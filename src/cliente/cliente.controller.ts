import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { ClienteService } from "./cliente.service";
import { Cliente } from './cliente.entities';

@Controller("clientes")
export class ClienteController{
    constructor(private readonly service : ClienteService){}
    
    @Post()
    save(@Body() cliente: Cliente) {
        return this.service.save(cliente);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get(":id")
    findById(@Param() id: number) {
        return this.service.findById(id);
    }

    @Delete(":id")
    remove(@Param() id: number) {
        return this.remove(id);
    }
}