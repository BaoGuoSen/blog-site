import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Tooltip, Popconfirm } from 'antd'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

const PopoverHandle = () => {
  const navigate = useNavigate()
  const logOut = () => {
    Cookies.remove('token')
    navigate('/login')
  }

  return (
    <div>
      <Tooltip title="个人中心" color="blue">
        <UserOutlined style={{ fontSize: 20, fontWeight: 900 }} />
        {/* <img src="https://gw.alipayobjects.com/mdn/rms_e695cc/afts/img/A*8wxuSZfaDWsAAAAAAAAAAAAAARQnAQ" alt="" /> */}
      </Tooltip>
      <Popconfirm
        placement="bottom"
        title="确认退出登录吗"
        onConfirm={logOut}
        cancelText="No"
        okText="Yes"
      >
        <Tooltip title="退出登录" color="orange">
          <LogoutOutlined
            style={{ fontSize: 20, fontWeight: 900, marginLeft: 24 }}
          />
        </Tooltip>
      </Popconfirm>
    </div>
  )
}

export default PopoverHandle
