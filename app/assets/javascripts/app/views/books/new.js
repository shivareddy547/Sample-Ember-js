App.NewBookView = Ember.View.extend({
  tagName:      'form',
  templateName: 'templates/books/new',
  emp: null,
  isSavebook: null,
  classNames: ['ember-view', 'my-other-class'],

  init: function() {
    this._super();
    this.set("book", App.Book.create());
   },

  didInsertElement: function() {
    this._super();
    this.$('input:first').focus();
  },

  cancelForm: function() {
    $.ajax({
    url: "/employees/new",
    dataType: 'json'
    } );

    this.firstStep();
    this.get("parentView").hideNew();
  },

  firstStep: function(){
    this.set('firstStepValue',true);
    this.set('secondStepValue',false);
    this.set('lastStepValue',false);
  },
  secondStep: function(){
    this.set('firstStepValue',false);
    this.set('secondStepValue',true);
    this.set('lastStepValue',false);
  },
 
  lastStep: function(){
    this.set('firstStepValue',false);
    this.set('secondStepValue',false);
    this.set('lastStepValue',true);
  },
  nextSubmit: function(){
//alert("sss")
    this.submit("next");
  },
  prevSubmit: function(){
    
    this.submit("prev");
  },
 bookSubmit: function(event){
    
    alert("book submit")
    var book = this.get("book");
alert(book);
  App.booksController.set("totalValues",App.booksController.get("totalValues")+1);
           
    App.booksController.pushObject(book);
  },

  submit: function(event) {
//alert("submit")
    var actionValue = event
    var self = this;
    var book = this.get("book");
   
   book.set("isSaveEmp",true);
    book.saveBook(book.get("isSaveEmp"),actionValue)
      .fail( function(e) {
//alert("fail")
        App.displayError(e);
      })
      .done(function() {
//alert("done");
         if(self.get("firstStepValue") === true){
           self.set("emp",employee);
           self.secondStep();
           self.set("isSaveEmp",false);
         }
         else if (self.get("secondStepValue") === true){
            if(actionValue === "next"){
             self.set("emp", self.get("emp")+ employee);
             self.lastStep();
             self.set("isSaveEmp",false);
            }else{
              self.firstStep();
            }
         }
         else {
         book.set("emp", book.get("emp")+ book);
           App.booksController.set("totalValues",App.booksController.get("totalValues")+1);
           self.get("parentView").hideNew();
           self.set("isSaveEmp",true);
       
           App.booksController.pushObject(book);
         }       
      });


  }
});

