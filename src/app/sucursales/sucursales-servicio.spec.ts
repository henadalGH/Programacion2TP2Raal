import { TestBed } from '@angular/core/testing';

import { SucursalesServicio } from './sucursales-servicio';

describe('SucursalesServicio', () => {
  let service: SucursalesServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SucursalesServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
