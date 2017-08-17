
import { Injectable } from '@angular/core';
import { Usuario } from "./user"

@Injectable()
export class SingletonApp {
  public usuarioLogado = {} as Usuario;
  public usuarioLogadoFireBase: any;

  public setUsuarioLogado(user: any, result: any) {
    this.usuarioLogado = user;
    this.usuarioLogado.displayName = result.displayName;
    this.usuarioLogado.password = "";

    this.usuarioLogadoFireBase = result;
  }
}
