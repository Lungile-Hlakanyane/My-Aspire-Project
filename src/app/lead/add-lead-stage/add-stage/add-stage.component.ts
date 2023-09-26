import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { AddStageService } from '../service/add-stage.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-add-stage',
  templateUrl: './add-stage.component.html',
  styleUrls: ['./add-stage.component.scss']
})
export class AddStageComponent implements OnInit {

  leadStages:any[]=[];
  stageForm:FormGroup;

  constructor(
    private _dialogRef:MatDialogRef<AddStageComponent>,
    private _fb:FormBuilder,
    private _snackBar:MatSnackBar,
    private _http:HttpClient,
    private _addStageService:AddStageService,
    @Inject(MAT_DIALOG_DATA) public data:any
    ){
      this.stageForm = this._fb.group({
        stage_name:['',Validators.required]
      })
    }

    ngOnInit(): void {
      this.stageForm.patchValue(this.data);

      this._http.get<any[]>('http://localhost:3000/stages').subscribe(data=>{
        this.leadStages = data;
      })
    }

  onCancelClick(){
    this._dialogRef.close();
  }

  get f (){
    return this.stageForm.controls;
  }

  addStage(){
    if(this.stageForm.valid){

      const stageName = this.stageForm.get('stage_name')?.value;

      const newStage = {name:stageName};

      this._addStageService.addStage(newStage).subscribe(response=>{
        this._snackBar.open('Stage added successfully','Ok');

        this._dialogRef.close(stageName);
      },
      error=>{
        this._snackBar.open('Error adding a stage', 'Close');
      }
    )  
   }
  }

  onSubmit(){
    if(this.data){
      this._addStageService.updateStage(this.data.id,this.stageForm.value).subscribe({
        next:(val:any)=>{
          this._snackBar.open('Stage details edited successfully','Ok');
          this._dialogRef.close();
        },
        error:(err:any)=>{
          this._snackBar.open('An error occured unable to update the stage','Ok');
        }
      })
    }else{
      this._addStageService.addStage(this.stageForm.value).subscribe({
        next:(val:any)=>{
          this._snackBar.open('Lead stage added successfully','OK');
           this._dialogRef.close();
         },
         error:(err:any)=>{
           this._snackBar.open('An error occured unable to add a stage','OK');
         }
      })
    }
  }
}
