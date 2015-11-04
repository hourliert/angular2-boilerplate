 /*
  * TODO: ES5 for now until I make a webpack plugin for protractor
  */
describe('App', function() {

  beforeEach(function() {
    browser.get('/');
  });


  it('should have a title', function() {
    var subject = browser.getTitle();
    var result  = 'Angular2 Boilerplate';
    expect(subject).toEqual(result);
  });

  it('should not have <header>', function() {
    var subject = element(by.deepCss('app /deep/ header')).isPresent();
    var result  = false;
    expect(subject).toEqual(result);
  });

  it('should not have <main>', function() {
    var subject = element(by.deepCss('app /deep/ main')).isPresent();
    var result  = false;
    expect(subject).toEqual(result);
  });

  it('should not have <footer>', function() {
    var subject = element(by.deepCss('app /deep/ footer')).isPresent();
    var result  = false;
    expect(subject).toEqual(result);
  });

});