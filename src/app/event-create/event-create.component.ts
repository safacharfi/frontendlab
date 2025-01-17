import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Evenement } from 'src/models/event';
import { EvenementService } from 'src/services/event.service';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css'],
})
export class EventCreateComponent {
  form!: FormGroup;
  eventGlobal!: Evenement;
  range = new FormGroup({
    titre: new FormControl(null, [Validators.required]),
    dateDebut: new FormControl<string | null>(null, [Validators.required]),
    dateFin: new FormControl<string | null>(null),
    lieu: new FormControl(null, [Validators.required]),
  });
  constructor(
    private ES: EvenementService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  initForm2(event: Evenement): void {
    this.form = new FormGroup({
      titre: new FormControl(event.titre, [Validators.required]),
      dateDebut: new FormControl(event.dateDebut, [Validators.required]),
      dateFin: new FormControl(event.dateFin, []),
      lieu: new FormControl(event.lieu, [Validators.required]),
    });
  }
  ngOnInit(): void {
    const idCourant1 = this.activatedRoute.snapshot.params['id']; // "1234"
    console.log(idCourant1);
    if (!!idCourant1) {
      // if truly idCourant  // je suis dans edit
      this.ES.getEvenementById(idCourant1).subscribe((event) => {
        this.eventGlobal = event;
        this.initForm2(event);
      });
    }
  }

  OnSubmit(): void {
    // récupérer le contenu
    console.log(this.range.value);

    const event = { ...this.range.value, ...this.eventGlobal };
    // const eventNew = {
    //   ...event,
    //   id: event.id ?? Math.ceil(Math.random() * 1000),
    // };
    this.ES.saveEvenement(event).subscribe(() => {
      this.router.navigate(['/events']);
    });
  }
}
