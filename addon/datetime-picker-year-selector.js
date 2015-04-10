import Ember from 'ember';
import layout from './templates/datetime-picker-year-selector';
import DateTime from './utils/date-time';
import Setup from './mixins/setup';

var get = Ember.get;
var set = Ember.set;

export default Ember.Component.extend(Setup, {

  layout: layout,

  tagName: 'div',
  classNames: ['year-view'],

  // year: Ember.computed('parent._displayDate', function(){
  //   var year = get(this, 'parent._displayDate').getFullYear();
  //   return year;
  // }),
  yearsArray: null,

  yearRange: Ember.computed('years', function(){

    return get(this, 'years.firstObject.year') + '-' + get(this, 'years.lastObject.year');

  }),

  years: Ember.computed('parent._displayDate', function(){

    var year = get(this, 'parent._displayDate').getFullYear();
    var selectedYear = get(this, 'parent._selectedDate').getFullYear();
    var yearsLowerBound = year-5;
    var yearsUpperBound = year+7;
    var years = [];

    for(var i = yearsLowerBound; i < yearsUpperBound; i++ ) {
      if(i === selectedYear) {
        years.push({year: i, isSelected: true});
      } else {
        years.push({year: i});
      }
    }

    set(this, 'yearsArray', years);

    return years;

  }),

  actions: {

    setYear: function(params) {

      get(this, 'parent').send('setYear', params.year);

    }

  }

});
