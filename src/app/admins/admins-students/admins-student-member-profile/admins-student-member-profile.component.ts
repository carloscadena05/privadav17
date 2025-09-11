import { Location } from '@angular/common';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { constants } from 'src/app/_shared/constants/constants';
import { MemberDataService } from 'src/app/_shared/data/member-data.service';
import { MiscDataService } from 'src/app/_shared/data/misc-data.service';
import { SELECTITEM } from 'src/app/_shared/interfaces/SELECTITEM';
import { Member } from 'src/app/_shared/models/member';
import { ProviderService } from 'src/app/_shared/services/provider.service';
import { UrlService } from 'src/app/_shared/services/url.service';
import { StudentState } from 'src/app/_store/student/student.state';
import { vector_map } from 'src/assets/json/vector';

declare let ol: any;
declare let olms: any;

export interface ReverseGeocoding {
  place_id: string,
  licence: string,
  osm_type: string,
  osm_id: string,
  lat: string,
  lon: string,
  display_name: string,
  address: {
    house_number: string,
    road: string,
    quarter: string,
    city: string,
    county: string,
    state: string,
    postcode: string,
    country: string,
    country_code: string
  },
  boundingbox: string[]
}

export interface ForwardGeocoding {
  place_id: string
  licence: string
  osm_type: string
  osm_id: string
  boundingbox: string[],
  lat: string
  lon: string
  display_name: string
  class: string
  type: string
  importance: number
}


@Component({
  selector: 'app-admins-student-member-profile',
  templateUrl: './admins-student-member-profile.component.html',
  styleUrls: ['./admins-student-member-profile.component.scss'],
  standalone: false
})
export class AdminsStudentMemberDataComponent implements OnInit {
  myForm: UntypedFormGroup;
  data: Object;
  isLoading: boolean;
  submitted: boolean;
  // bReadOnly = true;

  // studentStatuses: SELECTITEM[];
  languageStatuses: SELECTITEM[];
  schoolTypes: SELECTITEM[];
  joinedYears: SELECTITEM[];
  gradYears: SELECTITEM[];
  gradMonths: SELECTITEM[];
  credentialYears: SELECTITEM[];
  credentialMonths: SELECTITEM[];
  genders: SELECTITEM[];


  errorMessage: string;
  successMessage: string;
  firstNames: string;
  lastNames: string;
  member: Member;
  photoPathname: string;
  studentGUIdParam: string;
  sponsorGroupIdParam: number;
  emojiPathname: string;
  showEditLink = false;
  webPrefix: string;
  private subscription: Subscription;
  studentName: string;

  currentName$ = this.store.select<string>(StudentState.getSelectedStudentName);
  @ViewChild('mapContainer') mapContainer!: ElementRef;
  @ViewChild('mapContainer2') mapContainer2!: ElementRef;
  lngLat1: any; // Para el primer mapa
  lngLat2: any; // Para el segundo mapa

  location_key = 'pk.e6c80df2d2ce1f89466be47a2a0ecd9f';
  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    public urlService: UrlService,
    public memberData: MemberDataService,
    public miscData: MiscDataService,
    public formBuilder: UntypedFormBuilder,
    public location: Location,
    public store: Store,
    public provider: ProviderService
  ) {
    console.log('hi from AdminsStudent constructor');
    this.webPrefix = urlService.getClientUrl();

    this.languageStatuses = constants.languageStatuses;

    this.myForm = formBuilder.group({
      firstNames: ['',
        Validators.compose([Validators.required, Validators.maxLength(30)])],
      lastNames: [{ value: '' }, Validators.compose([Validators.required, Validators.maxLength(30)])],
      email: [{ value: '' }, Validators.compose([Validators.required, Validators.email, Validators.maxLength(50)])],
      cellPhone: [{ value: '' }, Validators.compose([Validators.maxLength(13)])],
      nickName: [{ value: '' }, Validators.maxLength(20)],
      photoUrl: [{ value: '' }, Validators.maxLength(255)],

      englishSkillLevelId: [{ value: '' }],

      local_HouseNumber: [''],
      smA_Address: [''],
      colonia: [''],
      local_City: [''],
      local_StateProvince: [''],
      local_PostalCode: [''],

      nonSMA_HouseNumber: [''],
      nonSMA_Address: [''],
      nonSMA_Colonia: [''],
      nonSMA_City: [''],
      nonSMA_StateProvince: [''],
      nonSMA_PostalCode: [''],

    });
    this.myForm.disable();
    console.log(this.myForm.controls);


    this.member = new Member();

    this.errorMessage = '';
    this.successMessage = '';
    this.submitted = false;
  }

  ngOnInit() {
    console.log('admins Member ngOnInit');
    this.studentGUIdParam = this.currRoute.snapshot.params['guid'];
    console.log('student student-data with studentGUIdParam: ' + this.studentGUIdParam);
    this.fetchMemberData();
    this.subscribeForStudentNames();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.map();
    }, 1000);
  }

  subscribeForStudentNames() {
    this.subscription = this.currentName$.subscribe((message) => {
      console.log('subscribeForStudentName received with message [' + message + ']');
      this.studentName = message;
      console.log('************NGXS: student-as-member profile new StudentName received' + this.studentName);
    });
  }

  fetchMemberData() {
    console.log('studentMember with StudentGUId: ' + this.studentGUIdParam);
    this.isLoading = true;
    this.memberData.getMemberByStudentGUId(this.studentGUIdParam).subscribe(
      (data) => {
        this.member = data;
        console.log(data);

        this.photoPathname = this.webPrefix + '/assets/images/MemberPhotos';
        this.photoPathname = this.photoPathname + '/' + this.member.photoUrl;
        console.log('photoPathname is ' + this.photoPathname);
      },
      (err) => console.error('Subscribe error: ' + err),
      () => {
        console.log('getMember is done with member values ');
        console.log(JSON.stringify(this.member));
        this.setFormValues(this.member);
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 0);
        this.isLoading = false;
      }
    );

    this.myForm.valueChanges.subscribe(() => {
      this.errorMessage = '';
      this.successMessage = '';
      this.submitted = false;
    });
  }

  setFormValues(member: Member) {
    console.log('setFormValues');
    console.log(this.myForm);
    console.log(this.myForm.controls);
    console.log('before call');
    this.myForm.setValue({
      firstNames: member.firstNames,
      lastNames: member.lastNames,
      email: member.email,
      cellPhone: member.cellPhone,
      nickName: member.nickName,
      photoUrl: '', // member.photoUrl,
      englishSkillLevelId: member.englishSkillLevelId,

      local_HouseNumber: member.local_HouseNumber ?? '',
      smA_Address: member.smA_Address ?? '',
      colonia: member.colonia ?? '',
      local_City: member.local_City ?? '',
      local_StateProvince: member.local_StateProvince ?? '',
      local_PostalCode: member.local_PostalCode ?? '',

      nonSMA_HouseNumber: member.nonSMA_HouseNumber ?? '',
      nonSMA_Address: member.nonSMA_Address ?? '',
      nonSMA_Colonia: member.nonSMA_Colonia ?? '',
      nonSMA_City: member.nonSMA_City ?? '',
      nonSMA_StateProvince: member.nonSMA_StateProvince ?? '',
      nonSMA_PostalCode: member.nonSMA_PostalCode ?? ''
    });
  }

  retrieveFormValues(): void {
    console.log('retrieveFormValues ' + JSON.stringify(this.myForm.value));
    // use spread operator to merge changes:
    this.member = { ...this.member, ...this.myForm.value };
  }

  saveMyForm(): boolean {
    console.log('saving admin member ');
    this.isLoading = true;
    this.retrieveFormValues();
    this.memberData.updateMember(this.member).subscribe(
      () => {
        // console.log('subscribe result in updateStudent');
        // need timeout to avoid "Expression has changed error"
        window.setTimeout(() => {
          this.successMessage = 'Changes were saved successfully.';
        }, 0);
        // this.successMessage = 'Changes were saved successfully.';
        this.submitted = true;
        this.isLoading = false;
        window.scrollTo(0, 0);
        window.setTimeout(() => {
          // console.log('clearing success message');
          this.successMessage = '';
        }, 3000);
      },
      (error) => {
        this.errorMessage = error;
        this.isLoading = false;
      }
    );
    // prevent default action of reload
    return false;
  }

  scrollIntoView() {
    const element = document.body;
    if (element) {
      element.scrollIntoView(true);
    }
  }

  backToStudentsList() {
    this.router.navigate(['/admins/students']);
  }

  public hasChanges() {
    // if have changes then ask for confirmation
    // ask if form is dirty and has not just been submitted

    console.log('hasChanges has submitted ' + this.submitted);
    console.log('hasChanges has form dirty ' + this.myForm.dirty);
    console.log('hasChanges net is ' + this.myForm.dirty || this.submitted);
    return this.myForm.dirty && !this.submitted;
  }

  setReadOnly() {
    console.log('toggle readOnly');
    if (this.myForm.enabled) {
      this.myForm.disable();
      this.showEditLink = false;
    } else {
      this.myForm.enable();
      this.showEditLink = true;
    }

  }
  onDateSelect() {
    alert('data selected');
  }

  value_select(a: any, b: any): boolean {
    return a == b;
  }

  map() {
    this.renderMap(this.mapContainer?.nativeElement, 'map1');
    this.renderMap(this.mapContainer2?.nativeElement, 'map2');
  }

  async renderMap(container: any, mapId: string) {
    if (!container) {
      console.error('Elemento map no encontrado para', mapId);
      return;
    }

    let styleJson = 'https://tiles.locationiq.com/v3/streets/vector.json?key=' + this.location_key;

    let long_lat = [-100.74385216511205, 20.914767216979897]
    if (mapId == 'map1' && this.myForm.value.smA_Address && this.myForm.value.local_HouseNumber) {
      const address: ForwardGeocoding[] = await this.forward_geocoding(1)
      this.lngLat1 = long_lat = [Number(address[0].lon), Number(address[0].lat)]
      this.reverse_geocoding(1)
    } else if (mapId == 'map2' && this.myForm.value.nonSMA_Address  && this.myForm.value.nonSMA_HouseNumber) {
      const address: ForwardGeocoding[] = await this.forward_geocoding(2)
      this.lngLat1 = long_lat = [Number(address[0].lon), Number(address[0].lat)]
      this.reverse_geocoding(2)
    }
    const map = new ol.Map({
      target: container,
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat(long_lat),
        zoom: 16
      })
    });

    // Crear marcador
    let marker = new ol.Feature({
      geometry: new ol.geom.Point(
        ol.proj.fromLonLat(long_lat)
      ),
    });

    // Estilo del marcador
    marker.setStyle(new ol.style.Style({
      image: new ol.style.Icon({
        scale: 1,
        src: '/assets/images/svg/location.svg',
      })
    }));

    // Fuente vectorial y capa
    let vectorSource = new ol.source.Vector({
      features: [marker]
    });

    let vectorLayer = new ol.layer.Vector({
      source: vectorSource,
      zIndex: 1
    });

    map.addLayer(vectorLayer);

    // Interacción de arrastre
    let translate = new ol.interaction.Translate({
      features: new ol.Collection([marker])
    });

    map.addInteraction(translate);

    // Evento de arrastre
    translate.on('translateend', async (e) => {
      if (e.dragging) return;
      let coordinate = e.coordinate;
      const lngLat = ol.proj.toLonLat(coordinate);

      // Guardar coordenadas según el mapa
      if (mapId === 'map1') {
        this.lngLat1 = lngLat;
      } else {
        this.lngLat2 = lngLat;
      }

      console.log(`${mapId} coordinates:`, lngLat);
    });

    // Evento de clic
    map.on('click', (e) => {
      let coordinate = e.coordinate;
      const lngLat = ol.proj.toLonLat(coordinate);

      // Actualizar marcador y coordenadas
      marker.setGeometry(new ol.geom.Point(ol.proj.fromLonLat(lngLat)));

      // Guardar coordenadas según el mapa
      if (mapId === 'map1') {
        this.lngLat1 = lngLat;
      } else {
        this.lngLat2 = lngLat;
      }

      console.log(`${mapId} click coordinates:`, lngLat);
    });

    // Aplicar estilo
    olms.apply(map, styleJson).then(() => {
      console.log(`Mapa ${mapId} cargado correctamente`);
      map.updateSize();
    }).catch((error: any) => {
      console.error(`Error al cargar el estilo para ${mapId}:`, error);
    });
  }

  async forward_geocoding(mapNumber: number): Promise<ForwardGeocoding[]> {
    try {
      let response: ForwardGeocoding[];
      const f = this.myForm.value
      if (mapNumber == 1) {
        if (this.myForm.value.cellPhone.includes('415') && !this.myForm.value.local_City)
          this.myForm.value.local_City = 'San Miguel de Allende'
        else if (this.myForm.value.cellPhone.includes('418') && !this.myForm.value.local_City)
          this.myForm.value.local_City = 'Dolores Hidalgo'
        else if ((this.myForm.value.cellPhone.includes('412') || this.myForm.value.cellPhone.includes('461')) && !this.myForm.value.local_City)
          this.myForm.value.local_City = 'Comonfort'

        const add = [
          f.smA_Address && `street=${encodeURIComponent(f.smA_Address.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))}`,
          f.colonia && `quarter=${encodeURIComponent(f.colonia.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))}`,
          f.local_City && `city=${encodeURIComponent(f.local_City.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))}`,
          `state=${encodeURIComponent('Guanajuato')}`,
          `country=${encodeURIComponent('Mexico')}`,
          f.local_PostalCode && `postalcode=${encodeURIComponent(f.local_PostalCode)}`
        ].filter(Boolean).join('&');

        const finalString = add ? `&${add}` : '';
        response = await this.provider.production(
          'GET',
          `https://us1.locationiq.com/v1/search/structured?key=${this.location_key}&${finalString}&format=json&addressdetails=1`
        );
      } else {
        const add = [
          f.nonSMA_Address && `street=${encodeURIComponent(f.nonSMA_Address.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))}`,
          f.nonSMA_Colonia && `quarter=${encodeURIComponent(f.nonSMA_Colonia.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))}`,
          f.nonSMA_City && `city=${encodeURIComponent(f.nonSMA_City.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))}`,
          f.nonSMA_StateProvince && `state=${encodeURIComponent(f.nonSMA_StateProvince.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))}`,
          `country=${encodeURIComponent('Mexico')}`,
          f.nonSMA_PostalCode && `postalcode=${encodeURIComponent(f.nonSMA_PostalCode)}`
        ].filter(Boolean).join('&');

        const finalString = add ? `&${add}` : '';
        response = await this.provider.production(
          'GET',
          `https://us1.locationiq.com/v1/search/structured?key=${this.location_key}&${finalString}&format=json&addressdetails=1`
        );
      }

      console.log(response);
      return response;
    } catch (e) {

    }
  }

  async reverse_geocoding(mapNumber: number) {
    const lngLat = mapNumber === 1 ? this.lngLat1 : this.lngLat2;

    if (!lngLat) {
      console.error('No hay coordenadas para el mapa', mapNumber);
      return;
    }

    console.log('Reverse geocoding for map', mapNumber, lngLat);

    try {
      const response: ReverseGeocoding = await this.provider.production(
        'GET',
        `https://us1.locationiq.com/v1/reverse?key=${this.location_key}&lat=${lngLat[1]}&lon=${lngLat[0]}&format=json&normalizeaddress=1`
      );

      console.log('Reverse geocoding response:', response);

      // Actualizar el formulario según el mapa
      if (mapNumber === 1) {
        this.myForm.patchValue({
          local_HouseNumber: response.address.house_number,
          smA_Address: response.address.road,
          colonia: response.address.quarter,
          local_City: response.address.city,
          local_StateProvince: response.address.state,
          local_PostalCode: response.address.postcode,
        });
        console.log(response.address, this.myForm.value);
        
      } else {
        this.myForm.patchValue({
          nonSMA_HouseNumber: response.address.house_number,
          nonSMA_Address: response.address.road,
          nonSMA_Colonia: response.address.quarter,
          nonSMA_City: response.address.city,
          nonSMA_StateProvince: response.address.state,
          nonSMA_PostalCode: response.address.postcode,
        });
      }

    } catch (error) {
      console.error('Error en reverse geocoding:', error);
    }
  }



  patch_non_sma() {
    this.myForm.patchValue({
      nonSMA_HouseNumber: this.myForm.value.local_HouseNumber,
      nonSMA_Address: this.myForm.value.smA_Address,
      nonSMA_Colonia: this.myForm.value.colonia,
      nonSMA_City: this.myForm.value.local_City,
      nonSMA_StateProvince: this.myForm.value.local_StateProvince,
      nonSMA_PostalCode: this.myForm.value.local_PostalCode,
    });
  }
}
