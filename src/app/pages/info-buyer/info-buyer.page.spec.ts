import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfoBuyerPage } from './info-buyer.page';

describe('InfoBuyerPage', () => {
  let component: InfoBuyerPage;
  let fixture: ComponentFixture<InfoBuyerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoBuyerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoBuyerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
