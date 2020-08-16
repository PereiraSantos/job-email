import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { ProdutoService } from "./produto.service";
import { Produto } from './produto.entities';

@Controller("produtos")
export class ProdutoController{
    constructor(private readonly service : ProdutoService){}
    
    @Post()
    save(@Body() produto: Produto) {
        return this.service.save(produto);
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