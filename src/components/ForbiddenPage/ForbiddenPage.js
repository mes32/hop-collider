import React from 'react';

// This page is shown to the user if they somehow navigate to a page that they 
// are not authorized to use. This is not security, but rather UX that hides 
// pages that will seem broken if the user lacks adminstrative privileges.
const ForbiddenPage = () => (
    <div>
        <h2><span role="img" aria-label="">😈</span> Forbidden Page <span role="img" aria-label="">😈</span></h2>
    </div>
);

export default ForbiddenPage;