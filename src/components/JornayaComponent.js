import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const JornayaComponent = ({ jornayaToken, onGetUniversalLeadId }) => {
    useEffect(() => {
        if (typeof window !== "undefined") {
            window.setUniversalLeadId = onGetUniversalLeadId;
            console.log(window.setUniversalLeadId)
            const script = document.createElement('script');
            script.id = 'LeadiDscript_campaign';
            script.type = 'text/javascript';
            script.async = true;
            script.defer = true;
            script.crossorigin = 'anonymous';
//             var s = document.createElement('script');
// s.id = 'LeadiDscript_campaign';
// s.type = 'text/javascript';
// s.async = true;
// s.src = '//create.lidstatic.com/campaign/5df7b9c8-4101-af29-b00d-ba3fb2493d5d.js?snippet_version=2';
// var LeadiDscript = document.getElementById('LeadiDscript');
// LeadiDscript.parentNode.insertBefore(s, LeadiDscript);
            script.src = `https://create.lidstatic.com/campaign/${jornayaToken}.js?snippet_version=2&callback=$setUniversalLeadId`;
            console.log(document.body.appendChild(script));
        }
    }, []);

    return null;
};

JornayaComponent.propTypes = {
    jornayaToken: PropTypes.string.isRequired,
    onGetUniversalLeadId: PropTypes.func.isRequired,
};

export default JornayaComponent;

