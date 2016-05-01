$(function() {
  var imgBasePath = 'assets/img/';

  // Object holding the available stuff
  stuffAvailable = {
    bg: ["bg/1.jpg","bg/2.jpg","bg/3.jpg","bg/4.jpg"],
    models: [
      {
        id: 'antonella',
        size: {
          tops: 'M',
          bottoms: 'W32 L30'
        },
        tops: [
          {
            object:{
              name: 'Lemoncello Neck Top',
              desc: 'Cat ipsum dolor sit amet, dream about hunting birds, so toy mouse squeak roll over tuxedo cats always looking dapper stare out the window.',
              price: 20,
              availability: '3 in store, 5 for order',
              suggestSize: '86% Small 14% Medium',
              fabric: "100% cotton",
              colours: [
                {
                  name: 'grey',
                  hex: '#FCC943',
                  path: 'models/stuff/tops/shirt1.png',
                }
              ]
            }
          },
          {
            object:{
              name: 'Slim Fit V Neck',
              desc: 'Spot something, big eyes, big eyes, crouch, shake butt, prepare to pounce.',
              price: 25,
              availability: '5 in store, 3 for order',
              suggestSize: '86% Small 14% Medium',
              fabric: "100% cotton",
              colours: [
                {
                  name: 'navy-blue',
                  hex: '#003656',
                  path: 'models/stuff/tops/shirt2.png',
                },
                {
                  name: 'black',
                  hex: '#000',
                  path: 'models/stuff/tops/shirt2.png',
                },
                {
                  name: 'white',
                  hex: '#fff',
                  path: 'models/stuff/tops/shirt2.png',
                }
              ]
            }
          },
          {
            object:{
              name: 'meh Shirt',
              desc: "Paw at beetle and eat it before it gets away shove bum in owner's face like camera lens yet leave hair everywhere",
              price: 10,
              availability: 'not in store, 3 for order',
              suggestSize: '86% Small 14% Medium',
              fabric: "100% cotton",
              colours: [
                {
                  name: 'blue',
                  hex: '#0f67ff',
                  path: 'models/stuff/tops/shirt3.png',
                }
              ]
            }
          },
          {
            object:{
              name: 'dogeShirt',
              desc: 'Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore ' +
              'et dolore magna aliqua.',
              price: 999,
              availability: '10 in store, 50 for order',
              suggestSize: '86% Small 14% Medium',
              fabric: "100% cotton",
              colours: [
                {
                  name: 'white',
                  hex: '#fff',
                  path: 'models/stuff/tops/shirt4.png',
                }
              ]
            }
          }
        ],
        bottoms: [
          {
            object:{
              name: 'Plain Trousers',
              desc: 'Stare at wall turn and meow stare at wall some more meow again continue staring scratch leg; meow for can opener to feed me or intently sniff hand leave fur on owners clothes stare out the window.',
              price: 50,
              availability: '10 in store, 50 for order',
              suggestSize: '86% Small 14% Medium',
              fabric: "100% cotton",
              colours: [
                {
                  name: 'grey',
                  hex: '#888',
                  path: 'models/stuff/bottoms/trousers1.png',
                }
              ]
            }
          },
          {
            object:{
              name: 'Plain Trousers 2',
              desc: 'Cat ipsum dolor sit amet, see owner, run in terror. Favor packaging over toy spit up on light gray carpet instead of adjacent linoleum.',
              price: 35,
              availability: '10 in store, 50 for order',
              suggestSize: '86% Small 14% Medium',
              fabric: "100% cotton",
              colours: [
                {
                  name: 'grey',
                  hex: '#888',
                  path: 'models/stuff/bottoms/trousers2.png',
                }
              ]
            }
          }
        ],
        accessories: [
          {
            object:{
              name: 'Black Handbag',
              desc: "Cat ipsum dolor sit amet, see owner, run in terror. It's one of those fancy bags, that's why it costs so much!!!",
              price: 500,
              availability: '1 in store, 2 for order',
              suggestSize: 'Single size',
              fabric: "100% leather",
              colours: [
                {
                  name: 'black',
                  hex: '#000',
                  path: 'models/stuff/accessories/bag1.png',
                }
              ]
            }
          }
        ]

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
      img:stuffAvailable.bg[3]
    },
    tops: 0,
    bottoms: 0,
    bag: false,
    jacket: false,
    model: stuffAvailable.models[0],
    active: 'tops',
    controller: {},
    popup: false,
    list: false,
    previous: '',
    current: '',
    total: 0
  };

  $('<img/>').attr('src', imgBasePath+state.bg.img).load(function() {
    $(this).remove();
    $('.mirror-frame').css('background-image','url('+imgBasePath+state.bg.img+')');
    init();
    loadMainStuff();
  });

  // Cleanup on modal close to prevent items appearing multiple times.
  $('#itemModal').on('hidden.bs.modal', function () {
    $('.modal-placeholder').html(' ');
  });


  $(window).on('resize',function(){
    init();
  });

  function resetMirror(){
    $('.mirror-frame img#model').attr('src',state.previous);
  }

  function getImgString(){
    return imgBasePath+'models/'+state.model.id+'/tops'+state.tops+'/bottoms'+state.bottoms+'/'+(state.jacket?'jacket':'')+(state.bag?'bag':'no-bag')+'.png';
  }

  function init(){
    console.log('Running init');
    // Store the height of the bg img, cause we'll use it later
    state.bg.height = parseFloat($('.mirror-frame').css('height'));
    $('.mirror-frame img#model').attr('src',getImgString());
    state.model.height = parseFloat($('.mirror-frame img#model').css('height'));
    state.controller.width = parseFloat($('.controller-tablet').css('width'));
    state.controller.width-=20;
    $('.navigation').css('width',state.controller.width);

  }

  function loadMainStuff(){
    var counter = 0;
    var firstRow = true;
    var modelThings =  state.model[state.active];
    for(var i=0;i<modelThings.length;i++){
      var thingToAdd = $('#thingCardTemplate').clone();
      thingToAdd.attr('id',state.active+'-'+i);
      thingToAdd.find('.thing-card-img img').attr('src',imgBasePath+modelThings[i].object.colours[0].path);
      thingToAdd.find('h5.thing-card-title').text(modelThings[i].object.name);
      thingToAdd.find('.badge').text('£'+modelThings[i].object.price);

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
  $(document).on('click','.thing-card', function(){
    // If the popup is not showing
    if(!state.popup){
      state.previous = $('.mirror-frame img#model').attr('src');
      // Clone the template
      var modal = $('#itemModalTemplate.popupTemplate').clone();
      // Change the id
      modal.attr('id','#itemModal');
      // Get info from the clicked element
      var type = $(this).attr('id').split('-')[0];
      var number = $(this).attr('id').split('-')[1];
      var clicked = state.model[type][number].object;
      state.lastClicked = clicked;
      // Change the text in the template copy
      modal.find('span#thingPrice').text('£'+clicked.price+' Add to list');
      modal.find('li#thingFabrics').text(clicked.fabric);
      modal.find('li#thingSize').text(clicked.suggestSize);
      for(var i=0; i<clicked.colours.length; i++){
        modal.find('div.thing-card-colours').append('<div style="background-color:'+clicked.colours[i].hex+';" class="colour"></div>');
      }
      modal.find('li#thingAvailability').text(clicked.availability);
      modal.find('p#thingName').text(clicked.name);
      modal.find('p#thingDescription').text(clicked.desc);
      // Change the state
      state[type] = number;

      if(type === 'accessories'){
        state.bag = true;
      }
      // Change the image in the mirror
      $('.mirror-frame img#model').attr('src',getImgString());
      // Get the image of the thing clicked
      modal.find('#thingImg').attr('src',$(this).find('.thing-card-img img').attr('src'));
      // Switch the template class
      modal.removeClass('popupTemplate');
      modal.addClass('popup');
      // Place the modal in the placeholder
      $('div.modal-placeholder').append(modal);
      // Show it
      modal.css('display','block');
      // Record that the popup is showing
      state.popup = true;
      // Else if the popup is showing, remove it
    }else{
      removePopup(false);
    }
  });

  // Handle item clicks
  $(document).on('click','.checkout-button', function(){
    console.log('clicked checkout');
    var modal = $('#confirmation').clone();
    // Change the id

    // Switch the template class
    modal.removeClass('template');
    modal.addClass('popup');
    modal.find('.checkout-TOTAL .TOTAL-number').text('TOTAL: £'+state.total);
    // Place the modal in the placeholder
    $('div.modal-placeholder').append(modal);
    // Show it
    modal.css('display','block');
  });

  $(document).mouseup(function (e){
    if(state.popup){
      var container = $('.popup');
      if (!container.is(e.target) && container.has(e.target).length === 0){
        removePopup(false);
      }
    }
  });

  function removePopup(reset){
    $('.popup').remove();
    state.popup = false;
    if(reset){
      resetMirror();
    }else{
      $('.mirror-frame img#model').attr('src',getImgString());
    }
  }

  $(document).on('click','.closeButton', function(){
    var previousItem = state.previous.split('/').splice(-3);
    state.tops = parseInt(previousItem[0].replace(/\D/g,''));
    state.bottoms = parseInt(previousItem[1].replace(/\D/g,''));
    state.bag = (previousItem[2].indexOf('no-bag')>0)?true:false;
    removePopup(true);
  });

  $(document).on('click','.checkoutCloseButton', function(){
    removePopup(false);
  });

  function updateTotal(){
    var total = 0;
    $('#pickerList .items-list>.picked-item p.item-badge').each(function(){
      var thisPrice = $(this).text().replace('£','');
      total += parseFloat(thisPrice);
    });
    state.total = total;
    $('.TOTAL-number').text('TOTAL: £'+state.total);
  }

  $(document).on('click', '.removeButton', function(e){
    $(this).parent().parent().remove();
    updateTotal();
    e.preventDefault();
  });

  $(document).on('click','.saveButton', function(){
    // Remember there is at least 1 child on start, the arrow-icon
    var listCount = $('#pickerList').children().length;
    removePopup(false);
    var item = $('#pickedItemTemplate').clone();
    item.attr('id','item-'+listCount);
    item.find('img.picked-item-thumb').attr('src',imgBasePath+state.lastClicked.colours[0].path);
    state.total += state.lastClicked.price;
    item.find('p.item-badge').text('£'+state.lastClicked.price);
    item.find('p.item-name').text(state.lastClicked.name);
    $('#pickerList .items-list').append(item);
    updateTotal();
    state.list = true;
    sidebar(state.list);
  });

  $(document).on('click','.sidebar-item', function(){
    if(state.active != $(this).data('id')){
      $('.controller-tablet .thing-card').remove();
      $('.controller-tablet .padder.col-md-2').remove();
      $('.sidebar-item.active').removeClass('active');
      state.active = $(this).data('id');
      $(this).addClass('active');
      loadMainStuff();
    }
  });

  function sidebar(open) {
    var sidebar = $('#pickerList');
    var width = parseFloat(sidebar.width())-20;
    var duration = 200;
    if (open) {
      sidebar.find('#pickerListButton').removeClass('fa-chevron-left');
      sidebar.find('#pickerListButton').addClass('fa-chevron-right');
      sidebar.animate({right: 0}, duration);
    } else{
      sidebar.find('#pickerListButton').removeClass('fa-chevron-right');
      sidebar.find('#pickerListButton').addClass('fa-chevron-left');
      sidebar.animate({right: -width}, duration);
    }
  }

  $('#pickerList').on('click', function() {
    console.log($(this).attr('class')+' : '+$('.removeButton').attr('class'))
    if($(this) != $('.removeButton')){
      state.list = !state.list;
      sidebar(state.list);
    }
  });

});