import { Component, OnInit, TemplateRef } from "@angular/core";
import { AirplaneService } from "../_services/airplane.service";
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
  selector: "app-listar-aeronaves",
  templateUrl: "./listar-aeronaves.component.html",
  styleUrls: ["./listar-aeronaves.component.css"]
})
export class ListarAeronavesComponent implements OnInit {
  aeronaves: Airplane[] = [];
  aeronaveModel: Airplane;
  flErro = false;
  filtroLista = "";
  registerForm: FormGroup;
  modoEdicao = false;

  constructor(
    private airplaneService: AirplaneService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private localeService: BsLocaleService,
    private dtFormat: DateTimeFormatPipe
  ) {
    this.localeService.use("pt-br");
  }

  ngOnInit() {
    this.getAllAirplanes();
    this.validation(false);
  }

  openModal(template: any, aeronaveId?: number) {
    this.registerForm.reset();
    if (aeronaveId !== null && aeronaveId > 0) {
      this.modoEdicao = true;
      this.validation(this.modoEdicao);

      this.aeronaveModel = this.aeronaves.find(f => f.id === aeronaveId);
      this.registerForm.patchValue(this.aeronaveModel);
    } else {
      this.modoEdicao = false;
      this.validation(this.modoEdicao);
    }

    template.show();
  }

  salvarAlteracao(template) {
    if (!this.registerForm.invalid) {
      this.aeronaveModel = Object.assign({}, this.registerForm.value);
      console.log(this.aeronaveModel);
      if (this.aeronaveModel.id > 0) {
        this.airplaneService
          .editAirplane(this.aeronaveModel)
          .subscribe((novaAeronave: Airplane) => {
            this.aeronaves = this.aeronaves.map(f =>
              f.id === novaAeronave.id ? novaAeronave : f
            );
            template.hide();
          });
      } else {
        this.aeronaveModel.dtCriacao = this.dtFormat.transform(new Date());
        this.aeronaveModel.id = 0;
        this.airplaneService
          .saveAirplane(this.aeronaveModel)
          .subscribe((novaAeronave: Airplane) => {
            this.aeronaves.push(novaAeronave);
            template.hide();
          });
      }
    }
  }

  deletar(template: any, id: number) {
    this.airplaneService.deleteAirplane(id).subscribe(response => {
      template.hide();
    });
  }

  validation(isEditing: boolean) {
    if (!isEditing) {
      const objectInclude = {
        id: [""],
        modelo: [
          "",
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50)
          ]
        ],
        qtdPassageiros: ["", [Validators.required, Validators.max(200)]],
        dtCriacao: [""]
      };
      this.registerForm = this.formBuilder.group(objectInclude);
    } else {
      const objectAlter = {
        id: ["", [Validators.required]],
        modelo: [
          "",
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50)
          ]
        ],
        qtdPassageiros: ["", [Validators.required, Validators.max(200)]],
        dtCriacao: ["", [Validators.required]]
      };
      this.registerForm = this.formBuilder.group(objectAlter);
    }
  }

  getAllAirplanes() {
    this.airplaneService.getAllAirplanes().subscribe(
      (airplanes: Airplane[]) => {
        this.aeronaves = airplanes;
      },
      erro => {
        this.flErro = true;
        this.aeronaves = [];
      }
    );
  }
  getAirplaneByAny(search: string) {
    this.airplaneService.getAirplaneByAny(search).subscribe(
      (airplanes: Airplane[]) => {
        this.aeronaves = airplanes;
      },
      erro => {
        this.flErro = true;
        this.aeronaves = [];
      }
    );
  }

  pesquisar(search: string) {
    if (search !== '') {
      this.getAirplaneByAny(search);
    } else {
      this.getAllAirplanes();
    }
  }
}
