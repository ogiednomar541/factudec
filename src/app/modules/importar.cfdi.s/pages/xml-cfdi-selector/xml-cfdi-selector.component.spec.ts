import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XmlCfdiSelectorComponent } from './xml-cfdi-selector.component';

describe('XmlCfdiSelectorComponent', () => {
  let component: XmlCfdiSelectorComponent;
  let fixture: ComponentFixture<XmlCfdiSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XmlCfdiSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XmlCfdiSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
