import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TypeSelectPage } from './type-select.page';

describe('TypeSelectPage', () => {
  let component: TypeSelectPage;
  let fixture: ComponentFixture<TypeSelectPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TypeSelectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
