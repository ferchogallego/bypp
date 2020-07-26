import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuotesAcceptedPage } from './quotes-accepted.page';

describe('QuotesAcceptedPage', () => {
  let component: QuotesAcceptedPage;
  let fixture: ComponentFixture<QuotesAcceptedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotesAcceptedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuotesAcceptedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
