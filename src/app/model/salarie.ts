import { Conge } from './conge';

export class Salarie {
	id:number;
	nom:   string ;
	prenom: string;
	solde_conge:number ;
	date_entree:Date ;
	grade: string;
	mail: string;
	num_tel:  number;
	nom_responsable:   string;
	groupe:   string;
	username:  string;
	roles: string[];
	manager:Salarie;
	password:string;
	conges:Conge[];
	
	  constructor(nom:  string, prenom: string,solde_conge:number,date_entree:Date,grade: string,
		  mail:  string,num_tel: number,nom_responsable:  string,groupe:  string,username:  string, password:  string , roles: string)
		   {
		this.nom = nom;
		this.prenom=prenom;
		this.solde_conge=solde_conge;
		this.date_entree=date_entree;
		this.grade=grade;
		this.mail = mail;
		this.num_tel=num_tel;
		this.nom_responsable=nom_responsable;
		this.groupe=groupe;
		this.username = username;
        this.password = password;
		// this.roles = ['role'];

	}
	
  
	
}

