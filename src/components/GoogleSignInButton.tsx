import { FC, ReactNode } from "react"

interface GoogleSignInButtonProps {
	children: ReactNode;
}

const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ children }) => {
	function loginWithGoogle () {
		console.log("Login with Google.")
	}

	return (
		<div className="btn btn-neutral w-full" onClick={loginWithGoogle}>{children}</div>
	)
}

export default GoogleSignInButton