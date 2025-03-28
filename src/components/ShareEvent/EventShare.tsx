import React from "react";
import {
    WhatsappShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    TelegramShareButton,
    EmailShareButton
} from "react-share";
import {
    WhatsappIcon,
    FacebookIcon,
    TelegramIcon,
    LinkedinIcon,
    EmailIcon
} from "react-share";

export default function Socials(props) {
    return (
        <div className="socialsContainer">
            <h6>SHARE THIS EVENT</h6>
            <div className="row">
                <div className="col-4">
                    <WhatsappShareButton
                        url={props.url}
                        windowWidth={750}
                        windowHeight={600}
                        className="buttons"
                    >
                        <WhatsappIcon
                            size={30}
                            round={true}
                        />
                        <p className="socials-p">WhatsApp</p>
                    </WhatsappShareButton>
                </div>
                <div className="col-4">
                    <FacebookShareButton url={props.url} className="buttons-facebook">
                        <FacebookIcon
                            size={30}
                            round={true}
                        />
                        <p className="socials-p">Facebook</p>
                    </FacebookShareButton>
                </div>

                <div className="col-4">
                    <LinkedinShareButton
                        url={props.url}
                        windowWidth={750}
                        windowHeight={600}
                        className="buttons"
                    >

                        <LinkedinIcon
                            size={30}
                            round={true}
                        />
                        <p className="socials-p">LinkedIn</p>
                    </LinkedinShareButton>
                </div>
                <div className="col-4">
                    <TelegramShareButton
                        url={props.url}
                        windowWidth={750}
                        windowHeight={600}
                        className="buttons"
                    >
                        <TelegramIcon
                            size={30}
                            round={true}
                        />
                        <p className="socials-p">Telegram</p>
                    </TelegramShareButton>
                </div>
                <div className="col-4">
                    <EmailShareButton
                        url={props.url}
                        subject="This is a cool subject"
                        body={`Hey there plz share my link: ${props.url}`}
                        windowWidth={750}
                        windowHeight={600}
                        className="buttons"
                    >
                        <EmailIcon
                            size={30}
                            round={true}
                        />
                        <p className="socials-p">Email</p>
                    </EmailShareButton>
                </div>
            </div>
        </div>
    );
}
