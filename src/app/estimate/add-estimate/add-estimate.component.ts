import { Component,Inject,OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { EstimateService } from '../service/estimate.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-add-estimate',
  templateUrl: './add-estimate.component.html',
  styleUrls: ['./add-estimate.component.scss']
})
export class AddEstimateComponent implements OnInit {

  estimates:any[]=[];

  estimateForm:FormGroup;
 
  constructor(
    private _fb:FormBuilder,
    private _http:HttpClient,
    private _snackBar:MatSnackBar,
    private _estimateService:EstimateService,
    private _formBuilder:FormBuilder,
    private _dialogRef:DialogRef<AddEstimateComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
    ){
      this.estimateForm = this._fb.group({
        contact_name:['',Validators.required],
        total:['',Validators.required],
        status:['',Validators.required],
        date:['',Validators.required]
      })
    }
 
    ngOnInit(): void {

      this.estimateForm.patchValue(this.data);

      this._http.get<any[]>('http://localhost:3000/estimates').subscribe(data=>{
        this.estimates = data;
      })  
    }

    onSubmit(){
      if(this.estimateForm.valid){
        if(this.data){
          this._estimateService.updateEstimate(this.data.id,this.estimateForm.value).subscribe({
            next:(val:any)=>{
              this._snackBar.open('Estimate edited successfully','OK',{
                horizontalPosition:'center',
                verticalPosition:'top',
              });
              this._dialogRef.close();
            },
            error:(err:any)=>{
            this._snackBar.open('An error occured unable to edit an estimate','OK',{
              horizontalPosition:'center',
              verticalPosition:'top',
            })
            }
          })

        }else{
          this._estimateService.addEstimate(this.estimateForm.value).subscribe({
            next:(val:any)=>{
              this._snackBar.open('Estimate added successfully','OK',{
                horizontalPosition:'center',
                verticalPosition:'top',
              });
              this._dialogRef.close();
            },
            error:(err:any)=>{
              this._snackBar.open('An error occured unable to add an estimate','OK',{
                horizontalPosition:'center',
                verticalPosition:'top',
              })
            }
          })
        }
      }else{
        this._snackBar.open('An error occured','OK');
      }
    }

    get f (){
      return this.estimateForm.controls;
    }
}
