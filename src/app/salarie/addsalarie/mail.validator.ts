import { AbstractControl } from "@angular/forms";

export function custommail(control: AbstractControl): {[key: string]: any} |  null
{

  const customed = !(/@/.test(control.value) );


  return customed ? {'custom':{value:control.value} }  : null ;       

}