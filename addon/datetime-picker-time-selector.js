import Ember from 'ember';
import layout from './templates/datetime-picker-time-selector';
import DateTime from './utils/date-time';
import Setup from './mixins/setup';

const {
  observer,
  get: get
} = Ember;

export default Ember.Component.extend(Setup, {

  layout: layout,

  tagName: 'div',
  classNames: ['time-selector'],

  setSelected: observer('parent._selectedDate', function(){

    var date = get(this, 'parent._selectedDate');
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var period = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;

    this.setProperties({
      selectedHour: hours,
      selectedMinute: minutes,
      selectedPeriod: period
    });

  }),

  actions: {

    changeHour: function(delta) {
      get(this, 'parent').send('changeHour', delta);
    },

    changeMinute: function(delta) {
      get(this, 'parent').send('changeMinute', delta);
    },

    changePeriod: function() {
      get(this, 'parent').send('changePeriod');
    }

  }

});
