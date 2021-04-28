import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/general.service';
import { Elector } from 'src/app/models/elector';
import { Representante } from 'src/app/models/representante';
import { NotifierService } from 'angular-notifier';
import { VoteWho } from 'src/app/models/voteWho';

@Component({
  selector: 'app-representantes',
  templateUrl: './representantes.component.html',
  styleUrls: ['./representantes.component.css'],
})
export class RepresentantesComponent implements OnInit {
  public represenList: Array<Representante> = new Array<Representante>();
  public email: string = '';
  private readonly notifier: NotifierService;
  public validEmail: boolean = false;
  public voteList: Array<VoteWho> = new Array<VoteWho>();
  public electorId: number = 0;
  public votesNumber: number = 0;

  constructor(
    private general: GeneralService,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.getRepresentantes();
  }

  getRepresentantes() {
    this.general.getService('representantes').subscribe((res) => {
      this.represenList = res;
    });
  }

  voteElect(e, id: number) {
    if (this.votesNumber < 3 && e.target.checked) {
      this.addVote(id);
    } else if (!e.target.checked) {
      this.delVote(id);
    } else if (this.votesNumber >= 3 && e.target.checked) {
      this.notifier.notify(
        'warning',
        'Solo tiene permitido votar por 3 personas.'
      );

      e.target.checked = false;
    }
  }

  delVote(id: number) {
    this.votesNumber--;
    let index: number = 0;
    this.voteList.forEach((item) => {
      if (item.represent_id == id) {
        this.voteList.splice(index, 1);
      }
      index++;
    });
  }

  addVote(id: number) {
    this.votesNumber++;
    let vote: VoteWho = new VoteWho();
    vote.elector_id = this.electorId;
    vote.represent_id = id;
    this.voteList.push(vote);
  }

  canSelectVote() {
    if (this.validEmail) {
      return false;
    } else {
      return true;
    }
  }

  canVote() {
    if (this.votesNumber == 3) {
      return false;
    } else {
      return true;
    }
  }

  letsVote() {
	  console.log('LISTA DE VOTOS::: ', this.voteList)
    this.general.postService('votes', this.voteList).subscribe(
      (res) => {
        if (res.data.rpt) {
          this.notifier.notify('success', res.data.message);
        } else {
          this.notifier.notify('warning', res.data.message);
        }
      },
      (err) => {
        console.error(err);
      }
    );
  }

  emailChange(): boolean | void {
    //console.log('hacele omeeee ', this.email)
    this.general.getService('votes/' + this.email).subscribe(
      (res) => {
        let elector: Elector = new Elector();
        elector = res;
		    console.log('este es el elector:::: ', res)
        if (elector != null && elector.id > 0 && elector.id != null) {          
          this.validEmail = true;
          this.electorId = elector.id;
          return true;
        } else {
          this.notifier.notify(
            'warning',
            'Su correo no se encuentra registrado o ya realizo la votacion.'
          );
          this.validEmail = false;          
          return false;
        }
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
