import { Component, OnInit } from '@angular/core';
import { Moment } from 'src/app/interfaces/Moment';
import { MomentService } from 'src/app/services/moment.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { MessagesService } from 'src/app/services/messages.service';
import { Comment } from 'src/app/interfaces/Comment';
import { CommentService } from 'src/app/services/comment.service';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})
export class MomentComponent implements OnInit {
  moment?: Moment
  baseApiUrl = environment.baseAPIURL

  faTrash = faTrash
  faEdit = faEdit

  commentForm!: FormGroup

  constructor(private readonly momentService: MomentService,
    private readonly route: ActivatedRoute,
    private readonly messageService: MessagesService,
    private readonly router: Router,
    private readonly commentService: CommentService
    ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.momentService.getMoment(id).subscribe(item => this.moment = item.data)
    this.commentForm = new FormGroup({
      text: new FormControl('',                  ),
      username: new FormControl('', [Validators.required])
    })
  }

  get username(){
    return this.commentForm.get('username')!
  }
  get text(){
    return this.commentForm.get('text')!
  }

  async removeHandler(id: number) {
    await this.momentService.removeMoment(id).subscribe()
    this.messageService.add('Moment successfully deleted!')
    setTimeout(() => this.router.navigate(["/"]), 1000)
  }

  async onSubmit(formDirective: FormGroupDirective){
    if(this.commentForm.invalid) return
    const data: Comment = this.commentForm.value
    data.momentId = Number(this.moment!.id)
    console.log(this.commentForm.value)
    await this.commentService.createComments(data).subscribe(comment => {

      this.moment!.comments!.push(comment.data)
    })
    this.messageService.add("Comentário adicionar!")
    this.commentForm.reset()
    formDirective.reset()
  }

}
