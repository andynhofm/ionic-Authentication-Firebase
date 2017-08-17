import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import { Usuario } from "../../models/user"
import {AngularFireAuth} from "angularfire2/auth";
import {Mensagem} from "../../util/mensagem";
import {SingletonApp} from "../../models/SingletonApp";
import {HomePage} from "../home/home";
import {Validacoes} from "../../models/Validacoes";
import {LoginPage} from "../login/login";
import {Carregando} from "../../util/carregando";

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {displayName: "", email: "", password: ""} as Usuario;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private afAuth: AngularFireAuth,
              private alert: AlertController,
              public singletonApp: SingletonApp,
              private validacoes: Validacoes,
              private loading: LoadingController) {
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad RegisterPage');
  // }

  async register(user: Usuario) {
    if (!this.validacao()) return

    let carregando = new Carregando(this.loading, "Efetuando registro. Aguarde...");
    carregando.exibir();

    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then(result => {
      this.afAuth.auth.onAuthStateChanged(atualiza => {
        if (atualiza) {
          atualiza.updateProfile({displayName: user.displayName, photoURL: ""})
        }

        this.singletonApp.setUsuarioLogado(user, result)
        this.navCtrl.setRoot(LoginPage)
        carregando.finalizar()
      });
    }).catch(err => {
      carregando.finalizar()
      new Mensagem(this.alert, `Não foi possível fazer o registro. Verifique os dados informados. \nTalvez seu email já esteja cadastrado?`).exibir()
    })
  }

  validacao() {
    if (!this.user.displayName) {
      new Mensagem(this.alert, "Informe seu nome.").exibir()
      document.getElementById("nome").focus()
      return false
    }

    if (!this.validacoes.validarEmail(this.user.email)) {
      new Mensagem(this.alert, "Informe um e-mail válido.").exibir()
      document.getElementById("email").focus()
      return false
    }

    if (this.user.password.length < 6) {
      new Mensagem(this.alert, "A senha precisa ter ao menos seis caracteres.").exibir()
      document.getElementById("senha").focus()
      return false
    }

    return true
  }

}
