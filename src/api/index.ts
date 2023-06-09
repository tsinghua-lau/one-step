// index.ts
import axios from '../untils/request';
import { Booking, Line, BookingReqForm } from '../untils/types';

// 获取预约列表
export const getBookingList = (params: Booking) => {
    return axios.post<Booking>('/yqfk-server/riskReport/getInCityCarReport', params);
};

// 获取知乎热榜
export const getHostListZh = () => {
    return axios.get('/zhihuresou/');
};

// 获取区间线段
export const getQJline = () => {
    return axios.get('/appapi/selectConfig');
};

// 获取新的路线规划
export const getNewLine = (params: Line) => {
    return axios.post<Line>('/appapi/updateByCon', params);
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
