var Person = function(params){
  this.name     = params.name;
  this.health   = params.health;
  this.damage   = params.damage;
  this.say      = params.say;
  this.reaction = params.reaction;
  this.deathReaction = params.deathReaction;

  // $('body').append(element)
}

Person.prototype.attack = function(target){
  if(this.say) console.log(this.say);

  if(target.health > 0){
    target.health -= this.damage;

    // default or custom target reaction
    if(target.reaction) target.reaction(this)
    else console.log('Classic "Oi"')
  }else{
    // default or custom death reaction
    if(target.deathReaction) target.deathReaction(this);
    console.log('mertv uzhe');
  }
}

var oleg = new Person({
  name:   'Oleg',
  health: 50,
  damage: 10,
  say:    'Patrisiya, vpered!',
  reaction: function(kicker){
    console.log('Ne nado, ' + kicker.name);
  },
  deathReaction: function(kicker){
    console.log('Hvatit, ' + kicker.name);
  }
})

var bojidar = new Person({
  name:   'Bojidar',
  health: 20,
  damage: 20,
  say:    'DERJI!!! ETO OT MOEGO DEDA',
  reaction: function(kicker){
    console.log('AI.');
  },
  deathReaction: function(kicker){
    console.log('YA KANUL V LETU... ' + kicker.name + ', ti PIDOR111!!');
  }
})

oleg.attack(bojidar);
bojidar.attack(oleg);
bojidar.attack(oleg);
bojidar.attack(oleg);
bojidar.attack(oleg);
