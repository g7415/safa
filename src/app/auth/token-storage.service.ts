import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';
const NOM_KEY = 'AuthNom';
const PRENOM_KEY = 'AuthPrenom';
const NUMERO_KEY = 'AuthNumero';
const GRADE_KEY = 'AuthGrade';
const MAIL_KEY = 'AuthMail';
const SOLDE_CONGE_KEY = 'AuthSolde_Conge';
const DATE_ENTREE_KEY = 'AuthDate_Entree';
const NOM_RESPONSABLE_KEY = 'AuthNom_Responsable';
const GROUPE_KEY = 'AuthGroupe';
const PASSWORD_KEY = 'AuthPassword';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private roles: Array<string> = [];
  constructor() { }

  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveGroupe(groupe: string) {
    window.sessionStorage.removeItem(GROUPE_KEY);
    window.sessionStorage.setItem(GROUPE_KEY, groupe);
  }

  public getGroupe(): string {
    return sessionStorage.getItem(GROUPE_KEY);
  }
  public savePassword(password: string) {
    window.sessionStorage.removeItem(PASSWORD_KEY);
    window.sessionStorage.setItem(PASSWORD_KEY, password);
  }

  public getPassword(): string {
    return sessionStorage.getItem(PASSWORD_KEY);
  }
  public saveNom_responsable(nom_responsable: string) {
    window.sessionStorage.removeItem(NOM_RESPONSABLE_KEY);
    window.sessionStorage.setItem(NOM_RESPONSABLE_KEY, nom_responsable);
  }

  public getNom_responsable(): string {
    return sessionStorage.getItem(NOM_RESPONSABLE_KEY);
  }
  public saveDate_entree(date_entree: string) {
    window.sessionStorage.removeItem(DATE_ENTREE_KEY);
    window.sessionStorage.setItem(DATE_ENTREE_KEY, date_entree);
  }

  public getDate_entree(): string {
    return sessionStorage.getItem(DATE_ENTREE_KEY);
  }
  public saveNumero(num_tel: string) {
    window.sessionStorage.removeItem(NUMERO_KEY);
    window.sessionStorage.setItem(NUMERO_KEY, num_tel);
  }

  public getNumero(): string {
    return sessionStorage.getItem(NUMERO_KEY);
  }
  public saveMail(mail: string) {
    window.sessionStorage.removeItem(MAIL_KEY);
    window.sessionStorage.setItem(MAIL_KEY, mail);
  }

  public getMail(): string {
    return sessionStorage.getItem(MAIL_KEY);
  }
  public saveNom(nom: string) {
    window.sessionStorage.removeItem(NOM_KEY);
    window.sessionStorage.setItem(NOM_KEY, nom);
  }

  public getNom(): string {
    return sessionStorage.getItem(NOM_KEY);
  }
  public saveGrade(grade: string) {
    window.sessionStorage.removeItem(GRADE_KEY);
    window.sessionStorage.setItem(GRADE_KEY, grade);
  }

  public getGrade(): string {
    return sessionStorage.getItem(GRADE_KEY);
  }
  public savePrenom(prenom: string) {
    window.sessionStorage.removeItem(PRENOM_KEY);
    window.sessionStorage.setItem(PRENOM_KEY, prenom);
  }

  public getPrenom(): string {
    return sessionStorage.getItem(PRENOM_KEY);
  }
  public saveUsername(username: string) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }

  public getUsername(): string {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  public saveAuthorities(authorities: string[]) {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[] {
    this.roles = [];

    if (sessionStorage.getItem(TOKEN_KEY)) {
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach(authority => {
        this.roles.push(authority.authority);
      });
    }

    return this.roles;
  }
}
