App.Book  = Ember.Resource.extend({
  resourceUrl: '/book',
  resourceName: 'book',
  resourceProperties: ['name', 'author' , 'book_ispn' , 'price'],
	
	
	saveBook: function(isMyNew,btnVal) {
//		alert("save book")
//		alert(isMyNew);
    var self = this;
    return this._resourceRequest({type: isMyNew ? 'POST' : 'PUT',
                                  data: {"key1": this.serialize(), "back_button": btnVal}})
      .done(function(json) {
        // Update properties
        if (json) self.deserialize(json);
      });
  },

});

