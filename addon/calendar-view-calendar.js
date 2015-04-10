import Ember from 'ember';
import layout from './templates/calendar-view-calendar';
import Setup from './mixins/setup';
// import DateTimePicker from './datetime-picker';

var set = Ember.set;
var get = Ember.get;

export default Ember.Component.extend(Setup, {

  layout: layout,
  classNames: ['calendar-month'],

  weekCount: Ember.computed.alias('parent._weekCount'),

  nextMonth: Ember.computed.alias('parent._nextMonth')

  // setup: Ember.on('init', function() {

  //   this.setProperties({
  //     parent: this.nearestOfType(DateTimePicker)
  //   });

  //   // // console.log(get(this, 'parent').get('someDumbVar'));
  //   // console.log('--->', get(this, 'parent').get('_weekCount'));

  // })

});
