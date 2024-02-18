import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownMenuComponent } from './dropdown-menu.component';
import { Component, viewChild } from '@angular/core';

@Component({
  template: `
    <rp-dropdown-menu>
      <ng-template #itemTemplate let-item="item">{{ item }}</ng-template>
    </rp-dropdown-menu>
  `,
})
class DropdownWrapperComponent {
  public dropdown = viewChild.required(DropdownMenuComponent);
}

describe('DropdownMenuComponent', () => {
  let component: DropdownMenuComponent<string>;
  let fixture: ComponentFixture<DropdownWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownMenuComponent],
      declarations: [DropdownWrapperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownWrapperComponent);
    const wrapperComponent = fixture.debugElement.componentInstance;
    component = wrapperComponent.dropdown();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
