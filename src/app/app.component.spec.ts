import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

import { RouterLinkDirectiveStub, queryAllByDirective } from './../testing';
import { NO_ERRORS_SCHEMA, Component } from '@angular/core';

@Component({
  selector: 'app-footer'
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
class FooterComponentStub{}

@Component({
  selector: 'app-banner'
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
class BannerComponentStub{}

fdescribe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        FooterComponentStub,
        BannerComponentStub,
        RouterLinkDirectiveStub
      ],
      //schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should there are 7 routerLinks', ()=>{
    const links = queryAllByDirective(fixture, RouterLinkDirectiveStub);
    expect(links.length).toEqual(7);
  });

  it('should there are 7 routerLinks with matches  router', ()=>{
    const links = queryAllByDirective(fixture, RouterLinkDirectiveStub);
    const routerLinks = links.map(link => link.injector.get(RouterLinkDirectiveStub ));
    expect(links.length).toEqual(7);
    expect(routerLinks[0].linkParams).toEqual('/');
    expect(routerLinks[1].linkParams).toEqual('/auth/register');
  })


});

