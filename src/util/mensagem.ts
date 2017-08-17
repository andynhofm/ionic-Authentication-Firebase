
import {AlertController} from "ionic-angular";
import {AlertButton} from "ionic-angular/components/alert/alert-options";

export class Mensagem {
  public static TITULO_INFO = "Informação";
  public static TITULO_CONF = "Confirmação";
  public static TITULO_ATENCAO = "Atenção";
  public static TITULO_ERRO = "Erro";

  constructor (private _alertCtrl: AlertController,
               private _mensagem: string = "Informe a mensagem que será exibida para o usuário.",
               private _titulo: string = Mensagem.TITULO_INFO,
               private _botoes: (AlertButton | string)[] = [{text: "Ok"}]) {
  }

  public exibir() {
    let alert = this._alertCtrl.create({
      title: this._titulo,
      buttons: this._botoes,
      subTitle: this._mensagem
    });

    alert.present();
  }

  public setTitulo(titulo: string) {
    this._titulo = titulo;
  }

  public setMensagem(mensagem: string) {
    this._mensagem = mensagem;
  }

  public setBotoes(botoes: (AlertButton | string)[]) {
    this._botoes = botoes;
  }
}
