import Ember from 'ember';
import layout from './templates/datetime-picker';
import DateTime from './utils/date-time';

const {
  computed,
  get: get,
  set: set,
  on
} = Ember;

export default Ember.Component.extend({

  layout: layout,

  tagName: 'div',
  classNames: ['ember-material-ui-datetime-picker'],

  // delete me later
  selectedTime: computed('_selectedDate', function(){

    var d = get(this, '_selectedDate');
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;

  }),

  // private vars
  _displayDate: null,
  _selectedDate: null,
  _weekCount: null,

  _prevMonth: null,
  _nextMonth: null,

  _currentState: 'default',

  // toggleMonthView: false,

  setSelected: Ember.observer('_selectedDate', function(){

    var date = get(this, '_selectedDate');

    this.setProperties({
      selectedDay: date.getDate(),
      selectedMonth: DateTime.getShortMonth(date),
      selectedDate: DateTime.getDayOfWeek(date),
      selectedYear: date.getFullYear()
    });

  }),

  // componentPartial: function() {

  //   return 'ember-material-ui-datetime-picker-month-selector';

  // }.property('_currentState'),

  componentPartial: computed('_currentState', function(){


      var state = get(this, '_currentState');
      var partial;

      switch(state) {
        case 'default':
          partial = 'ember-material-ui-datetime-picker-calendar-view';
          break;
        case 'selectMonth':
          partial = 'ember-material-ui-datetime-picker-month-selector';
          break;
        case 'selectYear':
          partial = 'ember-material-ui-datetime-picker-year-selector';
          break;
        case 'selectTime':
          partial = 'ember-material-ui-datetime-picker-time-selector';
          break;
      }

      return partial;

  }),

  // derp: computed('_state', function() {

  //   var state = get(this, '_state');
  //   var statePartial;

  //   statePartial = 'derp';

  //   // switch(state) {
  //   //   case 'default':
  //   //     statePartial = 'ember-material-ui-datetime-picker-calendar-view';
  //   //     break;
  //   //   case 'selectMonth':
  //   //     statePartial = 'ember-material-ui-datetime-picker-month-selector';
  //   //     break;
  //   //   case 'selectYear':
  //   //     statePartial = 'ember-material-ui-datetime-picker-year-selector';
  //   //     break;
  //   // }

  //   // console.log('statePartial', statePartial);

  //   return statePartial;
  //   // var state = getWithDefault(this, this._state, )
  //   // {{ember-material-ui-datetime-picker-month-view}}
  //   // {{ember-material-ui-datetime-picker-calendar-view}}
  //   // {{ember-material-ui-datetime-picker-month-selector}}
  //   // {{ember-material-ui-datetime-picker-year-selector}}

  // }),

  // state: function()

  // selectedDay: computed('_selectedDate', function(){
  //   return get(this, '_selectedDate').getDate();
  // }),

  // selectedMonth: computed('_selectedDate', function(){
  //   return DateTime.getShortMonth(get(this, '_selectedDate'));
  // }),




  // selectedDate: computed('_selectedDate', function(){
  //   return DateTime.getDayOfWeek(get(this, '_selectedDate'));
  // }),

  initialState: on('init', function(){

    var d = new Date();
    var displayDate = DateTime.getFirstDayOfMonth(d);
    var nextMonth;

    // _addDisplayDate: function(m) {
    //   var newDisplayDate = DateTime.clone(this.state.displayDate);
    //   newDisplayDate.setMonth(newDisplayDate.getMonth() + m);
    //   this._setDisplayDate(newDisplayDate);
    // },

    // _setDisplayDate: function(d, newSelectedDate) {
    //   var newDisplayDate = DateTime.getFirstDayOfMonth(d);
    //   var direction = newDisplayDate > this.state.displayDate ? 'left' : 'right';

    //   if (newDisplayDate !== this.state.displayDate) {
    //     this.setState({
    //       displayDate: newDisplayDate,
    //       transitionDirection: direction,
    //       selectedDate: newSelectedDate || this.state.selectedDate
    //     });
    //   }
    // },

    this.setProperties({
      _displayDate: displayDate,
      _selectedDate: d,
      _weekCount: DateTime.getWeekArray(displayDate)
      // _nextWeekCount: null
    });

  }),

  renderCalendar: on('didInsertElement', function(){
    console.log('didInsertElement', this.toString());

    // set(this, '_weekCount', weekCount);

  }),

  actions: {

    confirm: function() {

      console.log('confirm');
      this.sendAction('confirmAction', get(this, '_selectedDate'));

    },

    cancel: function() {

      console.log('cancel');
      this.sendAction('cancelAction');

    },

    setYear: function(year) {

      var newDate = DateTime.clone(get(this, '_displayDate'));
      newDate.setYear(year);

      this.setProperties({
        _displayDate: DateTime.getFirstDayOfMonth(newDate),
        _weekCount: DateTime.getWeekArray(newDate),
      });

      this.changeState('selectMonth');

      // set(this, '_currentState', 'selectMonth');

    },

    setMonth: function(params) {

      var newDate = DateTime.clone(get(this, '_displayDate'));
      newDate.setMonth(params.id);

      this.setProperties({
        _displayDate: DateTime.getFirstDayOfMonth(newDate),
        _weekCount: DateTime.getWeekArray(newDate),
      });

      this.changeState('default');
      // set(this, '_currentState', 'default');

    },

    changeMonth: function(delta) {

      console.log('changeMonth', delta);

      var newDate = DateTime.clone(get(this, '_displayDate'));
      newDate.setMonth(newDate.getMonth() + delta);

      this.setProperties({
        _displayDate: DateTime.getFirstDayOfMonth(newDate),
        _weekCount: DateTime.getWeekArray(newDate)
      });

    },

    changeYearRange: function(delta) {

      // console.log('changeYearRange', delta);
      var newDate = DateTime.clone(get(this, '_displayDate'));

      // handle positive
      if(delta > 0) {
        newDate.setYear(newDate.getFullYear() + 12);
      } else {
        newDate.setYear(newDate.getFullYear() - 12);
      }

      this.setProperties({
        _displayDate: DateTime.getFirstDayOfMonth(newDate),
        _weekCount: DateTime.getWeekArray(newDate)
      });

    },

    changeHour: function(delta) {

      var newDate = DateTime.clone(get(this, '_selectedDate'));
      newDate.setHours(newDate.getHours() + delta);

      this.setProperties({
        _selectedDate: newDate
      });

    },

    changeMinute: function(delta) {

      var newDate = DateTime.clone(get(this, '_selectedDate'));
      newDate.setMinutes(newDate.getMinutes() + delta);

      set(this, '_selectedDate', newDate);

    },

    changePeriod: function(delta) {

      var newDate = DateTime.clone(get(this, '_selectedDate'));
      var hours = newDate.getHours();

      hours = hours > 12 ? hours - 12 : hours + 12;
      newDate.setHours(hours);

      set(this, '_selectedDate', newDate);

    },

    changeYear: function(delta) {

      var newDate = DateTime.clone(get(this, '_displayDate'));
      newDate.setYear(newDate.getFullYear() + delta);

      this.setProperties({
        _displayDate: DateTime.getFirstDayOfMonth(newDate),
        _weekCount: DateTime.getWeekArray(newDate)
      });

    },

    toggleMonthView: function() {

      // console.log('toggleMonthView :)');
      // this.toggleProperty('toggleMonthView');
      // set(this, '_currentState', 'selectMonth');
      this.changeState('selectMonth');

    },

    toggleMonthSelector: function() {

      // console.log('parent toggleMonthsView');
      this.changeState('selectYear');
      // set(this, '_currentState', 'selectYear');

    },

    toggleTimeSelector: function() {

      var currentState = get(this, '_currentState');
      if(currentState === 'selectTime') {
        var previousState = get(this, '_previousState');
        set(this, '_currentState', previousState);
      } else {
        this.changeState('selectTime');
      }

    }

  },

  _previousState: null,

  changeState: function(state) {

    var currentState = get(this, '_currentState');
    set(this, '_previousState', currentState);
    set(this, '_currentState', state);

  }

});

// export default Ember.Component.extend({

//   layout: layout,

//   // tagName: 'ember-material-ui-datetime-picker',
//   tagName: 'div',
//   classNames: ['ember-material-ui-datetime-picker'],





// });
