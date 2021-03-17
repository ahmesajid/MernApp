import React from "react";
import Footer from "./Footer";
function PrivacyPolicy() {
  return (
    <>
      <div className="container-fluid mt-5">
        <h3 style={{ fontSize: "30px" }}>Privacy Policy</h3>
        <hr />
        <div className="mt-5">
          <h3 style={{ fontSize: "25px" }}>Introduction</h3>
          <p
            className="mt-3"
            style={{
              fontSize: "15px",
              color: "#808080",
            }}
          >
            Our Company (the "Company," "we," "our" or "us") respect your
            privacy and are committed to protecting it through our compliance
            with this policy. We will never share your personally identifiable
            information with third parties without your consent.
          </p>
          <br />
          <div className="mt-3">
            <h3 style={{ fontSize: "25px" }}>This Policy Describes:</h3>
          </div>
          <div style={{ fontSize: "15px", color: "#808080" }}>
            <br />
            <ul className="mt-2">
              <li>
                The types of information we may collect from you or that you may
                provide when you:
              </li>
              <ul>
                <li>
                  Visit, access or use our online application that run on smart
                  phones, tablets and other devices, which provide dedicated
                  non-browser- based interaction between you and our application
                  ("apps");
                </li>
                <li>
                  Communicate with us electronically and through other means;
                </li>
                <li>View or click on our ads or other online content;</li>
                <li>
                  Interact with us through social media websites and other
                  websites and apps
                </li>
                <li>
                  Our practices for collecting, using, maintaining, protecting
                  and disclosing that information.
                </li>
              </ul>
            </ul>
          </div>
        </div>
        <hr className="mt-5" />
        <h3 style={{ fontSize: "25px" }}>Changes to our Privacy Policy</h3>
        <div className="mt-3" style={{ fontSize: "15px", color: "#808080" }}>
          <p>
            We may update our privacy policy from time to time. If we make
            material changes to our privacy policy, we will post the updated
            privacy policy on this page
          </p>

          <p>
            You are responsible for ensuring we have an up-to-date active and
            deliverable e-mail address and/or phone number for you and for
            periodically visiting this privacy policy to check for any changes.
          </p>
        </div>
        <br />
        <h3 style={{ fontSize: "25px" }}>Contact Information</h3>
        <div
          className="mt-3 mb-4"
          style={{ fontSize: "15px", color: "#808080" }}
        >
          To ask questions or comment about this privacy policy and our privacy
          practices, please contact us.
        </div>
      </div>
    </>
  );
}
export default PrivacyPolicy;
