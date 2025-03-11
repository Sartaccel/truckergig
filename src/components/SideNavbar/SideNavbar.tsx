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
                        {curPage == 1 ? <Image className="pen_image" src={penimage}  alt="logo" height="13px" width="14px" /> : ''}
                    </div>
                    <div className="col-11 padding-0">
                        <Link href={{ pathname: '/register', query: { page: 1 } }} >
                            <a className="sideLink" >&nbsp;Personal Info</a>
                        </Link>
                        <br />
                    </div>
                </div>
            <div className="row no-gutters">
                <div className="col-1 padding-0">
                    {curPage == 2 ? <Image className="pen_image" src={penimage}  alt="logo" height="13px" width="14px" /> : ''}
                    {/* <Image className="tickimage" src={tickimage} alt="tick" height="12px" width="12px" /> */}
                </div>
                <div className="col-11 padding-0">
                    <Link href={{ pathname: '/register', query: { page: 2 } }}>
                        <a className="sideLink" >Home Address</a>
                    </Link>
                    <br />
                </div>
            </div>
            <div className="row no-gutters">
                <div className="col-1 padding-0">
                    {curPage == 3 ? <Image className="pen_image" src={penimage}  alt="logo" height="13px" width="14px" /> : ''}
                </div>
                <div className="col-11 padding-0">
                    <Link href={{ pathname: '/register', query: { page: 3 } }}>
                        <a className="sideLink" >Employment History</a>
                    </Link>
                    <br />
                </div>
            </div>
            <div className="row no-gutters">
					<div className="col-1 padding-0">
                        {curPage == 4 ? <Image className="pen_image" src={penimage}  alt="logo" height="13px" width="14px" /> : ''}
					</div>
					<div className="col-11 padding-0">
                        <Link href={{ pathname: '/register', query: { page: 4 } }}>
                            <a className="sideLink" >Educational Details</a>
                        </Link>
					<br />
					</div>
				</div>
            <div className="row no-gutters">
                <div className="col-1 padding-0">
                    {curPage == 5 ? <Image className="pen_image" src={penimage}  alt="logo" height="13px" width="14px" /> : ''}
                </div>
                <div className="col-11 padding-0">
                    <Link href={{ pathname: '/register', query: { page: 5 } }}>
                        <a className="sideLink" >Emergency Contact</a>
                    </Link>
                    <br />
                </div>
            </div>
            <div className="row no-gutters">
                <div className="col-1 padding-0">
                    {curPage == 6 ? <Image className="pen_image" src={penimage}  alt="logo" height="13px" width="14px" /> : ''}
                </div>
                <div className="col-11 padding-0">
                    <Link href={{ pathname: '/register', query: { page: 6 } }}>
                        <a className="sideLink" >General</a>
                    </Link>
                    <br />
                </div>
            </div>
            <div className="row no-gutters">
                <div className="col-1 padding-0">
                    {curPage == 7 ? <Image className="pen_image" src={penimage}  alt="logo" height="13px" width="14px" /> : ''}
                </div>
                <div className="col-11 padding-0">
                    <Link href={{ pathname: '/register', query: { page: 7 } }}>
                        <a className="sideLink" >Review</a>
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
