import React from "react";

const UsernameInput = ({ handleChange }: { handleChange: any}) => {
	return (
		<input onChange={handleChange} type={"text"} />
	);
}

export default UsernameInput;
