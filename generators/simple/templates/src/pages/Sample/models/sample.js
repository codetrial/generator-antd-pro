import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { searchSample, getSample, saveSample } from '@/services/sample';

const initialState = function getInitialState() {
  return {
    sampleEntity: {},
    sampleList: {
      list: [],
      pagination: {},
    },
  };
};

export default {
  namespace: 'sample',

  state: initialState(),

  effects: {
    *getSample({ payload }, { call, put }) {
      try {
        const response = yield call(getSample, payload);
        yield put({
          type: 'updateEntity',
          payload: response.data,
        });
      } catch (err) {
        message.error('获取详情失败');
      }
    },
    *saveSample({ payload }, { call, put }) {
      try {
        yield call(saveSample, payload);

        message.success('保存成功');
        yield put(routerRedux.push('/sample/list'));
      } catch (err) {
        message.error('保存失败');
      }
    },
    *search({ payload }, { call, put }) {
      try {
        const response = yield call(searchSample, payload);
        yield put({
          type: 'updateList',
          payload: response.data,
        });
      } catch (err) {
        message.error('加载列表失败');
      }
    },
  },

  reducers: {
    updateEntity(state, action) {
      return {
        ...state,
        sampleEntity: action.payload || initialState().sampleEntity,
      };
    },
    updateList(state, action) {
      return {
        ...state,
        sampleList: action.payload || initialState().sampleList,
      };
    },
  },
};
