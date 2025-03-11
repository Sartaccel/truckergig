import React, { Component, Fragment } from 'react';
import router from "next/router";

const ResetLinkMail: React.FC = () => {

    const checkReset = (e) => {          
        e.preventDefault();
        router.push('/customerlogin');
    }

    return (
        <>
            <div className="row no-gutters align-items-center gig-login">
                <div className="col-md-3 shadow p-5 bg-white rounded">
                    <div className="row no-gutters">
                        <div className="col text-center">
                            <img className="logo" src="/images/logo_black.png" alt="logo" />
                        </div>
                    </div>
                    <div className="row no-gutters">
                        <div className="col">
                            <h1 className="pt-4 text-left">Reset Link Mailed</h1>

                        </div>
                    </div>
                    <div className="row no-gutters">
                        <div className="col">
                            <form action="/#" className="pt-4" >

                                <p>Please check your inbox for the reset link. Link valid for 10 minutes.</p>
                                <div className="row no-gutters">
                                    <div className="col">
                                        <button className="submit-button" type="button"  
                                        onClick={(e) =>{checkReset(e)}} 
                                        // status={this.state.loginBtnStatus}
                                         >Close</button>
                                    </div>
                                  </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ResetLinkMail;