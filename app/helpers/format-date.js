import Ember from 'ember';

export function formatDate(params) {
	//formate date helper to use on the template
  return moment(params[0]).format('MM/DD/YYYY');
}

export default Ember.Helper.helper(formatDate);
