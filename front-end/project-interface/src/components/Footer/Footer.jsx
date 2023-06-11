import React from "react";

import "./Footer.css";

import Logo from "../../assets/logoUERJ.png"

export default function Footer() {
    return (
        <div className="Footer">
            <img src={Logo} alt="UERJ Logo" className="uerj-logo" />
        </div>
    );
}
