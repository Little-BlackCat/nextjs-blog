'use client'

import { signOut } from "next-auth/react"

const UserAccountNav = () => {
	return (
		<button onClick={() => signOut({
			redirect: true,
			callbackUrl: `${window.location.origin}/sign-in`,
		})} className="btn btn-outline btn-error">
			Sign Out
		</button>
	)
}

export default UserAccountNav