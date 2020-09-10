import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import channel from './channel';
import tabs from './tabs';
import privateChannel from './privateChannel';

export default combineReducers({ alert, auth, channel, tabs, privateChannel });
