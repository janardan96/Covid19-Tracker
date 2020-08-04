import React, { useState, useEffect } from 'react';
import { FormControl, MenuItem, Select, Box, Typography, Container, Grid, Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InfoBox from "./infoBox";
import Table from "./Table";
import LineGraph from "./Graph"
import Map from "./Map"
import './App.css'
import 'leaflet/dist/leaflet.css'
import clsx from "clsx"

const useStyles = makeStyles((theme) => ({
  redBorder: {
    borderTop: '3px solid #cc1034',
    borderRadius: '6px'
  },
  greenBorder: {
    borderTop: '3px solid #a1e24f',
    borderRadius: '6px'
  },
  orangeBorder: {
    borderTop: '3px solid #f5aaa7',
    borderRadius: '6px'

  },
}));


function App() {
  const classes = useStyles();
  // https://disease.sh/v3/covid-19//v3/covid-19/countries
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 28.527582, lng: 77.0688975 })
  const [mapZoom, setMapZoom] = useState(3)
  const [casesType, setCasesType] = useState("cases");
  const [mapCountries, setMapCountries] = useState([]);
  const [selected, setSelected] = useState(1)


  useEffect(() => {
    const initialData = async () => {
      const data = await fetch('https://disease.sh/v3/covid-19/all');
      const jsonData = await data.json()
      setCountryInfo(jsonData);
    }
    initialData()
  }, []);



  useEffect(() => {
    const generateData = async () => {
      const data = await fetch('https://disease.sh/v3/covid-19/countries');
      const jsonData = await data.json()
      const newData = jsonData.map(e => (
        {
          name: e.country,
          value: e.countryInfo.iso2
        }
      ))
      setTableData(jsonData)
      setCountries(newData);
      setMapCountries(jsonData);
      console.log("All Countries", jsonData)
    }
    generateData()
  }, [])

  const handleChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    const url = countryCode === 'worldwide' ?
      'https://disease.sh/v3/covid-19/all'
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    const data = await fetch(url);
    const jsonData = await data.json()
    setCountryInfo(jsonData);
    setMapCenter({ lat: jsonData.countryInfo.lat, lng: jsonData.countryInfo.long })
    setMapZoom(4)
  };


  return (
    <React.Fragment>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Box display='flex' justifyContent='space-between' my={3}>
              <Typography variant="h4" gutterBottom>Covid-19 Tracker</Typography >
              <FormControl>
                <Select
                  variant="outlined"
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={country}
                  onChange={handleChange}
                // label="Age"
                > <MenuItem value='worldwide'>Worldwide</MenuItem>
                  {countries.map((element, i) => (
                    <MenuItem key={i} value={element.value}>{element.name}</MenuItem>
                  ))
                  }
                </Select>
              </FormControl>
            </Box>

            {/* 2nd InfoBox */}
            <Box display='flex' justifyContent='space-between'>
              <Box className={clsx(selected === 1 && classes.redBorder)}>
                <InfoBox onClick={() => {
                  setCasesType('cases');
                  setSelected(1)
                }}
                  id={1} title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} active={selected} />
              </Box>

              <Box className={clsx(selected === 2 && classes.greenBorder)}>
                <InfoBox onClick={() => {
                  setCasesType('recovered');
                  setSelected(2)
                }}
                  id={2} title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} active={selected} />
              </Box>

              <Box className={clsx(selected === 3 && classes.orangeBorder)}>
                <InfoBox onClick={() => {
                  setCasesType('deaths');
                  setSelected(3)
                }}
                  id={3} title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} active={selected} />
              </Box>
            </Box>

            <Box mt={2}>
              <Map countries={mapCountries} casesType={casesType} center={mapCenter} zoom={mapZoom} />
            </Box>

          </Grid>


          <Grid item xs={12} md={4}>
            <Box my={3}>
              <Card>
                <CardContent>
                  <Typography variant='h6'>Live Cases  by Country</Typography >
                  <Table countries={tableData} />
                  <Typography variant='h6' style={{ marginTop: "6px" }}>Worldwide new {casesType}
                  </Typography >
                  <LineGraph casesType={casesType} />
                </CardContent>
              </Card>
            </Box>
          </Grid>

        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default App;
