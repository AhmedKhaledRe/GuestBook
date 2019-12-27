import * as moment from 'moment';

export const pretifyDate = date => moment(date).format("LLLL");

