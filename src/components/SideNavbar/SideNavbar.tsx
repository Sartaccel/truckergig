import React, { useState, useEffect, createRef } from 'react';
import Link from 'next/link';
import Image from "next/image";
import penimage from '../../public/pen.png';
import tickimage from '../../public/tick.png';

interface sideNavProps {
    curPage: number | undefined
}

const SideNavbar: React.FC<sideNavProps> = ({curPage, ...prop}) => {
    return (
        <div className="col-d-none d-lg-block">
            <div className="mb-3">
                <div className="row no-gutters">
                    <div className="col-1 padding-0">
                        {curPage == 1 ? <Image className="pen_image" src={penimage}  alt="logo" height={13} width={14} /> : ''}
                    </div>
                    <div className="col-11 padding-0">
                       <Link  
                        href={{ pathname: '/register', query: { page: 1 } }} 
                        className="sideLink"
                        >
                        &nbsp;Personal Info
                        </Link>
                        <br />
                    </div>
                </div>
            <div className="row no-gutters">
                <div className="col-1 padding-0">
                    {curPage == 2 ? <Image className="pen_image" src={penimage}  alt="logo" height={13} width={14} /> : ''}
                    {/* <Image className="tickimage" src={tickimage} alt="tick" height="12px" width="12px" /> */}
                </div>
                <div className="col-11 padding-0">
               <Link 
  href={{ pathname: '/register', query: { page: 2 } }} 
  className="sideLink"
>
  Home Address
</Link>
                    <br />
                </div>
            </div>
            <div className="row no-gutters">
                <div className="col-1 padding-0">
                    {curPage == 3 ? <Image className="pen_image" src={penimage}  alt="logo" height={13} width={14} /> : ''}
                </div>
                <div className="col-11 padding-0">
            <Link 
  href={{ pathname: '/register', query: { page: 3 } }} 
  className="sideLink"
>
  Employment History
</Link>
                    <br />
                </div>
            </div>
            <div className="row no-gutters">
					<div className="col-1 padding-0">
                        {curPage == 4 ? <Image className="pen_image" src={penimage}  alt="logo" height={13} width={14} /> : ''}
					</div>
					<div className="col-11 padding-0">
                <Link 
  href={{ pathname: '/register', query: { page: 4 } }} 
  className="sideLink"
>
  Educational Details
</Link>
					<br />
					</div>
				</div>
            <div className="row no-gutters">
                <div className="col-1 padding-0">
                    {curPage == 5 ? <Image className="pen_image" src={penimage}  alt="logo" height={13} width={14} /> : ''}
                </div>
                <div className="col-11 padding-0">
                <Link 
  href={{ pathname: '/register', query: { page: 5 } }} 
  className="sideLink"
>
  Emergency Contact
</Link>
                    <br />
                </div>
            </div>
            <div className="row no-gutters">
                <div className="col-1 padding-0">
                    {curPage == 6 ? <Image className="pen_image" src={penimage}  alt="logo" height={13} width={14} /> : ''}
                </div>
                <div className="col-11 padding-0">
                <Link 
  href={{ pathname: '/register', query: { page: 6 } }} 
  className="sideLink"
>
  General
</Link>
                    <br />
                </div>
            </div>
            <div className="row no-gutters">
                <div className="col-1 padding-0">
                    {curPage == 7 ? <Image className="pen_image" src={penimage}  alt="logo" height={13} width={14} /> : ''}
                </div>
                <div className="col-11 padding-0">
                 <Link 
  href={{ pathname: '/register', query: { page: 7 } }} 
  className="sideLink"
>
  Review
</Link>
                    <br />
                </div>
            </div>
                <br />
            </div>
        </div>
    )
}

export default SideNavbar
