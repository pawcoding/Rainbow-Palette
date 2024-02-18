import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import {
  heroHomeSolid,
  heroQuestionMarkCircleSolid,
} from '@ng-icons/heroicons/solid';
import { TranslateModule } from '@ngx-translate/core';
import { NavigationEntry } from '../../types/navigation-entry';
import { LayoutNavigationComponent } from './layout-navigation.component';

@Component({
  selector: 'rp-dummy',
  template: '',
})
class DummyComponent {}

describe('LayoutNavigationComponent', () => {
  let component: LayoutNavigationComponent;
  let fixture: ComponentFixture<LayoutNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutNavigationComponent, TranslateModule.forRoot()],
      providers: [provideRouter([{ path: '', component: DummyComponent }])],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutNavigationComponent);
    component = fixture.componentInstance;
    //@ts-expect-error
    component.navigationEntries = signal<Array<NavigationEntry>>([
      { path: '/', title: 'Home', description: 'Home', icon: heroHomeSolid },
      {
        path: '/test',
        title: 'Test',
        description: 'Test',
        icon: heroQuestionMarkCircleSolid,
      },
    ]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have navigation entries', () => {
    const navigationEntries: NodeList =
      fixture.nativeElement.querySelectorAll('a');
    expect(navigationEntries).toBeTruthy();
    expect(navigationEntries.length).toBe(2);
  });

  it('should have active navigation entry', () => {
    const activeEntry = fixture.nativeElement.querySelector('a.active');
    expect(activeEntry).toBeTruthy();
  });
});
