import React, { useState } from 'react'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import PropTypes from 'prop-types'

const Buttons = ({
  variant = 'contained',
  loading,
  name,
  handleSubmit,
  fontSize = '14px',
  height = '38px',
  fontWeight = 'bold',
  borderRadius = '5px',
  disabled,
}) => {
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = (event) => {
    if (!loading && !disabled && !isClicked) {
      setIsClicked(true)
      handleSubmit && handleSubmit(event)

      // Re-enable button after 1.5 seconds
      setTimeout(() => {
        setIsClicked(false)
      }, 1500)
    }
  }

  return (
    <Button
      variant={"contained"}
      color="primary"
      fullWidth
      type="submit"
      onClick={handleClick}
      disabled={loading || disabled || isClicked}
      sx={{
        textTransform: 'capitalize',
        backgroundColor: variant === 'outlined' ? 'transparent' : 'rgb(0, 112, 156)',
        color: variant === 'outlined' ? 'rgb(0, 112, 156)' : 'white',
        borderColor: variant === 'outlined' ? 'rgb(0, 112, 156)' : 'transparent',
        borderRadius: borderRadius,
        cursor: 'pointer',
        height: height,
        fontSize: fontSize,
        fontWeight: fontWeight,
        '&:hover': {
          backgroundColor: variant === 'outlined' ? 'transparent' : 'rgb(0, 112, 156)',
        },
        '&:disabled': {
          backgroundColor:
            variant === 'outlined' ? 'transparent' : 'rgb(0, 112, 156) !important',
          color: variant === 'outlined' ? 'rgb(0, 112, 156)' : 'white !important',
          opacity: 0.7,
        },
      }}
    >
      {loading ? <CircularProgress size={20} color="inherit" /> : name}
    </Button>
  )
}

Buttons.propTypes = {
  variant: PropTypes.string,
  loading: PropTypes.bool,
  name: PropTypes.string,
  handleSubmit: PropTypes.func,
  fontSize: PropTypes.string,
  height: PropTypes.string,
  fontWeight: PropTypes.string,
  borderRadius: PropTypes.string,
  disabled: PropTypes.bool,
}

export default Buttons
