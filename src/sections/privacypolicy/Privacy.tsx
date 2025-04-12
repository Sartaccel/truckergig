import React, { useState, useEffect, createRef, useRef } from "react";
import styles from "./Privacy.module.scss";
import Breadcrumb from 'react-bootstrap/Breadcrumb'

const Privacy: React.FC = () => {
  return (
    <>
      <div className="row p-2">
        <div className='col'style={{marginLeft:"70px"}}>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Privacy Policy</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className={`${styles["privacy-page"]} container pt-0`}>
        <div className={`${styles["privacy-section"]} row`}>
          <div className="col-12">
            <div className={`${styles["section-title"]}`}>
              <div className={`${styles["comp-title"]}`}>TruckerGIG</div>
              <h2 className={`${styles["main-title"]}`}>
                Privacy <strong>Policy</strong>
              </h2>
            </div>

            <div className={`${styles["row-box"]}`}>
              <p>
                This Privacy Policy (the "Policy") describes how Tranzlogix
                Solutions LLC ("Tranzlogix", "we", "our" or "us") uses and
                discloses the information collected about you (your "personal
                information") when you visit this website, or when you contact
                us using the details available on it.
              </p>
              <p>
                Some of the products and/or services on the website are provided
                by Tranzlogix’s partners who will collect additional personal
                information from you to fulfil your requests. Our partners will
                use the personal information they collect as they describe in
                their privacy statements or as they explain when you provide
                your personal information.
              </p>
              <p>
                Tranzlogix includes the brands ELDMarketplace, and TruckerGIG.
              </p>
              <p>
                Tranzlogix has its Head Office at 11555 Medlock Bridge Road, Suite 100, Johns Creek, GA 30097.
              </p>
            </div>

            <div className={`${styles["row-box"]}`}>
              <h4 className={`${styles["sub-title"]}`}>
                1 Types of Information Collected
              </h4>
              <p>Tranzlogix collects personal information from the Website:</p>
              <ul>
                <li>
                  When you fill in forms (for example, if you register for an
                  account; and automatically using cookies and similar
                  technologies
                </li>
                <li>
                  The Website enables you to provide personal information
                  including:
                </li>
                <li>
                  Your name and contact information (such as your address,
                  telephone number(s) and email address) and information about
                  your business or employer if you are enquiring in a commercial
                  capacity;
                </li>
                <li>
                  Information about your vehicle (including your Vehicle
                  Identification Number ("VIN"), vehicle registration number,
                  and model);
                </li>
                <li>
                  The products and services in which you are interested;and your
                  contact and marketing preferences.
                </li>
                <li>
                  In addition, we collect your personal information if you
                  contact us using the details available through the Website
                  (for example, we will keep a record of the information you
                  provide when you write to us or contact our customer service
                  centers).
                </li>
              </ul>
            </div>
            <div className={`${styles["row-box"]}`}>
              <h4 className={`${styles["sub-title"]}`}>
                1.1 Methods of Collection
              </h4>
              <p>
                In the general conduct of business, Tranzlogix or its
                affiliates, collect information relevant to the services being
                sought from:
              </p>
              <ul>
                <li>Yourself</li>
                <li>Employers</li>
                <li>Credit / Default Agencies</li>
                <li>
                  Financial Institutes (Banks, Building Societies, Loan
                  Agencies, Credit Card companies).
                </li>
                <li>
                  Through consent to third parties disclosing information about
                  you to us that they have collected.
                </li>
              </ul>
              <p>
                Such information will generally be collected directly via the
                use of any of our standard forms, over the internet, via email,
                in our office or through a telephone conversation with you. We
                may also collect personal information through our affiliates.
              </p>
              <p>
                In addition, you may choose to submit information directly to us
                via several methods, including:
              </p>
              <ul>
                <li>Through Tranzlogix or its affiliates’ websites.</li>
                <li>In response to marketing or other communications.</li>
                <li>Through social media.</li>
                <li>By signing up for a Tranzlogix or affiliate service.</li>
                <li>
                  Through participation in an offer, program or promotion.
                </li>
                <li>
                  In connection with an actual or potential business or
                  employment relationship with us.
                </li>
              </ul>
              <p>
                You may also agree to third parties disclosing information about
                you to us that those third parties have collected.
              </p>
              <p>
                We, our service providers and partners collect certain
                information by using automated means, such as cookies, when you
                interact with our advertisements, or visit our websites, pages
                or other digital assets. The information we collect in this
                manner may include: IP address, browser type, operating system,
                referring URLs and information on actions taken or interaction
                with our digital assets.
              </p>
              <p>
                We use third-party web analytics services on our website. The
                analytics providers that administer these services use
                technologies such as cookies to help us analyse how visitors use
                our website.
              </p>
              <p>
                "Your Rights and Choices" section of this Privacy Notice
                specifies your ability, to opt out or limit the usage of the
                information collected.
              </p>
            </div>
            <div className={`${styles["row-box"]}`}>
              <h4 className={`${styles["sub-title"]}`}>
                1.2 Purposes of Collection
              </h4>
              <p>
                Generally, we will collect, use and hold your information for
                the purposes of:
              </p>
              <ul>
                <li>Providing Tranzlogix or affiliate services.</li>
                <li>
                  Conducting business, developing relationships with Tranzlogix
                  or its affiliates.
                </li>
                <li>
                  Process payments / transactions including: Accounting,
                  Authorisation, Clearing, Chargebacks, Auditing, Billing,
                  Reconciliation, Collection, Complaints, Enquiries, Credit
                  Checks and related dispute resolution activities.
                </li>
                <li>
                  Protect against and prevent fraud, unauthorised transactions,
                  money laundering (please see below), tax evasion, claims,
                  other liabilities and manage risk exposure and agent /
                  franchise quality, integrity, compliance and security of
                  business processes.
                </li>
                <li>
                  Create and manage any accounts, associated authentication
                  criteria (id’s and passwords) you may have with Tranzlogix or
                  its affiliates.
                </li>
                <li>
                  Provide, administer and communicate with you about Tranzlogix
                  or its affiliates products, services, offers, programs and
                  promotions, their issuers, acquirers, retailers and partners.
                </li>
                <li>
                  Compile business directories, including business contact
                  information.
                </li>
                <li>
                  Operate, monitor, evaluate and improve our services, websites,
                  and business.
                  <ul>
                    <li>Developing new products and services.</li>
                    <li>
                      Managing communications, assess effectiveness and
                      optimisation of advertising.
                    </li>
                    <li>
                      Functionality of our websites, applications and other
                      digital assets.
                    </li>
                  </ul>
                </li>
                <li>
                  Enforce Tranzlogix or its affiliates “Terms of Use”, other
                  legal rights as may be required by applicable laws and
                  regulations or requested by any judicial process or
                  governmental agency having or claiming jurisdiction over
                  Tranzlogix or its affiliates or its affiliates.
                </li>
                <li>
                  Comply with industry standards and Tranzlogix or its
                  affiliates policies.
                </li>
              </ul>
            </div>
            <div className={`${styles["row-box"]}`}>
              <h4 className={`${styles["sub-title"]}`}>
                Anti-Money Laundering
              </h4>
              <p>
                In addition to help you with ELD Product purchases and
                subscriptions we must comply with certain regulations for
                example the “Money Laundering, Terrorist Financing and Transfer
                of Funds (Information on the Payer) Regulations 2017 (referred
                to as “the Regulations).” Tranzlogix or its affiliates is
                required to obtain certain information from you to comply with
                regulations. The information provided will only be used by
                Tranzlogix or its affiliates in relation to complying with the
                Regulations and will not be shared with any other party unless
                we are required to do so under law.
              </p>
            </div>
            <div className={`${styles["row-box"]}`}>
              <h4 className={`${styles["sub-title"]}`}>
                1.3 Lawful Basis of Processing
              </h4>
              <p>
                Tranzlogix or its affiliates processes your information under
                the following:
              </p>
              <ul>
                <li>
                  Contractual necessity: where you enter into a contract with,
                  or via Tranzlogix or its affiliates and we need to process
                  your information as part of this contract.
                </li>
                <li>
                  Compliance with legal obligation: for example, providing your
                  details as part of protecting or managing your deposit with a
                  Tenancy Deposit scheme.
                </li>
                <li>
                  Legitimate interests: some information is processed by
                  Tranzlogix or its affiliates as part of its legitimate
                  interests which include: Fraud, risk assessment, due
                  diligence, network and information security, suppressions and
                  managing opting out of communications, direct marketing,
                  monitoring, web analytics, cloud storage, acquisitions,
                  updating customer details, lettings, sales, financial services
                  and other core products and service.
                </li>
                <li>
                  Public interest: some information is processed in accordance
                  with public interest such as providing your details to public
                  authorities, e.g. the local council for Council Tax purposes.
                </li>
                <li>
                  Consent: where we process information under consent we will
                  seek your clear and unambiguous consent prior to processing
                  your data.
                </li>
              </ul>
            </div>
            <div className={`${styles["row-box"]}`}>
              <h4 className={`${styles["sub-title"]}`}>
                2 Information We Share
              </h4>
              <p>
                We do not sell or disclose personal information we collect about
                you, except as described in this Privacy Notice or as indicated
                via the consent process at the time the data is collected. We
                share the information we collect with, but not limited to:
              </p>
              <ul>
                <li>
                  Vetted affiliates and partners / Financial Institutions /
                  Insurance Companies for business facilitation to provide
                  required products and services, such as ELD Hardware and
                  Subscriptions etc.
                </li>
                <li>
                  Contracted service providers to perform services on our
                  behalf: o Hosting Datacentres, Infrastructure, Applications
                  (Development / Support), Cloud Services (Software as a Service
                  - SaaS, Platform as a Service - PaaS, Infrastructure as a
                  Service - IaaS), Helpdesk, Call Centres etc. These service
                  providers safeguard the privacy and security of personal
                  information they process on our behalf and we authorise them
                  to use or disclose the information only as necessary to
                  perform services on our behalf or comply with legal
                  requirements.
                </li>
                <li>Debt collection companies</li>
                <li>Law firms</li>
              </ul>
              <p>
                Additionally, we may share information about you, if required
                legally, to prevent harm or financial / reputation loss, for
                investigation of suspected or actual fraudulent or illegal
                activities.
              </p>
              <p>
                On our website, features can be accessed where we partner with
                other entities that are not affiliated with Tranzlogix or its
                affiliates. These include social networking, geo-location tools
                etc. are operated by third parties (indicated appropriately) who
                may use or share personal information in accordance with their
                own privacy policies. It is recommended that you review the
                third parties' privacy policies if you use the relevant
                features.
              </p>
              <p>
                Tranzlogix or its affiliates reserves the right to transfer your
                information in the event of a sale or transfer (wholly or
                partially) of our business or assets, with reasonable efforts
                for the acquirer to protect / use your information consistent
                with our Privacy Notice. You can exercise your rights to contact
                the acquiring entity with questions concerning the protection
                and processing of your information.
              </p>
            </div>
            <div className={`${styles["row-box"]}`}>
              <h4 className={`${styles["sub-title"]}`}>
                2.1 How Long Do We Keep Your Information?
              </h4>
              <p>
                We will keep information for a reasonable amount of time to
                perform the purposes listed above.
              </p>
              <p>
                We only keep your information for as long as necessary. We
                generally keep personal information for 7 years after last
                contact with you. However, Tranzlogix or its affiliates reserves
                the right to keep information for longer if we feel that this is
                in the legitimate interests of Tranzlogix or its affiliates.
              </p>
            </div>
            <div className={`${styles["row-box"]}`}>
              <h4 className={`${styles["sub-title"]}`}>
                2.2 International Data Transfers
              </h4>
              <p>
                Tranzlogix or its affiliates may transfer the personal
                information collected about you to recipients (e.g. ELD Vendors)
                in countries other than the country in which the information was
                originally collected. Those countries may not have the same data
                protection laws as the country in which you initially provided
                the information. When we transfer your information to other
                countries, we will protect that information as described in this
                Privacy Notice or as otherwise disclosed to you at the time the
                data is collected. Generally, we use email to send this data. We
                use Transport Layer Security (TLS) to encrypt and protect email
                traffic. However, if the recipient’s email service does not
                support TLS, you should be aware that any emails we send or
                receive may not be protected in transit.
              </p>
            </div>
            <div className={`${styles["row-box"]}`}>
              <h4 className={`${styles["sub-title"]}`}>
                2.3 Your Rights and Choices
              </h4>
              <p>
                Your rights regarding the sensitive / personal information we
                maintain about you enable you to exercise choices about what
                personal information we collect from you, how we use that
                information, and how we communicate with you.
              </p>
            </div>
            <div className={`${styles["row-box"]}`}>
              <h4 className={`${styles["sub-title"]}`}>
                2.4 Access and Correction
              </h4>
              <p>You may have the right to:</p>
              <ul>
                <li>
                  Obtain confirmation that we hold personal information about
                  you.
                </li>
                <li>
                  Request access to and receive information about the personal
                  information we maintain about you.
                </li>
                <li>
                  Receive copies of the personal information we maintain about
                  you.
                </li>
              </ul>
              <p>
                If you wish to confirm whether your data is being used or
                processed by Tranzlogix or its affiliates and/or obtain access
                to information we hold on you, please email
                info@eldmarketplace.com. The right to access personal
                information may be limited in some circumstances by local law
                requirements.
              </p>
            </div>
            <div className={`${styles["row-box"]}`}>
              <h4 className={`${styles["sub-title"]}`}>
                2.5 Update and Correct Inaccuracies in Your Personal Information
              </h4>
              <p>
                If you feel that the information we hold about you is incorrect
                or inaccurate you can contact us outlining the information you
                feel is incorrect or inaccurate.If we refuse to correct your
                personal information, we will provide you with a written notice
                that sets out the reasons for our refusal (unless it would be
                unreasonable to provide those reasons) and provide you with a
                statement regarding the mechanisms available to you to make a
                complaint. We will provide you with access to information we
                hold about you:
              </p>
            </div>
            <div className={`${styles["row-box"]}`}>
              <h4 className={`${styles["sub-title"]}`}>
                2.6 Object to the Processing of Your Personal Information
              </h4>
              <p>
                If you would like to object to any processing of your
                information by Tranzlogix or its affiliates you can contact us
                outlining what processing of information you would like to
                object to.
              </p>
            </div>
            <div className={`${styles["row-box"]}`}>
              <h4 className={`${styles["sub-title"]}`}>
                2.7 Have the Information Blocked, Anonymised or Deleted
              </h4>
              <p>
                If you would like Tranzlogix or its affiliates to delete, block
                or anonymise information we hold about you, you can contact us
                outlining what information you would like deleted, blocked or
                anonymised.
              </p>
              <p>
                To update your preferences, ask us to remove your information
                from our mailing lists or submit a request to access, update,
                correct or delete your personal information, please contact us
                as specified in the “How to Contact Us” section below.
              </p>
            </div>
            <div className={`${styles["row-box"]}`}>
              <h4 className={`${styles["sub-title"]}`}>
                2.8 Opting Out of Processing
              </h4>
              <p>
                You can at any time tell us not to send you marketing
                communications by:
              </p>
              <ul>
                <li>Sending an email to info@eldmarketplace.com</li>
                <li>
                  Contacting Tranzlogix or its affiliates as indicated below.
                </li>
              </ul>
            </div>
            <div className={`${styles["row-box"]}`}>
              <h4 className={`${styles["sub-title"]}`}>
                2.9 Withdrawal of Consent
              </h4>
              <ul>
                <li>
                  If we obtain your information by consent you have the right to
                  withdraw any consent you previously provided to us.
                </li>
                <li>
                  If we process your information under legitimate interest you
                  can object at any time on legitimate grounds, to the
                  processing of your personal information.
                </li>
                <li>
                  Tranzlogix or its affiliates will apply your preferences going
                  forward. Doing so will mean that you cannot take advantage of
                  certain Tranzlogix or its affiliates and affiliate products,
                  services and promotions.
                </li>
                <li>
                  The right to consent removal may be limited in some
                  circumstances by local law, legitimate business purposes or
                  contractual requirements and you will be informed
                  appropriately.
                </li>
              </ul>
            </div>
            <div className={`${styles["row-box"]}`}>
              <h4 className={`${styles["sub-title"]}`}>
                3 How to Contact Us / Complaints and Feedback
              </h4>
              <p>If you:</p>
              <ul>
                <li>
                  Have a complaint about a breach of your personal information,
                  applicable privacy laws / principles or a concern about
                  Tranzlogix or its affiliates privacy practices.
                </li>
                <li>
                  Would like access and/or update information or preferences you
                  provided to us,
                </li>
              </ul>
              <p>You may e-mail us at: info@truckergig.com</p>
              <p>Or write to us at:</p>
              <address>
                TruckerGIG - Privacy Department <br />
                11555 Medlock Bridge Road, Suite 100,<br />
                Johns Creek, GA 30097.<br />
                Toll-free: (833) 353-7773 / 833-Trucker.
              </address>
              <p>
                If we fall short of your expectations in processing your
                personal information or you wish to make a complaint about our
                privacy practices, please contact us via the details above.
              </p>
              <p>
                To assist us in responding to your request, please give full
                details of the issue. We attempt to review and respond to all
                complaints within a reasonable time. If we cannot for lawful
                reasons complete your request, we will explain this to you to
                the extent that we lawfully can.
              </p>
            </div>
            <div className={`${styles["row-box"]}`}>
              <h4 className={`${styles["sub-title"]}`}>
                3.1 How We Protect Personal Information
              </h4>
              <p>
                The security of your personal information is very important and
                Tranzlogix or its affiliates is committed to protecting the
                information we collect. We maintain administrative, technical
                and physical safeguards designed to protect the personal
                information you provide, or we collect against accidental,
                unlawful or unauthorised destruction, loss, alteration, access,
                disclosure or use.
              </p>
              <p>
                Tranzlogix or its affiliates stores personal information only
                for as long as it is necessary for the fulfilment of the purpose
                for which the personal information was collected, unless
                otherwise required or authorised by applicable law. We take
                measures to destroy or permanently de-identify personal
                information if required by law or if the personal information is
                no longer required for the purpose for which we collected it.
              </p>
            </div>
            <div className={`${styles["row-box"]}`}>
              <h4 className={`${styles["sub-title"]}`}>
                4 Updating this Privacy Statement
              </h4>
              <p>
                We will update this statement from time to time, so we suggest
                that you review this statement at regular intervals. Where we
                undergo substantial changes to our privacy statement we will
                endeavour to inform you directly about these changes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Privacy;
