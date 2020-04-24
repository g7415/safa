import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';
import { SalarieService } from '../service/salarie.service';
import { group } from '@angular/animations';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  info: any;

  constructor(private token: TokenStorageService,public salarieService:SalarieService) { }


  ngOnInit() {
    this.salarieService.getProfil(this.token.getUsername()).subscribe(
      data => {
      console.log(data);
      this.token.saveUsername(data.username);
      this.token.saveNom(data.nom);
      this.token.savePrenom(data.prenom);
      this.token.saveMail(data.mail);
      this.token.saveGrade(data.grade);
      this.token.saveGroupe(data.groupe);
      this.token.saveNom_responsable(data.nom_responsable);
      this.token.savePassword(data.password);

      // this.token.saveNumero(data.num_tel);

      },
      error => {
        console.log(error);
      }
    );
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      nom: this.token.getNom(),
      prenom: this.token.getPrenom(),
      authorities: this.token.getAuthorities(),
      mail:this.token.getMail(),
      grade:this.token.getGrade(),
      num_tel:this.token.getNumero(),
      groupe:this.token.getGroupe(),
      nom_responsable:this.token.getNom_responsable(),
      date_entree:this.token.getDate_entree(),
      password:this.token.getPassword()

    };
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }
  }


  
}

