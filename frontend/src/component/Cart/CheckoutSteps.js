import React, {Fragment} from 'react';
import "./CheckoutSteps.css"
import { Typography, Stepper, StepLabel, Step } from "@material-ui/core";

const CheckoutSteps = ({activeStep}) => {

    const steps = [
    {
      label: <Typography>Địa chỉ giao hàng</Typography>,
      icon: <i className='fa-solid fa-truck-fast'></i>
    },
    {
      label: <Typography>Xác nhận đơn hàng</Typography>,
      icon: <i className='fa-solid fa-check-to-slot'></i>
    },
    {
      label: <Typography>Thanh toán</Typography>,
      icon: <i className='fa-solid fa-building-columns'></i>
    },
  ];

  const stepStyles = {
    boxSizing: "border-box",
  };

  return (
    <Fragment>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
        {steps.map((item, index) => (
          <Step key={index} active={activeStep === index ? true : false} completed={activeStep >= index ? true : false}>
            <StepLabel style={{color: activeStep >= index ? "blue" : "rgba(0, 0, 0, 0.649)"}} icon={item.icon}>
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  )
}

export default CheckoutSteps;
