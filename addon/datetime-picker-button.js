import Ember from 'ember';
import layout from './templates/datetime-picker-button';
// import DateTime from './utils/date-time';
import Setup from './mixins/setup';

var get = Ember.get;

export default Ember.Component.extend(Setup, {

  layout: layout,

  tagName: 'div',
  classNames: ['datetime-picker-button'],
  classNameBindings: ['selected'],

  click: function() {

    console.log('datetime-picker-button click', get(this, 'action'), get(this, 'for').toString());

    get(this, 'for').send(get(this, 'action'), get(this, 'params'));
    // get(this, 'parent').send(get(this, 'action'), get(this, 'params'));

  },

  actions: {

    changeYear: function(delta) {
      get(this, 'parent').send('changeYear', delta);
    },

    changeMonth: function(delta) {
      get(this, 'parent').send('changeMonth', delta);
    },

    toggleMonthView: function() {
      get(this, 'parent').send('toggleMonthView')
    }

  }

});
