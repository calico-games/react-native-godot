import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Godot, GodotView} from 'react-native-godot';
import axios from 'axios';
import RNReactNativeHapticFeedback from 'react-native-haptic-feedback';
import SolarCalculator from '@/Utils/SolarCalculator';
import {addHours, addMinutes} from 'date-fns';

const EarthExample: React.FC = _props => {
  const navigation = useNavigation<any>();

  const earthRef = useRef<GodotView>(null);

  const [coordinates, setCoordinates] = useState({lat: 0, lon: 0});
  const [country, setCountry] = useState('');
  const [sunrise, setSunrise] = useState<Date | null>(null);
  const [sunset, setSunset] = useState<Date | null>(null);
  const defaultTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [timezone, setTimezone] = useState<string | null>(defaultTimezone);
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const offset = useRef(0);

  useEffect(() => {
    const unsubscribe = navigation.addListener('transitionStart', (e: any) => {
      if (e.data.closing) {
        GodotView.stopDrawing();
      } else {
        GodotView.startDrawing();
      }
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('gestureCancel', () => {
      GodotView.startDrawing();
    });

    return unsubscribe;
  }, [navigation]);

  const onMessage = (message: any) => {
    console.log('Message received:', message);
    if (message.lat === undefined || message.lon === undefined) {
      return;
    }

    RNReactNativeHapticFeedback.trigger('impactHeavy');

    setCoordinates({
      lat: message.lat,
      lon: message.lon,
    });
  };

  const letterToLetterEmoji = (letter: string) => {
    return String.fromCodePoint(letter.toLowerCase().charCodeAt(0) + 127365);
  };

  const countryCodeToFlagEmoji = (countryCode: string) => {
    return Array.from(countryCode).map(letterToLetterEmoji).join('');
  };

  const convertTZ = (date: Date, tzString: string) => {
    if (tzString === 'Asia/Kolkata') {
      tzString = 'Asia/Calcutta';
    }

    try {
      const result = date.toLocaleString('en-US', {timeZone: tzString, hour12: false}).replace(/,/g, "");
      const [month, day, year, hours, minutes, seconds] = (result.match(/\d+/g) || []) as number[];
      return new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds));
    } catch (error) {
      console.log('Error converting timezone:', error);
      return date;
    }
  }

  const convertDate = (date: Date, tz: string) => {
    const timezoneDate = convertTZ(date, tz);
    return addHours(timezoneDate, date.getTimezoneOffset() / 60);
  };

  const computeSolarData = useCallback((tz: string) => {
    let utc = new Date();
    utc.setMilliseconds(0);
    utc = addMinutes(utc, offset.current);
    offset.current += 0;

    setCurrentDate(convertDate(utc, tz));

    const solarData = SolarCalculator(utc, coordinates.lat, coordinates.lon);
    setSunrise(convertDate(solarData.sunrise, tz));
    setSunset(convertDate(solarData.sunset, tz));

    const message = {
      latitude: solarData.subsolarLatitude + 1,
      longitude: solarData.subsolarLongitude - 15, // Why -15?
    };

    earthRef.current?.emitMessage(message);
  }, [earthRef.current, coordinates, timezone]);

  useEffect(() => {
    if (coordinates.lat === 0 || coordinates.lon === 0) {
      return;
    }

    // Don't use this token in your app, it's for testing purposes only 😅
    const accessToken =
      'pk.eyJ1IjoibXVnZWViIiwiYSI6ImNsZndnMWptdzBncHozYnM2Zzh3OXhnaDAifQ.LXTzWjHgMWiiyYppgQSwWQ';
    const lat = coordinates.lat.toFixed(4);
    const lon = coordinates.lon.toFixed(4);

    async function getCountryInfo() {
      try {
        const url = `https://api.mapbox.com/search/geocode/v6/reverse?longitude=${lon}&latitude=${lat}&types=country&access_token=${accessToken}`;

        const resp = await axios.get(url);
        const data = resp.data;

        const feature = data?.features?.[0];
        const countryContext = feature?.properties?.context?.country;

        const countryCode = countryContext?.country_code;

        if (!countryCode) {
          setCountry('');
          return;
        }

        const countryName = countryContext?.name || 'Unknown';
        const emoji = countryCodeToFlagEmoji(countryCode);
        setCountry(`${countryName} ${emoji}`);
      } catch (error) {}
    }
  
    async function getTimezone() {
      try {
        const url = `https://api.mapbox.com/v4/examples.4ze9z6tv/tilequery/${lon},${lat}.json?access_token=${accessToken}`;

        const resp = await axios.get(url);
        const data = resp.data;

        const feature = data?.features?.[0];
        const timezone = feature?.properties?.TZID;

        if (!timezone) {
          setTimezone(null);
          return;
        }

        setTimezone(timezone);
        computeSolarData(timezone);
      } catch (error) {
        console.error('Error getting timezone:', error);
      }
    }

    setCurrentDate(null);
    setTimezone(null);
    getCountryInfo();
    getTimezone();
  }, [coordinates]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timezone) {
        computeSolarData(timezone);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timezone, computeSolarData]);

  const formatTime = (date: Date, displaySeconds: boolean = false) => {
    if (displaySeconds) {
      return date
        .toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', second: '2-digit'})
        .toLowerCase();
    }

    return date
      .toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
      .toLowerCase();
  }

  return (
    <View style={styles.container}>
      <Godot
        ref={earthRef}
        style={styles.earth}
        source={require('@/assets/earth.pck')}
        onMessage={onMessage}
      />
      <View style={styles.countryInfo} pointerEvents={'none'}>
        <Text style={styles.countryName} numberOfLines={2} adjustsFontSizeToFit={true}>{country ? country : ''}</Text>
        {country && (<>
          <Text style={styles.time}>{currentDate ? formatTime(currentDate, true) : 'Loading...'}</Text>
          <Text style={styles.time}>🌅 {sunrise && timezone ? formatTime(sunrise) : '00:00'}</Text>
          <Text style={styles.time}>🌃 {sunset && timezone ? formatTime(sunset) : '00:00'}</Text>
        </>)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  earth: {
    flex: 1,
  },
  countryInfo: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 20,
    paddingRight: 20,
  },
  countryName: {
    color: 'white',
    fontSize: 40,
    marginBottom: 10,
    paddingRight: 20,
  },
  time: {
    color: 'white',
    fontSize: 26,
    marginTop: 2,
  },
});

export default EarthExample;
