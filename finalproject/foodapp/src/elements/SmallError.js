import React from 'react';

const SmallError = ({ message }) => (
	<div>
        <p className="text-danger">
	
        <span className="message">{message}</span>
        </p>
	</div>

);

export default SmallError;