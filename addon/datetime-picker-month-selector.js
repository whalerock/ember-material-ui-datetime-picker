import Ember from 'ember';
import layout from './templates/datetime-picker-month-selector';
import DateTime from './utils/date-time';
import Setup from './mixins/setup';

var get = Ember.get;
var set = Ember.set;

export default Ember.Component.extend(Setup, {

  layout: layout,

  tagName: 'div',
  classNames: ['month-view'],

  year: Ember.computed('parent._displayDate', function(){
    var year = get(this, 'parent._displayDate').getFullYear();
    return year;
  }),

  selectedMonth: Ember.computed('parent._selectedDate', 'parent._displayDate', function(){

    var selectedDate = get(this, 'parent._selectedDate');
    var displayDate = get(this, 'parent._displayDate');

    if(displayDate.getFullYear() === selectedDate.getFullYear()) {
      var selectedMonth = selectedDate.getMonth();
      var item = get(this, 'months').objectAt(selectedMonth);
      set(item, 'isSelected', true);
    } else {
      // @todo: fix this. too much iteration(!)
      this.resetMonths();
    }

  }),

  formatDate: function(date) {
    return date.getMonth() + '/' + date.getFullYear();
  },

  resetMonths: function() {
    get(this, 'months').forEach(function(item){
      set(item, 'isSelected', false);
    });
  },

  months: null,

  setupMonths: Ember.on('init', function(){
    set(this, 'months', [
      {id: 0, name: 'Jan'},
      {id: 1, name: 'Feb'},
      {id: 2, name: 'Mar'},
      {id: 3, name: 'Apr'},
      {id: 4, name: 'May'},
      {id: 5, name: 'Jun'},
      {id: 6, name: 'Jul'},
      {id: 7, name: 'Aug'},
      {id: 8, name: 'Sep'},
      {id: 9, name: 'Oct'},
      {id: 10, name: 'Nov'},
      {id: 11, name: 'Dec'}
    ])
  }),

  actions: {

    setMonth: function(params) {

      console.log('month-view setMonth');
      get(this, 'parent').send('setMonth', params);

    }

  }

});
