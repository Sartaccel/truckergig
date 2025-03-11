import React, { useState, useEffect } from "react";
import { Modal, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import * as IoIcons from "react-icons/io";
import SummaryPage from "../sections/summary";
const Summary: React.FC = () => {
  return (
    <>
      <SummaryPage />
    </>
  );
};
export default Summary;
