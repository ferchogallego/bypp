import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuotesSentPage } from './quotes-sent.page';

describe('QuotesSentPage', () => {
  let component: QuotesSentPage;
  let fixture: ComponentFixture<QuotesSentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotesSentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuotesSentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
