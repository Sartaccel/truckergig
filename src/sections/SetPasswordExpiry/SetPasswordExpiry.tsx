import React, { Component, Fragment } from 'react';
import router from "next/router";

const SetPasswordExpiry: React.FC = () => {

    const checkReset = (e) => {
        e.preventDefault();
        router.push('/login');
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
                            <h1 className="pt-4 text-left">Set Password Link Expired</h1>
                        </div>
                    </div>
                    <div className="row no-gutters">
                        <div className="col">
                            <form>
                                <p>Set password link is expired or invalid.</p>
                                <div className="row no-gutters">
                                    <div className="col">
                                        <button className="submit-button" type="button" onClick={(e) => { checkReset(e) }}>Close</button>
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

export default SetPasswordExpiry;