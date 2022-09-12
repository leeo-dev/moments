import { Component, OnInit } from '@angular/core';
import { MomentService } from 'src/app/services/moment.service';
import { Moment } from 'src/app/interfaces/Moment';
import { environment } from 'src/environments/environment';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allMoments: Moment[] = []
  moments: Moment[] = []
  baseApiUrl = environment.baseAPIURL
  faSearch = faSearch
  searchTerm: string = ''

  constructor(private readonly momentService: MomentService) { }

  ngOnInit(): void {
    this.momentService.getMoments().subscribe((item) => {
      const data = item.data
      data.map(item => {
        item.created_at = new Date(item.created_at).toLocaleDateString('pt-BR')
      })
      this.allMoments = data
      this.moments = data
    })
  }

  search({target}: Event){
    const term = target as HTMLInputElement
    const value = term.value
    
    this.moments = this.allMoments.filter(moment => moment?.title.toLowerCase().includes(value))
  }

}
