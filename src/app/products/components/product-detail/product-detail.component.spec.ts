import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ActivatedRouteStub, asyncData, getText, mockObservable } from 'src/testing';

import { ProductDetailComponent } from './product-detail.component';
import { ProductsService } from 'src/app/services/product.service';
import { generateOneProduct } from 'src/app/models/product.mock';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let route: ActivatedRouteStub;
  let productService: jasmine.SpyObj<ProductsService>;
  let location: jasmine.SpyObj<Location>;

  beforeEach(async () => {
  const routeSub = new ActivatedRouteStub();
  const productServceSpy = jasmine.createSpyObj('ProductsService', ['getOne']);
  const locationSpy = jasmine.createSpyObj('Location', ['back']);

    await TestBed.configureTestingModule({
      declarations: [ ProductDetailComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: routeSub },
        { provide: ProductsService, useValue: productServceSpy },
        { provide: Location, useValue: locationSpy },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;
    productService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    location =  TestBed.inject(Location) as jasmine.SpyObj<Location>;

  });

  it('should create', () => {
    const productId = '1';
    route.setParamMap({ id: productId });

    const productmock = {
      ...generateOneProduct(),
      id: productId,
    }

    productService.getOne.and.returnValue(mockObservable(productmock));
    fixture.detectChanges(); // ngOnInit
    expect(component).toBeTruthy();
  });

  it('should show the product in the view', () => {
    const productId = '2';
    route.setParamMap({ id: productId });

    const productmock = {
      ...generateOneProduct(),
      id: productId,
    }

    productService.getOne.and.returnValue(mockObservable(productmock));

    fixture.detectChanges(); // ngOnInit

    const titleText = getText(fixture, 'title');
    const priceText = getText(fixture, 'price');
    expect(titleText).toContain(productmock.title);
    expect(priceText).toContain(productmock.price);
    expect(productService.getOne).toHaveBeenCalledWith(productId);
  });

  it('should go to back without id params', () => {
    route.setParamMap({ });

    location.back.and.callThrough(); //mocking

    fixture.detectChanges(); // ngOnInit

    expect(location.back).toHaveBeenCalled();
  });

  it('should change the status "loading" => "success"', fakeAsync(() => {
    //Arrange
    const productId = '2';
    route.setParamMap({ id: productId });

    const productmock = {
      ...generateOneProduct(),
      id: productId,
    }

    productService.getOne.and.returnValue(asyncData(productmock));

    //Act
    fixture.detectChanges(); // ngOnInit
    //Asserts
    expect(component.status).toEqual('loading');

    tick(); /// ejecuta solicitud pendiente
    fixture.detectChanges();
    expect(component.status).toEqual('success');
    expect(productService.getOne).toHaveBeenCalledWith(productId);
  }));

  it('should typeCustomer be "customer"', () => {
    //Arrange
    const productId = '2';
    route.setParamMap({ id: productId });
    route.setQueryParamMap({ type: 'customer' });

    const productmock = {
      ...generateOneProduct(),
      id: productId,
    }
    productService.getOne.and.returnValue(mockObservable(productmock));

    //Act
    fixture.detectChanges(); // ngOnInit
    //Asserts
    fixture.detectChanges();
    expect(component.typeCustomer).toEqual('customer');
  });
});
