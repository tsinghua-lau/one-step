// index.ts
import axios from '../untils/request';
import { Booking, BookingReqForm } from '../untils/types';

// 获取预约列表
export const getBookingList = (params: Booking) => {
    return axios.post<Booking>('/yqfk-server/riskReport/getInCityCarReport', params);
};

// 获取知乎热榜
export const getHostListZh = () => {
    return axios.get('/zhihuresou/');
};

namespace Login {
    // 用户登录表单
    export interface LoginReqForm {
        username: string;
        password: string;
    }
    // 登录成功后返回的token
    export interface LoginResData {
        token: string;
    }
}
