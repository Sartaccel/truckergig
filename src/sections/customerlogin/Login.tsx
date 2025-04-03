import React, { Component, Fragment, useEffect, useState } from 'react';
import router from "next/router";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Customer from '../../components/Customer/customer';
import Vendor from '../../components/Vendor/Vendor';

const Login: React.FC = () => {

  return (
    <>
      <div className="row p-2">
        <div className='col'>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Login</Breadcrumb.Item>
          </Breadcrumb>
        </div>
       <div className="col-12 d-flex justify-content-center">
  <div className="text-center">
    <Tabs
      defaultActiveKey="vendor"
      id="uncontrolled-tab-example"
      className="custom-tab mb-3 d-flex justify-content-center"
    >
      <Tab eventKey="vendor" title="Vendor Login">
        <Vendor />
      </Tab>
      <Tab eventKey="customer" title="Customer Login">
        <Customer />
      </Tab>
    </Tabs>
  </div>
</div>

      </div>
    </>
  );
}

export default Login;