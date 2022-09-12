import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators  } from '@angular/forms'
import { Moment } from '../../interfaces/Moment'

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.css']
})
export class MomentFormComponent implements OnInit {
  @Input() btnText!: string
  @Input() momentData: Moment | null = null
  @Output() onSubmit = new EventEmitter<Moment>()
  momentForm!: FormGroup
  constructor() { }
  
  ngOnInit(): void {
    this.momentForm = new FormGroup({
      id: new FormControl(this.momentData ? this.momentData?.id : ''),
      title: new FormControl(this.momentData ? this.momentData?.title : '', [Validators.required]),
      description: new FormControl(this.momentData ? this.momentData?.description : '', [Validators.required]),
      image: new FormControl(''),
    })
  }

  get title() {
    return this.momentForm.get('title')!
  }
  get description() {
    return this.momentForm.get('title')!
  }

  submit(){
    if (this.momentForm.invalid) return
    this.onSubmit.emit(this.momentForm.value)
  }

  onFilesSelected(event: any) {
    const file: File = event.target.files[0]
    this.momentForm.patchValue({image: file})
  } 


}
