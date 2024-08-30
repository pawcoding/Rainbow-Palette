import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DialogService, DialogServiceMock } from '../shared/data-access/dialog.service';
import { ListService, ListServiceMock } from '../shared/data-access/list.service';
import { PaletteService } from '../shared/data-access/palette.service';
import { PaletteServiceMock } from '../shared/data-access/palette.service-mock';
import ListComponent from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListComponent, TranslateModule.forRoot()],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: {} } },
        { provide: ListService, useClass: ListServiceMock },
        { provide: DialogService, useClass: DialogServiceMock },
        { provide: PaletteService, useClass: PaletteServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
