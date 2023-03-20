import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: AppComponent;

  beforeEach(async () => {
    fixture = new AppComponent;
  });

  it('should habe a title', () => {
    expect(fixture.title).toEqual("jest test");
  });

  it('should be performed method sum in AppComponent', () => {
    expect(fixture.sum(1, 2)).toEqual(3);
  });

});
