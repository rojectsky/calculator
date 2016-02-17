var should = require('chai').should(),
  expect =  require('chai').expect,
  calculator = require('../calculator'),
  calculate = calculator.calculate,
  leapYear = calculator.leapYear,
  getDate = calculator.getDate,
  countLeapYearsBetween = calculator.countLeapYearsBetween;

describe('#calculate', function () {

  it('wrong format - undefined | null', function() {
    expect(function(){
      getDate(undefined);
    }).to.throw('Please input the date');

    expect(function(){
      getDate(null);
    }).to.throw('Please input the date');
  });

  it('wrong format - invalidate number 1', function() {
    expect(function(){
      getDate('-1/06/1983');
    }).to.throw('Wrong Date format(DD/MM/YYYY) : -1/06/1983');
  });

  it('wrong format - invalidate number 2', function() {
    expect(function(){
      getDate('01/13/1983');
    }).to.throw('Wrong Date format(DD/MM/YYYY) : 01/13/1983');
  });

  it('wrong format  - date error', function() {
    expect(function(){
      getDate('29/02/abc');
    }).to.throw('Wrong Date format(DD/MM/YYYY) : 29/02/abc');
  });

  it('wrong format  - parse error', function() {
    expect(function(){
      getDate('04/02');
    }).to.throw('Wrong Date format(DD/MM/YYYY) : 04/02');
  });

  it('getDate ', function () {
    var d = getDate("02/03/1990");
    d.year.should.equal(1990);
    d.month.should.equal(3);
    d.date.should.equal(2);
    d.leap.should.equal(false);

  });

  it('getDate  - test isDateBefore ', function () {
    var d = getDate("29/02/2012");
    d.isDateBefore(getDate("01/03/2012")).should.equal(true);
    d.isDateBefore(getDate("28/02/2012")).should.equal(false);
    d.isDateBefore(getDate("03/06/2011")).should.equal(false);
  });

  it('calculate same date ', function() {
    calculate('02/6/1983','02/06/1983').should.equal(0);
  });
  it('calculate 1 date', function() {
    calculate('03/06/1983','02/06/1983').should.equal(0);
});
  it('calculate date1 ', function() {
    calculate('02/06/1983','22/06/1983').should.equal(19);
  });
  it('calculate leap year 1', function() {
    calculate('13/02/2011','14/03/2012').should.equal(394 );
  });

  it('calculate leap year 2 ', function() {
    calculate('13/02/2011','14/02/2012').should.equal(365 );
  });

  it('calculate leap year 3 ', function() {
    calculate('13/02/2012','01/03/2012').should.equal(16 );
  });

  it('calculate leap year 4 ', function() {
    calculate('01/03/2012','28/02/2012').should.equal(1 );
  });

  it('calculate date3 ', function() {
    calculate('04/07/1984','25/12/1984').should.equal(173);
  });
  it('calculate date4 ', function() {
    calculate(' 03/01/1989','03/08/1983').should.equal(1979);
  });
  it('calculate date5 ', function() {
    calculate(' 21/02/2012','15/02/2021').should.equal(3281);
  });

  it('leapYear 1 ', function () {
    leapYear("1980").should.equal(true);
  });
  it('leapYear 2 ', function () {
    leapYear("1977").should.equal(false);
  });
  it('leapYear 3 ', function () {
    leapYear("2100").should.equal(false);
  });


  it('countLeapYearsBetween 1 ', function () {
    countLeapYearsBetween(1980, 1970).should.equal(2);
  });
  it('countLeapYearsBetween 2 ', function () {
    countLeapYearsBetween(2996, 1970).should.equal(249);
  });

});
