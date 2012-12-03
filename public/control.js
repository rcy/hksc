console.log('control initialized')

var g;

$('.servo button').on('click', function(e) {

  e.preventDefault();

  $elt = $(e.currentTarget);
  $servo = $elt.parents('.servo')

  servo = $servo.data('servo');
  delta = $elt.data('direction');

  position = $servo.data('position');
  position += delta;
  $servo.data('position', position);

  console.log('clicked:', servo, delta, position);

});
