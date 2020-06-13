import { Component, OnInit } from '@angular/core';
import { Salarie } from 'src/app/model/salarie';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SalarieService } from 'src/app/service/salarie.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { custommail } from 'src/app/salarie/addsalarie/mail.validator';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  sala: any;
  editForm: FormGroup;
  toastr: any;
  errorMessage: string;
  //upload image info
  public selectedFile;
  public event1;
  receivedImageData :any;
  base64Data: any;
  convertedImage: any;
  imageName : any;
  retrievedImage : any;
  retrieveResonse: any;
  pictureData:any;
  pic:any;
  imgURL: any;
  info: { token: string; username: string; nom: string; prenom: string; authorities: string[]; mail: string; grade: string; num_tel: string; groupe: string; nom_responsable: string; date_entree: string; password: string; id: string; };

  constructor(private formBuilder: FormBuilder,private router: Router,private https: HttpClient,
    private salarieService: SalarieService,private token: TokenStorageService,) { }

  ngOnInit() {
    this.selectData();
      this.registerForm = this.formBuilder.group({
          id: [''],
          nom: ['', [ Validators.required, Validators.minLength(3)]],
          prenom: ['', [Validators.required, Validators.minLength(3)]],
          mail: ['', [Validators.required, Validators.minLength(7), custommail ]],  
          num_tel: ['', [Validators.required, Validators.minLength(8)]],
          pic: [''],
      
      });

  }


  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      // display form values on success
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }

  onReset() {
      // this.submitted = false;
      // this.registerForm.reset();
      this.router.navigate(['/profil']);
      console.log("Success Navigation");
  }



  selectData() {
        this.salarieService.getProfil(this.token.getUsername()).subscribe(
        data => {
        console.log("selectData",data);
        this.sala=data;
        // this.receivedImageData = data;
        console.log("this.receivedImageData.pic",this.sala.pic);

        this.base64Data = this.sala.pic;
        this.pic=atob(this.sala.pic);

        console.log("receivedImageData",this.pic);

        this.convertedImage = 'data:image/jpeg;base64,' + this.pic;
        console.log("convertedImage",this.convertedImage);

      }
        );
  }

  updateProfil(){
    this.registerForm.value.pic =  btoa(this.pic);
    this.salarieService.updateProfil(parseInt(this.token.getId()),this.registerForm.value)
    .subscribe(data=>{this.sala=data;
      Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Données modifier',
              showConfirmButton: false,
              timer: 1500
        })
        this.router.navigate(['/profil']);
        console.log("Success Navigation");
    })
  
  }
      /* partie spécifiée à uploading une photo de profile */
public  onFileChanged(event) {
  console.log(event);
  this.selectedFile = event.target.files[0];

  // Below part is used to display the selected image
  let reader = new FileReader();
  reader.readAsDataURL(event.target.files[0]);
  reader.onload = (event2) => {
    this.imgURL = reader.result;
};
}
      onUpload() {
        const uploadData = new FormData();
        uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
        
        this.https.post('http://localhost:8080/api/upload', uploadData)
        .subscribe( 
                     data => {
                       console.log("dataOnUpload",data);
        
                             this.receivedImageData = data;
                             this.pic = this.receivedImageData.pic;
                             console.log("this.receivedImageData.picOnUpload",this.receivedImageData.pic);
                             //"pic" est le nom d'un attribut dans le backend
                             this.base64Data = this.receivedImageData.pic;
                             this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data; 
                             console.log("convertedImageOnUpload",this.convertedImage);
                            },
                     err => console.log('Error Occured duringng saving: ' + err)
                  );
                }
}


 