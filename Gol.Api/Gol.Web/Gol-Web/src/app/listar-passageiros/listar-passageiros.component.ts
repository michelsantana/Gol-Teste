import { Component, OnInit, TemplateRef } from "@angular/core";
import { PassangerService } from "../_services/passanger.service";
import { AirplaneService } from "../_services/airplane.service";
import { Passanger } from "../_models/Passanger";
import { Airplane } from "../_models/Airplane";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { defineLocale, BsLocaleService, ptBrLocale } from "ngx-bootstrap";
import { DateTimeFormatPipe } from "../_helpers/DateTimeFormat.pipe";

defineLocale("pt-br", ptBrLocale);

@Component({
  selector: "app-listar-passageiros",
  templateUrl: "./listar-passageiros.component.html",
  styleUrls: ["./listar-passageiros.component.css"]
})
export class ListarPassageirosComponent implements OnInit {
  passageiros: Passanger[] = [];
  passageiroModel: Passanger;
  flErro = false;
  filtroLista = "";
  registerForm: FormGroup;
  modoEdicao = false;
  aeronaves: Airplane[] = [];
  aeronavesModelos: any = {};

  constructor(
    private passangerService: PassangerService,
    private airplaneService: AirplaneService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private localeService: BsLocaleService,
    private dtFormat: DateTimeFormatPipe
  ) {
    this.localeService.use("pt-br");
  }

  ngOnInit() {
    this.getAllPassangers();
    this.getAllAirplanes();
    this.validation(false);
  }

  openModal(template: any, passangerId?: number) {
    this.registerForm.reset();
    if (passangerId !== null && passangerId > 0) {
      this.modoEdicao = true;
      this.validation(this.modoEdicao);

      this.passageiroModel = this.passageiros.find(f => f.id === passangerId);
      this.registerForm.patchValue(this.passageiroModel);
    } else {
      this.modoEdicao = false;
      this.validation(this.modoEdicao);
    }

    template.show();
  }

  salvarAlteracao(template) {
    if (!this.registerForm.invalid) {
      this.passageiroModel = Object.assign({}, this.registerForm.value);
      console.log(this.passageiroModel);
      if (this.passageiroModel.id > 0) {
        this.passangerService
          .editPassanger(this.passageiroModel)
          .subscribe((novapassageiro: Passanger) => {
            this.passageiros = this.passageiros.map(f =>
              f.id === novapassageiro.id ? novapassageiro : f
            );
            template.hide();
          });
      } else {
        this.passageiroModel.id = 0;
        this.passangerService
          .savePassanger(this.passageiroModel)
          .subscribe((novapassageiro: Passanger) => {
            this.passageiros.push(novapassageiro);
            template.hide();
          });
      }
    }
  }

  deletar(template: any, id: number) {
    this.passangerService.deletePassanger(id).subscribe(response => {
      template.hide();
    });
  }

  validation(isEditing: boolean) {
    if (!isEditing) {
      const objectInclude = {
        id: [""],
        nome: [
          "",
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50)
          ]
        ],
        documento: [
          "",
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50)
          ]
        ],
        airplaneId: ["", Validators.required]
      };
      this.registerForm = this.formBuilder.group(objectInclude);
    } else {
      const objectAlter = {
        id: ["", [Validators.required]],
        nome: [
          "",
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50)
          ]
        ],
        documento: [
          "",
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50)
          ]
        ],
        airplaneId: ["", Validators.required]
      };
      this.registerForm = this.formBuilder.group(objectAlter);
    }
  }

  getAllPassangers() {
    this.passangerService.getAllPassangers().subscribe(
      (passangers: Passanger[]) => {
        console.log(passangers);
        this.passageiros = passangers;
      },
      erro => {
        this.flErro = true;
        this.passageiros = [];
      }
    );
  }

  getAllAirplanes() {
    this.airplaneService.getAllAirplanes().subscribe(
      (airplanes: Airplane[]) => {
        this.aeronaves = airplanes;
        this.aeronaves.forEach(f => {
          this.aeronavesModelos[f.id] = f.modelo;
        });
      },
      erro => {
        this.aeronaves = [];
      }
    );
  }

  getPassangerByAny(search: string) {
    this.passangerService.getPassangerByAny(search).subscribe(
      (passangers: Passanger[]) => {
        this.passageiros = passangers;
      },
      erro => {
        this.flErro = true;
        this.aeronaves = [];
      }
    );
  }

  pesquisar(search: string) {
    if (search !== '') {
      this.getPassangerByAny(search);
    } else {
      this.getAllPassangers();
    }
  }
}
