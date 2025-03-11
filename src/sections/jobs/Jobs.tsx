import React, { useState, useEffect, createRef, useRef } from "react";
import styles from './Jobs.module.scss'
import Saved from "../../components/Saved";
import { Favorite } from "../../components/Saved/favorite/Favaroite";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import axios from 'axios';
import Breadcrumb from 'react-bootstrap/Breadcrumb'

const Jobs: React.FC = () => {

	var Authtoken = ""

	if (typeof window !== 'undefined') {
		Authtoken = localStorage.getItem("Authorization");
	}
	
	return (
		<>
 <div className='row p-2'>
        <div className='col'>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Job</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
			<div className="container">
				<Tabs className={`${styles["tabss"]}`}>
					<TabList>
						<Tab>Jobs</Tab>
					{Authtoken?	<Tab>Saved</Tab> :""}
					</TabList>
					<TabPanel className={`${styles["tabscn"]}`}>
						<Saved />
					</TabPanel>
					<TabPanel className={`${styles["tabscn"]}`}>
						<Favorite />
					</TabPanel>
				</Tabs>
			</div>
		</>
	);
}

export default Jobs;
