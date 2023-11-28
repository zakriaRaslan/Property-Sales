import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IPropertyBase } from '../../Models/IPropertyBase';
import Validation from 'src/app/User/Validators/confirm-password.validator';
import { Property } from '../../Models/Property';
import { AlertifyService } from 'src/app/Shared/Services/alertify.service';
import { HousingService } from 'src/app/Services/housing.service';
@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
})
export class AddPropertyComponent implements OnInit {
  // @ViewChild('Form') addPropertyForm!: NgForm;
  @ViewChild('formTabs') formTabs?: TabsetComponent;
  nextClicked: boolean = false;
  addPropertyForm!: FormGroup;
  propertyType: Array<string> = ['House', 'Apartment', 'Duplex', 'Villa'];
  finishingType: Array<string> = ['Fully', 'Semi', 'Unfurnished'];
  citiesList: any[] = [];
  propertyView: IPropertyBase = {
    Id: 0,
    Name: '',
    Price: undefined,
    SellRent: 0,
    PType: '',
    FType: '',
    BHK: 0,
    BuiltArea: 0,
    City: '',
    RTM: 0,
  };
  property = new Property();
  constructor(
    private route: Router,
    private fb: FormBuilder,
    private alertify: AlertifyService,
    private housingService: HousingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.housingService.getAllCities().subscribe((data) => {
      this.citiesList = data;
    });
    this.CreateAddPropertyForm();
  }

  selectTab(tabId: number, tabIsValid: Boolean) {
    this.nextClicked = true;
    if (tabIsValid && this.formTabs?.tabs[tabId]) {
      this.formTabs.tabs[tabId].active = true;
    }
  }

  CreateAddPropertyForm() {
    this.addPropertyForm = this.fb.group({
      BasicInfo: this.fb.group({
        SellRent: ['1', Validators.required],
        BHK: [null, Validators.required],
        PType: [null, Validators.required],
        FType: [null, Validators.required],
        Name: [null, Validators.required],
        City: [null, Validators.required],
      }),

      PriceInfo: this.fb.group({
        Price: [null, Validators.required],
        BuiltArea: [null, Validators.required],
        CarpetArea: [null],
        Security: [null],
        Maintenance: [null],
      }),

      AddressInfo: this.fb.group({
        FloorNo: [null],
        TotalFloor: [null],
        Address: [null, Validators.required],
        LandMark: [null],
      }),

      OtherInfo: this.fb.group({
        RTM: [null, Validators.required],
        PossessionOn: [null],
        AOP: [null],
        Gated: [null],
        MainEntrance: [null],
        Description: [null],
      }),
    });
  }

  mapProperty(): void {
    this.property.Id = this.housingService.PropertyId();
    this.property.SellRent = +this.SellRent.value;
    this.property.BHK = this.BHK.value;
    this.property.PType = this.PType.value;
    this.property.Name = this.Name.value;
    this.property.City = this.City.value;
    this.property.FType = this.FType.value;
    this.property.Price = this.Price.value;
    this.property.Security = this.Security.value;
    this.property.Maintenance = this.Maintenance.value;
    this.property.BuiltArea = this.BuiltArea.value;
    this.property.CarpetArea = this.CarpetArea.value;
    this.property.FloorNo = this.FloorNo.value;
    this.property.TotalFloor = this.TotalFloor.value;
    this.property.Address = this.Address.value;
    this.property.Address2 = this.LandMark.value;
    this.property.RTM = this.RTM.value;
    this.property.AOP = this.AOP.value;
    this.property.Gated = this.Gated.value;
    this.property.MainEntrance = this.MainEntrance.value;
    this.property.Possession = this.PossessionOn.value;
    this.property.Description = this.Description.value;
    this.property.PostedOn = new Date().toString();
  }

  SubmitForm() {
    this.nextClicked = true;
    if (this.checkValidationForAllTabs()) {
      this.mapProperty();
      this.housingService.addProperty(this.property);
      this.alertify.Success(
        'Congrats, Your Property Listed Successfully On Our WebSite. Thanks'
      );

      if (this.SellRent.value === '2') {
        this.router.navigate(['/rent-property']);
      } else {
        this.router.navigate(['/']);
      }
    } else {
      this.alertify.Error(
        'Please review the form and provide all valid entries'
      );
    }
  }

  checkValidationForAllTabs(): Boolean {
    if (!this.BasicInfo.valid) {
      this.nextClicked = true;
      if (this.formTabs?.tabs[0]) {
        this.formTabs.tabs[0].active = true;
      }
      return false;
    }
    if (!this.PriceInfo.valid) {
      this.nextClicked = true;
      if (this.formTabs?.tabs[1]) {
        this.formTabs.tabs[1].active = true;
      }
      return false;
    }
    if (!this.AddressInfo.valid) {
      this.nextClicked = true;
      if (this.formTabs?.tabs[2]) {
        this.formTabs.tabs[2].active = true;
      }
      return false;
    }
    if (!this.OtherInfo.valid) {
      this.nextClicked = true;
      if (this.formTabs?.tabs[3]) {
        this.formTabs.tabs[3].active = true;
      }
      return false;
    }
    return true;
  }
  GoBack() {
    this.route.navigate(['/']);
  }
  //#region <Getter Methods>
  // #region <FormGroups>
  get BasicInfo() {
    return this.addPropertyForm.get('BasicInfo') as FormGroup;
  }

  get PriceInfo() {
    return this.addPropertyForm.get('PriceInfo') as FormGroup;
  }

  get AddressInfo() {
    return this.addPropertyForm.get('AddressInfo') as FormGroup;
  }

  get OtherInfo() {
    return this.addPropertyForm.get('OtherInfo') as FormGroup;
  }
  // #endregion

  //#region <Form Controls>
  get SellRent() {
    return this.BasicInfo.get('SellRent') as FormControl;
  }

  get BHK() {
    return this.BasicInfo.get('BHK') as FormControl;
  }

  get PType() {
    return this.BasicInfo.get('PType') as FormControl;
  }

  get FType() {
    return this.BasicInfo.get('FType') as FormControl;
  }

  get Name() {
    return this.BasicInfo.get('Name') as FormControl;
  }

  get City() {
    return this.BasicInfo.get('City') as FormControl;
  }

  get Price() {
    return this.PriceInfo.get('Price') as FormControl;
  }

  get BuiltArea() {
    return this.PriceInfo.get('BuiltArea') as FormControl;
  }

  get CarpetArea() {
    return this.PriceInfo.get('CarpetArea') as FormControl;
  }

  get Security() {
    return this.PriceInfo.get('Security') as FormControl;
  }

  get Maintenance() {
    return this.PriceInfo.get('Maintenance') as FormControl;
  }

  get FloorNo() {
    return this.AddressInfo.get('FloorNo') as FormControl;
  }

  get TotalFloor() {
    return this.AddressInfo.get('TotalFloor') as FormControl;
  }

  get Address() {
    return this.AddressInfo.get('Address') as FormControl;
  }

  get LandMark() {
    return this.AddressInfo.get('LandMark') as FormControl;
  }

  get RTM() {
    return this.OtherInfo.get('RTM') as FormControl;
  }

  get PossessionOn() {
    return this.OtherInfo.get('PossessionOn') as FormControl;
  }

  get AOP() {
    return this.OtherInfo.get('AOP') as FormControl;
  }

  get Gated() {
    return this.OtherInfo.get('Gated') as FormControl;
  }

  get MainEntrance() {
    return this.OtherInfo.get('MainEntrance') as FormControl;
  }

  get Description() {
    return this.OtherInfo.get('Description') as FormControl;
  }

  //#endregion
  //#endregion
}
