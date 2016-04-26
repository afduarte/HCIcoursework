$(function() {
  var imgBasePath = 'assets/img/';

  // Object holding the available stuff
  stuffAvailable = {
    bg: ["bg/1.jpg","bg/2.jpg"],
    models: [
      {
        img: 'models/girl3.png',
        size: {
          tops: 'M',
          bottoms: 'W32 L30'
        },
        tops: [
          {
            object:{
              name: 'hipShirt',
              desc: 'super-hip shirt',
              price: 20,
              availability: '3 in store, 5 for order',
              colours: [
                {
                  name: 'grey',
                  hex: '#888',
                  path: 'models/guy/tops/shirt1.png',
                }
              ]
            }
          },
          {
            object:{
              name: 'hipperShirt',
              desc: 'even-hipper shirt',
              price: 25,
              availability: '5 in store, 3 for order',
              colours: [
                {
                  name: 'navy-blue',
                  hex: '#2157b4',
                  path: 'models/guy/tops/shirt2.png',
                },
                {
                  name: 'black',
                  hex: '#000',
                  path: 'models/guy/tops/shirt2.png',
                },
                {
                  name: 'white',
                  hex: '#fff',
                  path: 'models/guy/tops/shirt2.png',
                }
              ]
            }
          },
          {
            object:{
              name: 'mehShirt',
              desc: 'yeah, just another shirt',
              price: 10,
              availability: 'not in store, 3 for order',
              colours: [
                {
                  name: 'blue',
                  hex: '#0f67ff',
                  path: 'models/guy/tops/shirt3.png',
                }
              ]
            }
          },
          {
            object:{
              name: 'dogeShirt',
              desc: 'WoW Much Shirt So Awesome',
              price: 999,
              availability: '10 in store, 50 for order',
              colours: [
                {
                  name: 'white',
                  hex: '#fff',
                  path: 'models/guy/tops/shirt4.png',
                }
              ]
            }
          }
        ],
        bottoms: [
          {
            object:{
              name: 'shirtrousers',
              desc: 'trousers that look like a shirt',
              price: 50,
              colours: [
                {
                  name: 'grey',
                  hex: '#888',
                  path: 'models/guy/bottoms/trousers1.png',
                }
              ]
            }
          }
        ],
        shoes: ['shoes will go here']

      },
      {
        img: 'models/girl.png',
        size:{
          tops: 'S',
          bottoms: 'W32 L30'
        },
        tops: [],
        bottoms: [],
        accessories: []

      }
    ]
  };

  // var to hold the initial state and keep track of the changes
  state = {
    bg: {
      img:stuffAvailable.bg[1]
    },
    model: stuffAvailable.models[0],
    active: 'tops',
    controller: {}
  };

  $('<img/>').attr('src', imgBasePath+state.bg.img).load(function() {
    $(this).remove();
    $('.mirror-frame').css('background-image','url('+imgBasePath+state.bg.img+')');
    init();
  });

  $('#pickerModal').on('show.bs.modal', function (event) {
    var thisModal = $(this);
    var clicked = $(event.relatedTarget);
    var modelThings =  state.model[clicked.data('id')];
    thisModal.find('.modal-title').text('Now Choosing: '+clicked.data('id'));

    for(var i=0;i<modelThings.length;i++){
      var thingToAdd = $('#thingTemplate').clone();
      thingToAdd.attr('id',clicked.data('id')+i);
      thingToAdd.find('img').attr('src',imgBasePath+modelThings[i].object.colours[0].path);
      thingToAdd.find('img').addClass('img-responsive');
      thingToAdd.find('p.thingName').text(modelThings[i].object.name);
      thingToAdd.find('p.thingDescription').text(modelThings[i].object.desc);
      thingToAdd.find('span.badge').text(modelThings[i].object.price+'£');
      thingToAdd.find('p.thingAvail').text(modelThings[i].object.availability);

      thingToAdd.find('div.thingColours').append('<div style="background-color:'+modelThings[i].object.colours[0].hex+';" class="active colourBall"></div>');
      var topPadding = 25;
      for(var j=1;j<modelThings[i].object.colours.length;j++){
        topPadding+=2;
        console.log(top+':'+j)
        thingToAdd.find('div.thingColours').append('<div style="background-color:'+modelThings[i].object.colours[j].hex+'; top: '+topPadding+'px;" class="colourBall hidden"></div>');
        topPadding+=25;
      }

      thisModal.find('.modal-body .row').append(thingToAdd);
    }

  });

  // Cleanup on modal close to prevent items appearing multiple times.
  $('#pickerModal').on('hidden.bs.modal', function () {
    $('.modal-body .row .thing').remove();
  });


  $(window).on('resize',function(){
    init();
  });

  function init(){
    console.log('Running init');
    // Store the height of the bg img, cause we'll use it later
    state.bg.height = parseFloat($('.mirror-frame').css('height'));
    $('.mirror-frame img#model').attr('src',imgBasePath+state.model.img);
    state.model.height = parseFloat($('.mirror-frame img#model').css('height'));
    state.controller.width = parseFloat($('.controller-tablet').css('width'));
    state.controller.width-=36;
    $('.navigation').css('width',state.controller.width);
    loadMainStuff();

  }

  function loadMainStuff(){
    var counter = 0;
    var firstRow = true;
    var modelThings =  state.model[state.active];
    for(var i=0;i<modelThings.length;i++){
      var thingToAdd = $('#thingCardTemplate').clone();
      thingToAdd.attr('id',state.active+i);
      thingToAdd.find('.thing-card-img img').attr('src',imgBasePath+modelThings[i].object.colours[0].path);
      thingToAdd.find('h5.thing-card-title').text(modelThings[i].object.name);
      thingToAdd.find('span.badge').text(modelThings[i].object.price+'£');

      for(var j=0;j<modelThings[i].object.colours.length;j++){
        thingToAdd.find('div.thing-card-colours').append('<div style="background-color:'+modelThings[i].object.colours[j].hex+';" class="colour"></div>');
      }
      if(counter === 3 || counter === 0 ){
        $('.controller-tablet').append('<div class="padder col-md-2"></div>');
        if(counter === 3){
          firstRow = false;
        }
        counter = 0;
      }
      if(!firstRow){
        thingToAdd.css('margin-top','10px');
      }
      $('.controller-tablet').append(thingToAdd);
      counter++;
    }

  }


  // Handle item clicks
  $(document).on('click','.thing img', function(){
    console.log($(this));

  });

  $(document).on('click','.sidebar-item', function(){
    console.log($(this).data('id'));
    if(state.active != $(this).data('id')){
      $('.controller-tablet .thing-card').remove();
      $('.controller-tablet .padder.col-md-2').remove();
      $('.sidebar-item.active').removeClass('active');
      state.active = $(this).data('id');
      $(this).addClass('active');
      loadMainStuff();
    }
  });

  $(document).on('mouseover','.thingColours div.colourBall:not(.hidden)',function(){
    $(this).siblings('div.colourBall').slideDown('fast').removeClass('hidden');
    $(this).siblings('div.colourBall').on('mouseout',function(){
      $(this).siblings('div.colourBall:not(.active)').addClass('hidden');
    });
  });
});