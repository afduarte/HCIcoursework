$(function() {
  var imgBasePath = 'assets/img/';
  
  // Object holding the available stuff
  var stuffAvailable = {
    bg: ["bg/1.jpg","bg/2.jpg"],
    models: [
      {
        img: 'models/guy.png',
        shirts: [],
        trousers: []

      },
      {
        img: 'models/girl.png',
        shirts: [],
        trousers: []

      }
    ]
  };
  
    // var to hold the initial state and keep track of the changes
  var state = {
    bg: {
      img:stuffAvailable.bg[0]
    },
    model: stuffAvailable.models[0]
  };
  
  // Load BG
  $('.main-frame img#bg').attr('src',imgBasePath+state.bg.img);
  
  // Super complicated series of functions to load the initial bg and model that takes care of javascript's asynchronous behaviour
  $('.main-frame img#bg').load(function(){
    
    // Store the height of the bg img, cause we'll use it later
    state.bg.height = parseFloat($('.main-frame img#bg').css('height'));
    // On BG load, load the model
    $('.main-frame img#model').attr('src',imgBasePath+state.model.img);
    // On Model load, center the model in the bg
    $('.main-frame img#model').load(function(){
      $('.main-frame img#model').css('margin-top', function(){
        return (state.bg.height/2)-(parseFloat($('.main-frame img#model').css('height'))/2);
      });
      
      $('.clothes-picker').css('height',state.bg.height);
      $('.main-frame img#model').css('display','block');
    });
  });

});