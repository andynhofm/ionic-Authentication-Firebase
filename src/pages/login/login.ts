import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import { Usuario } from "../../models/user";
import { RegisterPage} from "../register/register";
import { AngularFireAuth} from "angularfire2/auth";
import { HomePage} from "../home/home";
import { Mensagem} from "../../util/mensagem";
import { Carregando} from "../../util/carregando";
import {SingletonApp} from "../../models/SingletonApp";
import {Validacoes} from "../../models/Validacoes";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {email: "", password: ""} as Usuario;
  disabilitaEntrar = true;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private afAuth: AngularFireAuth,
              private alert: AlertController,
              private loading: LoadingController,
              public singletonApp: SingletonApp,
              private validacoes: Validacoes) {
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad LoginPage');
  // }

  async login (user: Usuario) {
    let carregando = new Carregando(this.loading, "Efetuando login. Aguarde...");
    carregando.exibir();

    this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password).then(result => {
      carregando.finalizar();
      this.singletonApp.setUsuarioLogado(user, result);
      this.navCtrl.setRoot(HomePage);
    }).catch(err => {
      carregando.finalizar();
      new Mensagem(this.alert, "Não foi possível fazer o login. Verifique seu usuário e senha!").exibir();
    })
  }

  register() {
    this.navCtrl.push(RegisterPage)
  }

  validaEntrar() {
    this.disabilitaEntrar = (!this.validacoes.validarEmail(this.user.email) || this.user.password.length < 6);
  }

  enviarEmail() {
    if (!this.validacoes.validarEmail(this.user.email)) {
      new Mensagem(this.alert, "Informe um e-mail válido!").exibir()
      return
    }

    let carregando = new Carregando(this.loading, "Enviando e-mail para a redefinição da senha.");
    carregando.exibir();
    this.afAuth.auth.sendPasswordResetEmail(this.user.email).then(result => {
      carregando.finalizar()
      new Mensagem(this.alert, "Verifique sua caixa de mensagens.").exibir()
    }).catch(err => {
      carregando.finalizar()
      //new Mensagem(this.alert, err.message, Mensagem.TITULO_ERRO).exibir()
      new Mensagem(this.alert, "Não foi possível enviar o e-mail! Talvez você não esteja cadastrado.", Mensagem.TITULO_ERRO).exibir()
    })
  }
}
