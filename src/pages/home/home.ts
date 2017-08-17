import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {SingletonApp} from "../../models/SingletonApp";
import {Usuario} from "../../models/user";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user: Usuario;

  constructor(public navCtrl: NavController,
              public singletonApp: SingletonApp) {

    this.user = singletonApp.usuarioLogado;
  }

}
