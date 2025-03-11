import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'
import { FaShareAlt } from "react-icons/fa";
import styles from '../Saved/Saved.module.scss'
import styled from './Social.module.scss'
import * as IoIcons from 'react-icons/io';
import { FacebookShareButton, EmailShareButton, WhatsappShareButton } from "react-share";
import { FacebookIcon, EmailIcon, WhatsappIcon, } from "react-share";


const SocialShare: React.FC = (props) => {
    const [smShow, setSmShow] = useState(false);
    return (
        <>
            <div className="row" onClick={() => setSmShow(true)}>
                <div className="col-sm-1 col-md-6 col-xl-1 col-2">
                    <FaShareAlt />
                </div>
                <div className="col-sm-11 col-md-6 col-xl-8 col-10">
                    <p className={`${styles["jobtime"]}`}>Share</p>
                </div>
            </div>

            <Modal size="sm" show={smShow}
                onHide={() => setSmShow(false)}
                aria-labelledby="example-modal-sizes-title-sm">

                <ModalHeader>
                    <ModalTitle>Share</ModalTitle>
                    <IoIcons.IoIosClose size="25" className={`${styles["modal-close"]}`} onClick={() => setSmShow(false)} />
                </ModalHeader>
                <ModalBody>
                    <div className="container-fluid">
                        <div className={`${styled["rowsec"]}`}>
                            <div>
                                <FacebookShareButton
                                    url={"https://qa.truckergig.com"}
                                    quote={"Truckergig Jobs"}
                                    hashtag={"#DriverJobs"}
                                    className="Demo__some-network__share-button">
                                    <FacebookIcon size={32} round />
                                </FacebookShareButton>
                            </div>
                            <div>
                                <EmailShareButton
                                    url={"https://qa.truckergig.com/jobs"}
                                    title={"Truckergig Jobs"}
                                    className="Demo__some-network__share-button">
                                    <EmailIcon size={32} round />
                                </EmailShareButton>
                            </div>
                            <div>
                                <WhatsappShareButton
                                    url={"https://qa.truckergig.com/jobs"}
                                    title={"Truckergig Jobs"}
                                    className="Demo__some-network__share-button">
                                    <WhatsappIcon size={32} round /> 
                                </WhatsappShareButton>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>

                </ModalFooter>

            </Modal>
        </>
    );
}

export default SocialShare;
