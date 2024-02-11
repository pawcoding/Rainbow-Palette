import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutFooterComponent } from './layout-footer.component';

describe('LayoutFooterComponent', () => {
  const logoAsset = '/assets/rainbow-palette-dark.svg'

  let component: LayoutFooterComponent;
  let fixture: ComponentFixture<LayoutFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutFooterComponent, TranslateModule.forRoot()],
      providers: [{ provide: ActivatedRoute, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutFooterComponent);
    component = fixture.componentInstance;
    //@ts-ignore
    component.logoAsset = signal(logoAsset);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a logo', () => {
    const logo = fixture.nativeElement.querySelector('img');
    expect(logo).toBeTruthy();
    expect(logo.src).toContain(logoAsset);
  });
});
