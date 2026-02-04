import React from "react"
import Linkedin from "../../icons/linkedin"
import Instagram from "../../icons/instagram"
import TikTok from "../../icons/tiktok"

function Footer() {
	return (
		<div>
			<div className="grid grid-cols-2 bg-[black] !w-[100%] absolute bottom-0">
				<div className="p-2 flex items-center">
					<div className="text-[#94a3b8] text-sm">Copyright © 2024 JigJoy. All rights reserved.</div>
				</div>
				<div className="p-2">
					<div className="justify-end">
						<div className="flex gap-2 lg:mx-2 justify-end">
							<a href="https://www.instagram.com/jigjoy.io/" target="_blank">
								<Linkedin color="#94a3b8" />
							</a>
							<a href="https://www.instagram.com/jigjoy.io/" target="_blank">
								<Instagram color="#94a3b8" />
							</a>
							<a href="https://www.tiktok.com/@jigjoy.io" target="_blank">
								<TikTok color="#94a3b8" />
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Footer
