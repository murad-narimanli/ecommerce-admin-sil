import { SmileOutlined , FrownOutlined} from '@ant-design/icons';
import { notification } from 'antd';

const NotificationSet = (message , type , description) =>{
    notification.info({
        message,
        description,
        icon:type === 'success' ? <SmileOutlined /> : <FrownOutlined /> 
    });
}

export default NotificationSet