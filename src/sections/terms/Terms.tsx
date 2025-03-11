import React, { useState, useEffect, createRef, useRef } from "react";
import styles from "./Terms.module.scss";
import Breadcrumb from 'react-bootstrap/Breadcrumb'

const Terms: React.FC = () => {
  return (
    <>
    <div className='row p-2'>
        <div className='col'>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Terms & Conditions</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className={`${styles["terms-page"]} container pt-0`}>
        <div className={`${styles["term-section"]} row`}>
          <div className="col-12">
            <div className={`${styles["section-title"]}`}>
              <div className={`${styles["comp-title"]}`}>TruckerGIG</div>
              <h2 className={`${styles["main-title"]}`}>
                TERMS OF<strong> SERVICE</strong>
              </h2>
            </div>
            <div className={`${styles["row-box"]}`}>
              <p>
                This website is operated by Tranzlogix Solutions LLC. Throughout
                the site, the terms “we”, “us” and “our” refer to Tranzlogix
                Solutions LLC. Tranzlogix Solutions LLC offers this website,
                including all information, tools and services available from
                this site to you, the user, conditioned upon your acceptance of
                all terms, conditions, policies and notices stated here.
              </p>
              <p>
                By visiting our site and/ or purchasing something from us, you
                engage in our “Service” and agree to be bound by the following
                terms and conditions (“Terms of Service”, “Terms”), including
                those additional terms and conditions and policies referenced
                herein and/or available by hyperlink. These Terms of Service
                apply to all users of the site, including without limitation
                users who are browsers, vendors, customers, merchants, and/ or
                contributors of content.
              </p>
              <p>
                Please read these Terms of Service carefully before accessing or
                using our website. By accessing or using any part of the site,
                you agree to be bound by these Terms of Service.
              </p>
              <p>
                You can review the most current version of the Terms of Service
                at any time on the TruckerGIG website. We reserve the right to
                update, change or replace any part of these Terms of Service by
                posting updates and/or changes to our website.
              </p>
            </div>
            <div className={`${styles["row-box"]}`}>
              <h4 className={`${styles["sub-title"]}`}>
                SECTION 1 - ONLINE STORE TERMS
              </h4>
              <p>
                By agreeing to these Terms of Service, you represent that you
                are at least the age of majority in your state or province of
                residence, or that you are the age of majority in your state or
                province of residence and you have given us your consent to
                allow any of your minor dependents to use this site.
              </p>
            </div>
            <div className={`${styles["row-box"]}`}>
              <h4 className={`${styles["sub-title"]}`}>
                SECTION 2 - ACCURACY, COMPLETENESS AND TIMELINESS OF INFORMATION
              </h4>
              <p>
                We do our utmost to insure information made available on this
                site is accurate, complete and current. However, the material on
                this site is provided for general information only and should
                not be relied upon or used as the sole basis for making
                decisions.
              </p>
            </div>
            <div className={`${styles["row-box"]}`}>
              <h4 className={`${styles["sub-title"]}`}>
                SECTION 3 - MODIFICATIONS TO THE SERVICE AND PRICES
              </h4>
              <p>
                We strive to provide notification of updates to services and
                prices but as we rely on third-party vendors this may not always
                be possible, and we may have to modify or discontinue the
                Service (or any part or content thereof) without notice. We
                shall not be liable to you or to any third-party for any
                modification, price change, suspension or discontinuance of the
                Service.
              </p>
            </div>
            <div className={`${styles["row-box"]}`}>
              <h4 className={`${styles["sub-title"]}`}>
                SECTION 4 - PRODUCTS OR SERVICES
              </h4>
              <p>
                We make every effort to display as accurately as possible the
                colors and images of the products that appear at the store. We
                cannot guarantee that your computer monitor's display of any
                color will be accurate.
              </p>
              <p>
                The descriptions of products or product pricing are subject to
                change and we reserve the right to discontinue any product.
              </p>
              <p>
                We will do our utmost to ensure that the quality of any
                products, services, information, or other material purchased or
                obtained by you will meet your expectations and aim to ensure
                that any errors in the Service will be corrected.
              </p>
            </div>
            <div className={`${styles["row-box"]}`}>
              <h4 className={`${styles["sub-title"]}`}>
                SECTION 5 - ACCURACY OF BILLING AND ACCOUNT INFORMATION
              </h4>
              <p>
                If we make a change to or cancel an order, we may attempt to
                notify you by contacting the e-mail and/or billing address/phone
                number provided at the time the order was made.
              </p>
              <p>
                You agree to provide current, complete and accurate purchase and
                account information for all purchases made at our store. You
                agree to promptly update your account and other information,
                including your email address and credit card numbers and
                expiration dates, so that we can complete your transactions and
                contact you as needed.
              </p>
            </div>
            <div className={`${styles["row-box"]}`}>
              <h4 className={`${styles["sub-title"]}`}>
                SECTION 6 - OPTIONAL TOOLS
              </h4>
              <p>
                We may provide you with access to third-party tools over which
                we neither monitor nor have any control nor input.
              </p>
              <p>
                These tools are provided on an ”as is” and “as available”
                without any warranties, representations or conditions of any
                kind and without any endorsement.
              </p>
            </div>
            <div className={`${styles["row-box"]}`}>
              <h4 className={`${styles["sub-title"]}`}>
                SECTION 7 - THIRD-PARTY LINKS
              </h4>
              <p>
                Certain content, products and services available via our Service
                may include materials from third-parties.
              </p>
              <p>
                Third-party links on this site may direct you to third-party
                websites that are not affiliated with us. We aim to ensure we
                only do this for trusted third-parties, but we do not examine or
                evaluate their content or accuracy.
              </p>
              <p>
                Please review carefully the third-party's policies and practices
                and make sure you understand them before you engage in any
                transaction. Complaints, claims, concerns, or questions
                regarding third-party products should be directed to the
                third-party.
              </p>
            </div>
            <div className={`${styles["row-box"]}`}>
              <h4 className={`${styles["sub-title"]}`}>
                SECTION 8 - USER COMMENTS, FEEDBACK AND OTHER SUBMISSIONS
              </h4>
              <p>
                We welcome your comments, feedback and other submissions. You
                agree that we may, at any time, without restriction, edit, copy,
                publish, distribute, translate and otherwise use in any medium
                any comments that you forward to us.
              </p>
              <p>
                We may monitor, edit or remove content that we determine in our
                sole discretion are unlawful, offensive, threatening, libelous,
                defamatory, obscene or otherwise objectionable or violates any
                party’s intellectual property or these Terms of Service.
              </p>
              <p>
                You agree that your comments will not violate any right of any
                third-party nor not contain libelous or otherwise unlawful,
                abusive or obscene material, or contain any computer virus or
                other malware that could in any way affect the operation of the
                Service or any related website.
              </p>
            </div>
            <div className={`${styles["row-box"]}`}>
              <h4 className={`${styles["sub-title"]}`}>
                SECTION 9 - PERSONAL INFORMATION
              </h4>
              <p>
                We take protection of your personal information seriously, and
                your submission of personal information through the store is
                governed by our Privacy Policy. This is available on the
                TruckerGIG website.
              </p>
            </div>
            <div className={`${styles["row-box"]}`}>
              <h4 className={`${styles["sub-title"]}`}>
                SECTION 10 - ERRORS, INACCURACIES AND OMISSIONS
              </h4>
              <p>
                While we strive to eliminate errors, inaccuracies and omissions,
                occasionally there may be information on our site or in the
                Service that contains these. We reserve the right to correct any
                errors, inaccuracies or omissions, and to change or update
                information or cancel orders if any information in the Service
                or on any related website is inaccurate.
              </p>
            </div>
            <div className={`${styles["row-box"]}`}>
              <h4 className={`${styles["sub-title"]}`}>
                SECTION 11 - PROHIBITED USES
              </h4>
              <p>
                You may not use the site or its content: (a) for any unlawful
                purpose; (b) to infringe upon or violate our intellectual
                property rights or the intellectual property rights of others;
                (c) to upload or transmit viruses or any other type of malicious
                code that will or may be used in any way that will affect the
                functionality or operation of the Service or of any related
                website, other websites, or the Internet; (d) to collect or
                track the personal information of others; (e) to spam, phish,
                pharm, pretext, spider, crawl, or scrape; or (f) to interfere
                with or circumvent the security features of the Service or any
                related website, other websites, or the Internet. We reserve the
                right to terminate your use of the Service or any related
                website for violating any of the prohibited uses.
              </p>
            </div>
            <div className={`${styles["row-box"]}`}>
              <h4 className={`${styles["sub-title"]}`}>
                SECTION 12 - DISCLAIMER OF WARRANTIES; LIMITATION OF LIABILITY
              </h4>
              <p>
                We will do our utmost to ensure your use of our service will be
                uninterrupted, timely, secure and error-free, but do not
                guarantee this.
              </p>
              <p>
                The products and services delivered to you through the website
                are reliant on third-parties including manufacturers and vendors
                and are subject to their guarantees / warrantees. We will work
                on your behalf to try to resolve any issues but Tranzlogix
                Solutions LLC, our directors, officers, employees, affiliates,
                agents, contractors, interns, suppliers, service providers or
                licensors will not be liable for any injury, loss, claim, or any
                direct, indirect, incidental, punitive, special, or
                consequential damages of any kind.
              </p>
              <p>
                Where states or jurisdictions do not allow the exclusion or the
                limitation of liability for consequential or incidental damages,
                our liability shall be limited to the maximum extent permitted
                by law.
              </p>
            </div>
            <div className={`${styles["row-box"]}`}>
              <h4 className={`${styles["sub-title"]}`}>
                SECTION 13 - INDEMNIFICATION
              </h4>
              <p>
                You agree to indemnify, defend and hold harmless Tranzlogix
                Solutions LLC and our parent, subsidiaries, affiliates,
                partners, officers, directors, agents, contractors, licensors,
                service providers, subcontractors, suppliers, interns and
                employees, harmless from any claim or demand, including
                reasonable attorneys’ fees, made by any third-party due to or
                arising out of your breach of these Terms of Service or the
                documents they incorporate by reference, or your violation of
                any law or the rights of a third-party.
              </p>
            </div>
            <div className={`${styles["row-box"]}`}>
              <h4 className={`${styles["sub-title"]}`}>
                SECTION 14 - SEVERABILITY
              </h4>
              <p>
                If any provision of these Terms of Service is determined to be
                unlawful, void or unenforceable, such provision shall
                nonetheless be enforceable to the fullest extent permitted by
                applicable law, and the unenforceable portion shall be deemed to
                be severed from these Terms of Service, such determination shall
                not affect the validity and enforceability of any other
                remaining provisions.
              </p>
            </div>
            <div className={`${styles["row-box"]}`}>
              <h4 className={`${styles["sub-title"]}`}>
                SECTION 15 - TERMINATION
              </h4>
              <p>
                The obligations and liabilities of the parties incurred prior to
                the termination date shall survive the termination of this
                agreement for all purposes.
              </p>
              <p>
                These Terms of Service are effective unless and until terminated
                by either you or us. You may terminate these Terms of Service at
                any time by notifying us that you no longer wish to use our
                Services, or when you cease using our site.
              </p>
              <p>
                We also may terminate this agreement at any time without notice
                and you will remain liable for all amounts due up to and
                including the date of termination; and/or accordingly may deny
                you access to our Services (or any part thereof).
              </p>
            </div>
            <div className={`${styles["row-box"]}`}>
              <h4 className={`${styles["sub-title"]}`}>
                SECTION 16 - GOVERNING LAW
              </h4>
              <p>
                These Terms of Service and any separate agreements whereby we
                provide you Services shall be governed by and construed in
                accordance with the laws of Atlanta, Georgia, USA.
              </p>
            </div>
            <div className={`${styles["row-box"]}`}>
              <h4 className={`${styles["sub-title"]}`}>
                SECTION 17 - CHANGES TO TERMS OF SERVICE
              </h4>
              <p>
                You can review the most current version of the Terms of Service
                at any time at on the TruckerGIG website.
              </p>
              <p>
                We reserve the right, at our sole discretion, to update, change
                or replace any part of these Terms of Service by posting updates
                and changes to our website. Please check our website
                periodically for changes. Your use of or access to our website
                or the Service following the posting of any changes to these
                Terms of Service constitutes acceptance of those changes.
              </p>
            </div>
            <div className={`${styles["row-box"]}`}>
              <h4 className={`${styles["sub-title"]}`}>
                SECTION 18 - CONTACT INFORMATION
              </h4>
              <p>
                Questions about the Terms of Service may be sent to us at
                tg@tranzlogix.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Terms;
