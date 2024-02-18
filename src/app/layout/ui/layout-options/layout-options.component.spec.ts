import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutOptionsComponent } from './layout-options.component';

describe('LayoutOptionsComponent', () => {
  let component: LayoutOptionsComponent;
  let fixture: ComponentFixture<LayoutOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutOptionsComponent, TranslateModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutOptionsComponent);
    component = fixture.componentInstance;
    //@ts-expect-error
    component.language = signal('en');
    //@ts-expect-error
    component.theme = signal('light');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
