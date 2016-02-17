/**
 *Calculate the days between two date
 *
 * @param  str1
 * @param  str2
 * @return  days
 */
var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var leapMonthDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
module.exports = {

  /**
   * get year object from str
   * @param str
   * @returns {{year: Number, month: Number, date: Number, leap: boolean, isDateBefore: Function, isMonthBefore: Function, isSame: Function}}
   */
  getDate: function (str) {
    if (str === undefined || str == null) {
      throw new Error('Please input the date');
    }
    var date = str.split("/");
    if (date.length != 3) {
      throw new Error('Wrong Date format(DD/MM/YYYY) : ' + str);
    }
    try {
      var d = {
        year: parseInt(date[2], 10),
        month: parseInt(date[1], 10),
        date: parseInt(date[0], 10),
        leap: exports.leapYear(parseInt(date[2], 10)),
        isDateBefore: function (y) {
          return this.year < y.year || (this.year == y.year && this.isMonthBefore(y))
        },
        isMonthBefore: function (y) {
          return this.month < y.month || (this.month == y.month && this.date < y.date);
        },
        isSame: function (y) {
          return this.year == y.year && this.month == y.month && this.date == y.date;
        }
      };

      if (d.month < 1 || d.month > 12 || d.year < 0 || d.date < 0 || (d.leap && d.date > leapMonthDays[d.month - 1])
        || (!d.leap && d.date > monthDays[d.month - 1])) {
        throw new Error();
      }
    }
    catch (err) {
      throw new Error('Wrong Date format(DD/MM/YYYY) : ' + str);
    }
    return d;
  },

  /**
   * Return true if it is leap year
   * @param year
   * @returns {boolean}
   */
  leapYear: function (year) {
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
  },

  /**
   * count the leap years between 2 given years, excluding the end year
   * @param end
   * @param start
   * @returns {number}
   */
  countLeapYearsBetween: function (end, start) {
    return exports.countLeapYears(end - 1) - exports.countLeapYears(start)
  },

  /**
   * count the leap years between the given year and 0
   * @param y
   * @returns {number}
   */
  countLeapYears: function (y) {
    return parseInt(y / 4) - parseInt(y / 100) + parseInt(y / 400)
  },

  /**
   * Calculate the days between to give date
   * @param str1
   * @param str2
   * @returns {number}
   */
  calculate: function (str1, str2) {

    var end = exports.getDate(str1);
    var start = exports.getDate(str2);
    if(end.isSame(start)){
      return 0;
    }
    //make sure end>start
    if (end.isDateBefore(start)) {
      var temp = end;
      end = start;
      start = temp;
    }
    var days = 0;
    //calculate the days by years difference ,not considering the month or date,
    // if it is same year, we get -365 as the days will be compromise by the month and the date
    days = (end.year - start.year - 1 ) * 365;
    days += exports.countLeapYearsBetween(end.year, start.year);

    // calculate the remaining days of the end year
    var mDays = end.leap ? leapMonthDays : monthDays;
    for (var i = 0; i < end.month - 1; i++) {
      days += mDays[i];
    }
    days += end.date - 1;

    // calculate the remaining days of the start year
    mDays = start.leap ? leapMonthDays : monthDays;
    for (i = 11; i > start.month - 1; i--) {
      days += mDays[i];
    }
    days += mDays[start.month - 1] - start.date;

    return days;
  }


};


var exports = module.exports;