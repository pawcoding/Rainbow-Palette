import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PaletteListItem } from '../../../shared/data-access/list.service';
import { PaletteListComponent } from './palette-list.component';

describe('PaletteListComponent', () => {
  let component: PaletteListComponent;
  let fixture: ComponentFixture<PaletteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaletteListComponent, TranslateModule.forRoot()],
      providers: [{ provide: ActivatedRoute, useValue: {} }]
    }).compileComponents();

    fixture = TestBed.createComponent(PaletteListComponent);
    component = fixture.componentInstance;

    // @ts-expect-error Input is required
    component.list = signal<Array<PaletteListItem>>([
      {
        id: 'palette1',
        name: 'Rainbow'
      }
    ]);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
