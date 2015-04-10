import Ember from 'ember';
import layout from './templates/calendar-view';
import Setup from './mixins/setup';
import DateTime from './utils/date-time';

var get = Ember.get;

export default Ember.Component.extend(Setup, {

  layout: layout,

  classNames: ['calendar-container'],

  monthYear: Ember.computed('parent._displayDate', function(){
    var selectedDate = get(this, 'parent._displayDate');
    return DateTime.getFullMonth(selectedDate) + ' ' + selectedDate.getFullYear();
  })

});
