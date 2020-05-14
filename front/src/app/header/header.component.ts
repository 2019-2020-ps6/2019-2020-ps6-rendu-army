import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RouteService } from 'src/services/route.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private activatedRoute : ActivatedRoute, private routeService : RouteService) { }

  @Input()
  titre: string;

  @Output()
  goBack: EventEmitter<String> = new EventEmitter<String>();

  ngOnInit() {}

  back(){

    switch(this.activatedRoute.snapshot.url[0].path){

      case "quiz-list" : this.router.navigate(['/accueil']); break;
      case "edit-quiz" : this.router.navigate(['/quiz-list']); break;
      case "settings"  : this.goBack.emit(this.routeService.getPreviousUrl()); break;
      case "history" : this.router.navigate(['/accueil']); break;
    }
  }
}
