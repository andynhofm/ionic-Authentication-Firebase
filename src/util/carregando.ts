
import {Loading, LoadingController} from "ionic-angular";

export class Carregando {
  private loader: Loading;

  constructor (
    private _loading: LoadingController,
    private _mensagem: string = "Carregando... Aguarde!") {
  }

  public exibir () {
    this.loader = this._loading.create({
      content: this._mensagem
    });

    this.loader.present({duration: 10000});
  }

  public finalizar() {
    this.loader.dismiss();
  }

  public setMensagem(mensagem: string) {
    this._mensagem = mensagem;
  }
}
