import { CameraPhoto } from "@capacitor/core";
import { TipoCarro } from "./TipoCarro";

export default class Carro {
  static COUNT = 0;

  id = ++Carro.COUNT;
  descricao: string;
  tipo: TipoCarro;
  cor: string;
  dataCompra = new Date();
  imagem: CameraPhoto;
  valor: number;

  setDescricao(descricao: string): void {
    this.descricao = descricao;
  }

  setTipo(tipo: TipoCarro): void {
    this.tipo = tipo;
  }

  setCor(cor: string): void {
    this.cor = cor;
  }

  setDataCompra(dataCompra: Date): void {
    this.dataCompra = dataCompra;
  }

  setValor(valor: number): void {
    this.valor = valor;
  }

  setImagem(imagem: CameraPhoto): void {
    this.imagem = imagem;
  }
}
