import React, { Component, Fragment, useEffect, useState } from 'react';
import router from "next/router";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Customer from '../../components/Customer/customer';
import Vendor from '../../components/Vendor/Vendor';
import {
  Grid,
  TextField,
  Button,
  Checkbox,
  InputAdornment,
  Box,
  Divider,
  CircularProgress,
  Tooltip,
} from '@mui/material'

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import MailIcon from './mess.svg'
import EastIcon from '@mui/icons-material/East'
import { useForm, Controller } from 'react-hook-form'
import SignIn from './signin/index'
import truckImg from './Truck.jpg'
const Login: React.FC = () => {

  const nav = () => {
    
  }

  return (
    <>

<div className="login-container" style={{marginTop:'-3rem'}}>
      <Grid container>
        <Grid item xs={12} md={6} lg={6} sx={{ display: { xs: 'none', md: 'block' } }}>
        

          <div
            className="background-image"
            style={{
              backgroundImage: `url('images/ship.jpg')`,
              backgroundSize: 'cover',
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px',
              position: 'relative',
              transition: 'background-image 1s ease-in-out',
            }}
          >

                      </div>
        </Grid>
        <Grid item xs={12} md={6} lg={6} display="flex" className='mt-5'>
          <SignIn />
        </Grid>
      </Grid>
    </div>
    </>
  );
}

export default Login;