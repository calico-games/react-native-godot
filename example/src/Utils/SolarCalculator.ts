/** 
 * Sources:
 * https://gml.noaa.gov/grad/solcalc/
 * https://github.com/NASAWorldWind/WebWorldWind/blob/develop/src/util/SunPosition.js
 * https://github.com/arcticio/weather-simulation/blob/master/scripts/libs/orb2/solarsystem_v2r1.js
 * https://worldwind.earth/explorer/
 * https://www.timeanddate.com/scripts/sunmap.php
 * 
 * @param {Date} utcDate
 * @param {Number} lat
 * @param {Number} lng
 * @returns {undefined}
 */

const SolarCalculator = (utcDate: Date, lat: number, lng: number) => {

  /**
   * Returns the angle in the range 0 to 360
   * @param {Number} angle
   * @returns {Number}
   */
  const roundAngle = (angle: number) => {
    if (angle > 360){
      angle = angle % 360;
    } else if (angle < 0) {
      angle = angle % 360 + 360;
    } else {
      angle = angle;
    }

    return angle;
  }

  const normalizedDegreesLongitude = (degrees: number) => {
    const lon = degrees % 360;

    return lon > 180 ? lon - 360 : lon < -180 ? 360 + lon : lon;
  }

  /**
   *
   * @param {Number} jd
   * @returns {Number}
   */
  const calcTimeJulianCent = (jd: number) => {
    const t = (jd - 2451545.0) / 36525.0;

    return t;
  };

  /**
   *
   * @param {Number} t
   * @returns {Number}
   */
  const calcJDFromJulianCent = (t: number) => {
    const jd = t * 36525 + 2451545;

    return jd;
  };

  /**
   *
   * @param {Number} yr
   * @returns {Boolean}
   */
  const isLeapYear = (yr: number) => {
    return ((yr % 4 == 0 && yr % 100 != 0) || yr % 400 == 0);
  };

  /**
   *
   * @param {Number} jd
   * @returns {Number}
   */
  const calcDoyFromJD = (jd: number) => {
    const z = Math.floor(jd + 0.5);
    const f = (jd + 0.5) - z;

    let A;
    if (z < 2299161) {
      A = z;
    } else {
      const alpha = Math.floor((z - 1867216.25) / 36524.25);
      A = z + 1 + alpha - Math.floor(alpha / 4);
    }

    const B = A + 1524;
    const C = Math.floor((B - 122.1) / 365.25);
    const D = Math.floor(365.25 * C);
    const E = Math.floor((B - D) / 30.6001);
    const day = B - D - Math.floor(30.6001 * E) + f;
    const month = (E < 14) ? E - 1 : E - 13;
    const year = (month > 2) ? C - 4716 : C - 4715;

    const k = (isLeapYear(year) ? 1 : 2);
    const doy = Math.floor((275 * month) / 9) - k * Math.floor((month + 9) / 12) + day - 30;

    return doy;
  };

  /**
   * Converts an angle in radians to degrees
   * @param {Number} angleRad
   * @returns {Number}
   */
  const radToDeg = (angleRad: number) => {
    return (180.0 * angleRad / Math.PI);
  };

  /**
   * Converts an angle in degrees to radians
   * @param {Number} angleDeg
   * @returns {Number}
   */
  const degToRad = (angleDeg: number) => {
    return (Math.PI * angleDeg / 180.0);
  };

  /**
   * Returns the geometric mean longitude of the Sun in degrees
   * @param {Number} t
   * @returns {Number}
   */
  const calcGeometricMeanLongitudeSun = (t: number) => {
    let longitude = 280.46646 + 36000.76983 * t + 0.0003032 * t * t;
    return roundAngle(longitude);
  };

  /**
   * Returns the mean anomaly of the Sun
   * @param {Number} t
   * @returns {Number}
   */
  const calcGeomMeanAnomalySun = (t: number) => {
    var M = 357.52911 + t * (35999.05029 - 0.0001537 * t);
    return M;		// in degrees
  };

  /**
   * Returns the eccentricity of the Earth's orbit
   * @param {Number} t
   * @returns {Number}
   */
  const calcEccentricityEarthOrbit = (t: number) => {
    const eccentricity = 0.016708634 - t * (0.000042037 + 0.0000001267 * t);
    return eccentricity;		// unitless
  };

  /**
   * Returns the Sun's equation of center in degrees
   * @param {Number} Julian date century
   * @returns {Number} degrees
   */
  const calcSunEquationOfCenter = (t: number) => {
    const meanAnomaly = calcGeomMeanAnomalySun(t);
    const meanRad = degToRad(meanAnomaly);
    const sinm = Math.sin(meanRad);
    const sin2m = Math.sin(meanRad + meanRad);
    const sin3m = Math.sin(meanRad + meanRad + meanRad);

    // Sun's equation of the center
    const equation = sinm * (1.914602 - t * (0.004817 + 0.000014 * t)) + sin2m * (0.019993 - 0.000101 * t) + sin3m * 0.000289;
    return equation;		// in degrees
  };

  /**
   * Returns the true longitude of the Sun in degrees
   * @param {Number} t
   * @returns {Number}
   */
  const calcSunTrueLongitude = (t: number) => {
    const meanLongitude = calcGeometricMeanLongitudeSun(t);
    const equation = calcSunEquationOfCenter(t);
    const trueLongitude = meanLongitude + equation;

    return trueLongitude;
  };

  /**
   * Returns the apparent longitude of the Sun in degrees
   * @param {Number} t
   * @returns {Number}
   */
  const calcSunApparentLongitude = (t: number) => {
    const trueLongitude = calcSunTrueLongitude(t);
    // TODO: seenms the omega is not completly precise (https://github.com/arcticio/weather-simulation/blob/master/scripts/libs/orb2/solarsystem_v2r1.js#L21)
    const omega = 125.04452 - 1934.136261 * t;
    const lambda = trueLongitude - 0.00569 - 0.00478 * Math.sin(degToRad(omega));

    return lambda;
  };

  /**
   * Returns the mean obliquity of the ecliptic in degrees
   * @param {Number} t
   * @returns {Number}
   */
  const calcMeanObliquityOfEcliptic = (t: number) => {
    const seconds = 21.448 - t * (46.8150 + t * (0.00059 - t * (0.001813)));
    const e0 = 23.0 + (26.0 + (seconds / 60.0)) / 60.0;

    return e0;
  };

  /**
   *
   * @param {Number} t
   * @returns {Number} degrees
   */
  const calcObliquityCorrection = (t: number) => {
    const meanObliquity = calcMeanObliquityOfEcliptic(t);
    const omega = 125.04 - 1934.136 * t;
    var e = meanObliquity + 0.00256 * Math.cos(degToRad(omega));
    return e;		// in degrees
  };

  /**
   * Returns the Sun's right ascension in degrees
   * @param {Number} t
   * @returns {Number} degrees
   */
  const calcSunRightAscension = (t: number) => {
    const obliquity = calcObliquityCorrection(t);
    const longitude = calcSunApparentLongitude(t);
    const tananum = Math.cos(degToRad(obliquity)) * Math.sin(degToRad(longitude));
    const tanadenom = Math.cos(degToRad(longitude));
    const ascension = radToDeg(Math.atan2(tananum, tanadenom));

    return roundAngle(ascension);
  };

  /**
   * Returns the Sun's declination in degrees
   * @param {Number} t Julian date century
   * @returns {Number} degrees
   */
  const calcSunDeclination = (t: number) => {
    const obliquity = calcObliquityCorrection(t);
    const apparentLongitude = calcSunApparentLongitude(t);

    const sint = Math.sin(degToRad(obliquity)) * Math.sin(degToRad(apparentLongitude));
    const theta = radToDeg(Math.asin(sint));
    return theta;
  };

  /**
   * Computes the equation of time.
   * @param {Number} t
   * @returns {Number} minutes
   */
  const calcEquationOfTime = (t: number) => {
    var epsilon = calcObliquityCorrection(t);
    var meanLongitude = calcGeometricMeanLongitudeSun(t);
    const eccentricity = calcEccentricityEarthOrbit(t);
    const meanAnomaly = calcGeomMeanAnomalySun(t);

    var y = Math.tan(degToRad(epsilon) / 2.0);
    y *= y;

    var sin2l0 = Math.sin(2.0 * degToRad(meanLongitude));
    var sinm = Math.sin(degToRad(meanAnomaly));
    var cos2l0 = Math.cos(2.0 * degToRad(meanLongitude));
    var sin4l0 = Math.sin(4.0 * degToRad(meanLongitude));
    var sin2m = Math.sin(2.0 * degToRad(meanAnomaly));

    var Etime = y * sin2l0 - 2.0 * eccentricity * sinm + 4.0 * eccentricity * y * sinm * cos2l0 - 0.5 * y * y * sin4l0 - 1.25 * eccentricity * eccentricity * sin2m;
    return radToDeg(Etime) * 4.0;	// in minutes of time
  };

  /**
   * Returns the hour angle [radians] at sunrise; negate teh value for sunset.
   * @param {Number} lat Observer latitude
   * @param {Number} solarDec Declination
   * @returns {Number} radians
   */
  const calcHourAngleSunrise = (lat: number, solarDec: number) => {
    var latRad = degToRad(lat);
    var sdRad = degToRad(solarDec);
    var HAarg = (Math.cos(degToRad(90.833)) / (Math.cos(latRad) * Math.cos(sdRad)) - Math.tan(latRad) * Math.tan(sdRad));
    var HA = Math.acos(HAarg);
    return HA;		// in radians (for sunset, use -HA)
  };

  /**
   *
   * @param {Object} inputVal
   * @returns {Boolean}
   */
  const isNumber = (inputVal: any) => {
    var oneDecimal = false;
    var inputStr = "" + inputVal;
    for (var i = 0; i < inputStr.length; i++) {
      var oneChar = inputStr.charAt(i);
      if (i == 0 && (oneChar == "-" || oneChar == "+")) {
        continue;
      }
      if (oneChar == "." && !oneDecimal) {
        oneDecimal = true;
        continue;
      }
      if (oneChar < "0" || oneChar > "9") {
        return false;
      }
    }
    return true;
  }

  /**
   * Computes the Julian day for the given Jajascript date
   * @param {Date} date
   * @returns {Number} The julian day
   */
  const computeJulianDay = (date: Date) => {
    let year = date.getUTCFullYear();
    // Convert from zero-based month
    let month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();

    if (month <= 2) {
      year -= 1;
      month += 12;
    }

    const A = Math.floor(year / 100);
    const B = 2 - A + Math.floor(A / 4);
    const JD0h = Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;

    return JD0h;
  };

  /**
   * Computes the fractional minutes for the given date
   * @param {Date} date
   * @returns {Number} The fractional minutes
   */
  const getFractionalMinutes = (date: Date) => {
    const hour = date.getUTCHours();
    const minute = date.getUTCMinutes();
    const second = date.getUTCSeconds();

    const mins = hour * 60 + minute + second / 60.0;
    return mins;
  };

  /**
   * Calculates the azimuth and elevation of the sun for the given
   * observer location and time.
   * @param {Number} t
   * @param {Number} timeLocal
   * @param {Number} latitude
   * @param {Number} longitude
   * @param {Number} zone
   * @returns {Number}
   */
  const calcSunLatLon = (t: number) => {
    const latitude = calcSunDeclination(t);
    const rightAscension = calcSunRightAscension(t);
    const jday = calcJDFromJulianCent(t);
    // Number of days (positive or negative) since Greenwich noon, Terrestrial Time, on 1 January 2000 (J2000.0)
    const elapsedJulianDays = jday - 2451545;
    const greenwichMeanSiderealTime = roundAngle(280.46061837 + 360.98564736629 * elapsedJulianDays);
    let longitude = normalizedDegreesLongitude(greenwichMeanSiderealTime - rightAscension); // TODO: Why -90?

    return {
      latitude: latitude,
      longitude: longitude,
    };
  };

  /**
   *
   * @param {Boolean} rise
   * @param {Number} jday
   * @param {Number} latitude
   * @param {Number} longitude
   * @returns {Number} The time of sunrise or sunset in minutes
   */
  const calcSunriseSetUTC = (rise: boolean, jday: number, latitude: number, longitude: number) => {
    const t = calcTimeJulianCent(jday);
    const eqTime = calcEquationOfTime(t);
    const solarDec = calcSunDeclination(t);
    let hourAngle = calcHourAngleSunrise(latitude, solarDec);
    if (!rise)
      hourAngle = -hourAngle;
    const delta = longitude + radToDeg(hourAngle);
    const timeUTC = 720 - (4.0 * delta) - eqTime;	// in minutes

    return timeUTC;
  };

  /**
   * Calculate the time of sunrise or sunset for the given observer location and date.
   * @param {Boolean} rise true for sunrise, false for sunset
   * @param {Number} jday
   * @param {Number} latitude
   * @param {Number} longitude
   * @param {Number} timezone
   * @returns {Number} The time of sunrise or sunset in minutes
   */
  const calcSunriseSet = (rise: boolean, jday: number, latitude: number, longitude: number, timezone: number) => {
    var timeUTC = calcSunriseSetUTC(rise, jday, latitude, longitude);
    var newTimeUTC = calcSunriseSetUTC(rise, jday + timeUTC/1440.0, latitude, longitude);
    let timeLocal = 0.0;

    if (isNumber(newTimeUTC)) {
      timeLocal = newTimeUTC + (timezone * 60.0);

      if (timeLocal < 0.0 || timeLocal >= 1440.0) {
        var increment = ((timeLocal < 0) ? 1 : -1)
        while ((timeLocal < 0.0)||(timeLocal >= 1440.0)) {
          timeLocal += increment * 1440.0;
          jday -= increment;
        }
      }
    } else { // No sunrise/set found
      var doy = calcDoyFromJD(jday)
      if (((latitude > 66.4) && (doy > 79) && (doy < 267)) ||
          ((latitude < -66.4) && ((doy < 83) || (doy > 263)))) {
        // previous sunrise/next sunset
        jday = calcJDofNextPrevRiseSet(!rise, rise, jday, latitude, longitude, timezone)
      } else {   //previous sunset/next sunrise
        jday = calcJDofNextPrevRiseSet(rise, rise, jday, latitude, longitude, timezone)
      }
	  }

    return timeLocal
  };

  /**
   * Calculate the Julian date of the next or previous sunrise or sunset.
   * @param {Boolean} next
   * @param {Number} rise
   * @param {Number} jday
   * @param {Number} latitude
   * @param {Number} longitude
   * @param {Number} tz
   * @returns {Number}
   */
  const calcJDofNextPrevRiseSet = (next: boolean, rise: boolean, jday: number, latitude: number, longitude: number, tz: number) => {
    const increment = next ? 1.0 : -1.0;
    let time = calcSunriseSetUTC(rise, jday, latitude, longitude);

    while(!isNumber(time)) {
      jday += increment;
      time = calcSunriseSetUTC(rise, jday, latitude, longitude);
    }
    var timeLocal = time + tz * 60.0
    while ((timeLocal < 0.0) || (timeLocal >= 1440.0)) {
      var incr = ((timeLocal < 0) ? 1 : -1)
      timeLocal += (incr * 1440.0)
      jday -= incr
    }

    return jday;
  };

  /*********************/

  const tz = -utcDate.getTimezoneOffset() / 60;
  const jday = computeJulianDay(utcDate);
  const fractionalMinutes = getFractionalMinutes(utcDate);
  const julianDate = jday + fractionalMinutes / 1440.0 - tz / 24.0;
  const t = calcTimeJulianCent(julianDate);
  const sunLatLon = calcSunLatLon(t);
  const sunriseTimeOffset = calcSunriseSet(true, jday, lat, lng, tz);
  const sunsetTimeOffset = calcSunriseSet(false, jday, lat, lng, tz);
  const midnight = new Date(utcDate.getUTCFullYear(), utcDate.getUTCMonth(), utcDate.getUTCDate());
  const sunriseTime = new Date(midnight.getTime() + sunriseTimeOffset * 60000);
  const sunsetTime =  new Date(midnight.getTime() + sunsetTimeOffset * 60000);

  return {
    lat: lat,
    lng: lng,
    sunrise: sunriseTime,
    sunset: sunsetTime,
    subsolarLatitude: sunLatLon.latitude,
    subsolarLongitude: sunLatLon.longitude,
  };
};

export default SolarCalculator;