$(function() {
  var imgBasePath = 'assets/img/';

  // Object holding the available stuff
  stuffAvailable = {
    bg: ["bg/1.jpg","bg/2.jpg"],
    models: [
      {
        img: 'models/guy.png',
        tops: [
          {
            object:{
              name: 'hipShirt',
              desc: 'super-hip shirt',
              path: 'models/guy/tops/shirt1.png',
              colours: ['red','blue','black']
            }
          },
          {
            object:{
              name: 'hipperShirt',
              desc: 'even-hipper shirt',
              path: 'models/guy/tops/shirt2.png',
              colours: ['red','blue','black']
            }
          },
          {
            object:{
              name: 'mehShirt',
              desc: 'yeah, just another shirt',
              path: 'models/guy/tops/shirt3.png',
              colours: ['red','blue','black']
            }
          },
          {
            object:{
              name: 'dogeShirt',
              desc: 'WoW Much Shirt So Awesome',
              path: 'models/guy/tops/shirt4.png',
              colours: ['red','blue','black']
            }
          }
        ],
        bottoms: [
          {
            object:{
              name: 'shirtrousers',
              desc: 'trousers that look like a shirt',
              path: 'models/guy/tops/shirt1.png',
              colours: ['red','blue','black']
            }
          }
        ],
        accessories: ['accessories will go here']

      },
      {
        img: 'models/girl.png',
        tops: [],
        bottoms: [],
        accessories: []

      }
    ]
  };

  // var to hold the initial state and keep track of the changes
  state = {
    bg: {
      img:stuffAvailable.bg[0]
    },
    model: stuffAvailable.models[0],
  };

  //  var state = window.state;

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

  $('#pickerModal').on('show.bs.modal', function (event) {
    var thisModal = $(this);
    var clicked = $(event.relatedTarget);
    var modelThings =  state.model[clicked.data('id')];
    thisModal.find('.modal-title').text(clicked.data('id'));

    for(var i=0;i<modelThings.length;i++){
      var thingToAdd = $('#thingTemplate').clone();
      thingToAdd.attr('id',clicked.data('id')+i);
      thingToAdd.find('img').attr('src',imgBasePath+modelThings[i].object.path);
      thingToAdd.find('p.thingName').text(modelThings[i].object.name);
      thingToAdd.find('p.thingDescription').text(modelThings[i].object.desc);
      thisModal.find('.modal-body .row').append(thingToAdd);
    }

  });

  $('#pickerModal').on('hidden.bs.modal', function () {
    $('.modal-body .row .thing').remove();
  });

});