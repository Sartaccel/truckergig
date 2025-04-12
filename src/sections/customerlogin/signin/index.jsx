import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
// import './style.scss'
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
import Link from "next/link";
import GoogleLogin from '../../../components/Sociallogins/GoogleLogin';
import FacebookLogin from '../../../components/Sociallogins/FacebookLogin';
import axios from "axios";
import router from "next/router";
import urls from "../../../utilities/AppSettings";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import { useNavigate, Link, useLocation } from 'react-router-dom'

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import EastIcon from '@mui/icons-material/East'
// import { GoogleLogin } from '@react-oauth/google'
import { useDispatch, useSelector } from 'react-redux'
// import { login, googlesign } from '../../../reducers/api'
// import { useSnackbar } from 'notistack'
import Buttons from '../Button'
import styles from './signin.module.scss';
import {  Radio }from '@mui/material'
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const schema = yup.object().shape({
  userName: yup
    .string()
    .email('Invalid email format')
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'Email must include a valid domain (e.g., example.com)',
    )
    .required('Email is required')
    .transform((value) => value.toLowerCase()),
  password: yup
    .string()
    // .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
})

const Signin = () => {
  // const { enqueueSnackbar } = useSnackbar()
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onTouched',
  })
  // const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [valueforradio, setvalueforradio] = useState("vendor")

  // const dispatch = useDispatch()
  // const location = useLocation()

  const handleSign = (response) => {
    const token = response.credential
    // dispatch(googlesign({ token }))
    //   .then(() => {
    //     enqueueSnackbar('Google Login Successful!', {
    //       variant: 'success',
    //       style: { backgroundColor: '#BAA554' },
    //     })
    //     navigate('/')
    //   })
    //   .catch((err) => {
    //     enqueueSnackbar(`User or Password is Incorrect`, { variant: 'error' })
    //   })
  }

  const onSubmit = async (data) => {
    // try {
    //   if (keepSignedIn) {
    //     localStorage.setItem('keepSignedIn', JSON.stringify(true))
    //   } else {
    //     sessionStorage.setItem('keepSignedIn', JSON.stringify(true))
    //   }

    //   const resultAction = await dispatch(login(data))
    //   if (login.fulfilled.match(resultAction)) {
    //     enqueueSnackbar('Login Successful!', {
    //       variant: 'success',
    //       style: { backgroundColor: '#BAA554' },
    //     })
    //     localStorage.setItem('role', resultAction?.payload?.data?.data?.role)
    //     const redirectTo = location.state?.from || '/'
    //     if (localStorage.getItem('clicktoreview') === 'true') {
    //       navigate(`${localStorage.getItem('reviewurl')}`)
    //     } else {
    //       navigate(redirectTo, { replace: true })
    //     }
    //   } else if (login.rejected.match(resultAction)) {
    //     enqueueSnackbar('User or Password is Incorrect', { variant: 'error' })
    //   }
    // } catch (error) {
    //   enqueueSnackbar('An unexpected error occurred', { variant: 'error' })
    // }
  }

  const handleRedirect = (e) => {
    e.preventDefault(); // Prevent default Link behavior

    if (valueforradio === 'customer') {
      router.push('/customerregister');
    } else if (valueforradio === 'vendor') {
      router.push('/vendor');
    } else {
      router.push('/unauthorized');
    }
  };

  const forgotPassword = (e) => {
    e.preventDefault();
    router.push('/forgotpassword');
}

  const onSubmitHandler1 = (data) => {
    data.loginTypeId = "1";
    var params = {
      ...data,
      username: data.userName,
    };
    delete params.userName;
      axios

        .post(`${urls.baseUrl}login`, params)
        .then(function (response) {
          if(response?.data?.headers?.statusCode == 407){
            toast.error("Invalid Credentials", {
              theme: "colored",
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }else if(response?.data?.headers?.statusCode == 200){
            toast.success("Login Success", {
              theme: "colored",
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            const userdetail = response.data.data.userdata;
            localStorage.setItem("user", JSON.stringify(userdetail));
            localStorage.setItem("Authorization", response.data.data.authtoken);
            router.push("/marketplace");
          }else {
            toast.error("Login error", {
              theme: "colored",
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        })
        .catch(function (error) {
          console.log("errror")
          toast.error("Invalid Credentials", {
            theme: "colored",
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    };

      const onSubmitHandler = (data) => {
          var params = data;
          axios.post(`${urls.userUrl}gateway/trmlogin`, params).then(function (response) {
              console.log(params)
              if(response?.data?.headers?.statusCode == 407){
                toast.error("Invalid Credentials", {
                  theme: "colored",
                  position: "top-right",
                  autoClose: 1500,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              }else if(response?.data?.headers?.statusCode == 200){
                toast.success("Login Success", {
                  theme: "colored",
                  position: "top-right",
                  autoClose: 1500,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
                const userdetail = response.data.data;
                localStorage.setItem("user", JSON.stringify(userdetail));
                localStorage.setItem("Authorization", response.data.data.authtoken);
                localStorage.setItem("Clientname", response.data.data.clientName);
                localStorage.setItem("Clientid", response.data.data.clientId);
                router.push("/marketplace");
              }else {
                toast.error("Login error", {
                  theme: "colored",
                  position: "top-right",
                  autoClose: 1500,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              }
          })
              .catch(function (error) {
                  toast.error("Invalid Credentials", {
                      theme: "colored",
                      position: "top-right",
                      autoClose: 1500,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                  });
              });
      };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  const handleRadioChange = (value) => {
    setvalueforradio(value)
  }

  const nav = () => {
    // ('/')navigate
    localStorage.removeItem('keepSignedIn')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="login-container">
             <ToastContainer
                  position="top-right"
                  autoClose={1500}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />
        <Grid container mt={{ xs: 0, lg: 8 }}>
          <Grid
            item
            xs={12}
            display="flex"
            // alignItems="center"
            // justifyContent="center"
          >
            <Grid
              container
              rowGap={2.2}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={10} lg={8}>
                <Box className="d-flex gap-4 align-items-center">
                  <Box className="arrow1" onClick={nav}>
                    <ArrowBackIosNewIcon fontSize="16px" />
                  </Box>
                  <h5 className="m-0 sign" style={{ fontWeight: 'bold' }}>
                    Sign in to Your Account
                  </h5>
                </Box>
              </Grid>

              <Grid item xs={10} lg={8}>
                <Controller
                  name="userName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      placeholder="Enter your email address"
                      variant="outlined"
                      error={!!errors.userName}
                      fullWidth
                      sx={{
                        '& .MuiInputBase-input': {
                          height: '12px',
                          fontSize: '14px',
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <img
                              src={'images/mess.svg'}
                              alt=""
                              style={{ width: '20px' }}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
                {errors.userName && (
                  <p className="m-0" style={{ fontSize: '11px', color: 'red' }}>
                    {errors.userName.message}
                  </p>
                )}
              </Grid>

              <Grid item xs={10} lg={8} mt={0.5}>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <>
                      <TextField
                        {...field}
                        placeholder="Enter your password"
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        error={!!errors.password}
                        fullWidth
                        sx={{
                          '& .MuiInputBase-input': {
                            height: '12px',
                            fontSize: '14px',
                          },
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <img
                                src={"images/key.svg"}
                                alt=""
                                style={{ width: '20px' }}
                              />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <Box
                                onClick={togglePasswordVisibility}
                                sx={{ cursor: 'pointer' }}
                              >
                                {showPassword ? (
                                  <AiOutlineEye />
                                ) : (
                                  <AiOutlineEyeInvisible />
                                )}
                              </Box>
                            </InputAdornment>
                          ),
                        }}
                      />
                      {errors.password && (
                        <p
                          className="m-0"
                          style={{ fontSize: '11px', color: 'red' }}
                        >
                          {errors.password.message}
                        </p>
                      )}

                     
                    </>
                  )}
                />
              </Grid>
                <Grid item xs={10} lg={8} mt={0.5} >
                <div className={styles["radio-forgot-wrapper"]}>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel value="vendor" checked={"vendor"==valueforradio} control={<Radio onChange={() => handleRadioChange("vendor")}/>} label="Vendor" />
                  <FormControlLabel value="customer" checked={"customer"==valueforradio} control={<Radio onChange={() => handleRadioChange("customer")}/>} label="Customer" />
                </RadioGroup>
                    
                <p
                        className={`${styles["forgetpassword"]} `}
                        onClick={(e) =>{forgotPassword(e)}}
                        >
                          Forgot Password
                        </p>
        
                </div>
                </Grid>
  

              <Grid item xs={10} lg={8}>
                {
                  valueforradio=="vendor" ?
                  <Buttons
                  loading={false}
                  name={
                    <>
                      Sign In
                      <EastIcon
                        sx={{
                          color: 'white',
                          marginLeft: '5px',
                          fontSize: '18px',
                        }}
                      />
                    </>
                  }
                  handleSubmit={handleSubmit(onSubmitHandler)}
                 
                /> : <Buttons
                loading={false}
                name={
                  <>
                    Sign In
                    <EastIcon
                      sx={{
                        color: 'white',
                        marginLeft: '5px',
                        fontSize: '18px',
                      }}
                    />
                  </>
                }
                handleSubmit={handleSubmit(onSubmitHandler1)}
               
              />
                }
              
              </Grid>

              <Grid item xs={10} lg={8} textAlign="center">
                <p className="m-0 dont">
                  Don't have an account?{' '}
                  <a href="#" onClick={handleRedirect} style={{ color: "rgb(0, 112, 156)", textDecoration: "none" }}>
                    Sign Up
                  </a>
                  {/* <Link href="/customerregister"
                  >
                    <span 
                    style={{
                    color:"rgb(0, 112, 156)",
                    textdecoration:"none !important",
                    cursor:"pointer"
                  }}>Sign Up</span>
                  </Link> */}
                </p>
              </Grid>

              <Grid item xs={10} lg={8} textAlign="center">
                <Box className="d-flex gap-2 align-items-center justify-content-center">
                  <Divider
                    sx={{
                      borderWidth: '1px',
                      borderColor: 'black',
                      width: '40%',
                      height: '1px',
                    }}
                  />
                  <p className="m-0">or</p>
                  <Divider
                    sx={{
                      borderWidth: '1px',
                      borderColor: 'black',
                      width: '40%',
                      height: '1px',
                    }}
                  />
                </Box>
              </Grid>

              <Grid item xs={6} lg={6}>
                <Box className="google">
                <GoogleLogin isformlogin={true} />
                  {/* <GoogleLogin
                    onSuccess={handleSign}
                    onError={() => console.log('Login Failed')}
                  /> */}
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </form>
  )
}

export default Signin
