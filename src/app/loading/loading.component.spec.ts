import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MobileService,
  MobileServiceMock,
} from '../shared/data-access/mobile.service';
import {
  ThemeService,
  ThemeServiceMock,
} from '../shared/data-access/theme.service';
import { LoadingComponent } from './loading.component';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingComponent],
      providers: [
        { provide: ThemeService, useClass: ThemeServiceMock },
        { provide: MobileService, useClass: MobileServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
