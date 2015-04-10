import Ember from 'ember';
import DateTimePicker from '../datetime-picker';

var get = Ember.get;
var set = Ember.set;

export default Ember.Mixin.create({

  _registerParent: Ember.on('init', function(){

    var parent = this.nearestOfType(DateTimePicker);

    set(this, 'parent', parent);
    // set(this, 'parentDate', get(parent, '_selectedDate'));

  })

});
