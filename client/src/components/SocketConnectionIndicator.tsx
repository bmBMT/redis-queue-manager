import { Dot } from "lucide-react"
import { cx } from "antd-style"

interface ISocketConnectionIndicator {
	isConnected: boolean
}

const SocketConnectionIndicator = ({ isConnected }: ISocketConnectionIndicator) => {
	return <Dot size={30} className={cx("absolute top-0 left-0", isConnected ? "text-green-500" : "text-red-500")} />
}

export default SocketConnectionIndicator
