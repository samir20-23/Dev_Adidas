'use client';

import Logo from '../../../src/components/logo_Comp/Logo';
import LineLoader from '../../../src/components/logo_Comp/Line_loader';
import '../../../src/css/LoadPageLogo.css';

export default function LoadPageLogo() {
    return (
        <div className="loadpagelogo">
            <Logo />
            <LineLoader />
        </div>
    );
}