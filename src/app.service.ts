import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RegistroService } from './registro-ocorencia/registro.service';
import { RegistroOcorencia } from './registro-ocorencia/registro.entities';
import { ClienteService } from './cliente/cliente.service';
import { ProdutoService } from './produto/produto.service';
import { Cliente } from './cliente/cliente.entities';
import { Produto } from './produto/produto.entities';
const nodemailer = require('nodemailer');

@Injectable()
export class AppService {

  private registro: RegistroOcorencia;
  private mensagem: string = ''; 
  private cliente = new Cliente();
  private status: boolean;
  private lista: Array<Produto> = [];
  private mensagemCliente: string;

  constructor(private readonly registroService : RegistroService,
    private readonly clienteService : ClienteService,
    private readonly produtoService : ProdutoService){}


  @Cron(CronExpression.EVERY_10_SECONDS)
  async sendMail() {
    this.buscaCliente();
  }
  
  // busca cliente e estrai o email
  async buscaCliente(){

    this.clienteService.findAll().then(value =>{

      for(var i = 0; i < value.length; i++){
        this.cliente.email = value[i].email;
        this.cliente.nome = value[i].nome;
        this.buscaProduto(this.cliente.email, this.cliente.nome);
      }
    }, 
    function(value) {
    });

  }

  // busca produto
  async buscaProduto(email: string, nome: string){
   
    this.produtoService.findAll().then(value => {
      this.lista = value;    
      this.enviarEmail(email, this.lista, nome);
    }, 
    function(value) {
    });
  }

  // envia email com o produto
  async enviarEmail(email: string, produto: Array<Produto>, nome:string){

    this.mensagemCliente = '';


    for(var i = 0; i < produto.length; i++){
      const nome = produto[i].nome;
      const descricao = produto[i].descricao;
      const preco = produto[i].preco;
      const oferta = produto[i].oferta;

      this.mensagemCliente += nome+" "+ descricao +
                              "<br>Preco R$:"+preco+ " Reais"+
                              "<br>Oferta R$:"+oferta +" Reais <br><br>";
    
    }
   
    let transporter = nodemailer.createTransport({
      host:  "localhost",
      port: "1025",
      auth: null,
    });

    transporter.sendMail({
      from: 'marciano@hotmail.com.br',
      to: email,
      subject: "Ofertas Imbativel", 
      html: "Hello "+nome+" ofertas imbativel para hoje vamos aproveitar!!!<br><br>"+
            "<p>"+this.mensagemCliente+"</p>",
    }).then(info =>{
      this.status = true;
      this.mensagem = 'Email emviado com sucesso para [ '+email+' ]';
      this.salvaRegistro(true, this.mensagem);
    },
      function(info){}
    );    

    this.status = false;
    this.mensagem = 'Erro ao enviar email para [ '+email+' ]';
    this.salvaRegistro(this.status, this.mensagem);
    
  }

  // registra logs
  async salvaRegistro(status:boolean, mensagem: string){
    
    var data = new Date();
    this.registro = new RegistroOcorencia();

    this.registro.status = status;
    this.registro.evento = mensagem;
    this.registro.data = data;

    this.registroService.save(this.registro);
  }

}