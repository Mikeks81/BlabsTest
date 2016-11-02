import Ember from 'ember';

//formats track time from milli seconds to minutes and seconds
export function formatTrackTime(params) {
  var mins = Math.floor(params/60000);
  var seconds = ((params%60000) / 1000).toFixed(0);
  return (seconds == 60 ? (mins+1) + ":00" : mins + ":" + (seconds < 10 ? "0" : "") + seconds);
}

export default Ember.Helper.helper(formatTrackTime);
