import { TestBed } from '@angular/core/testing';

import { VentasServicio } from './ventas-servicio';

describe('VentasServicio', () => {
  let service: VentasServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VentasServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
