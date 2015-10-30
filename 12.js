var Person, Skill, Item, Position, Environment, Place, Utilits;
//comment

// PERSON
Person = function(args){
  args = args || {};

  this.name       = args.name || 'Guy';
  this.health     = args.health || 0
  this.skill      = new Skill(args.skill);
  this.position   = new Position(args.coordinates);
  // separate equipments
  this.equipments = args.equipments || {};
  this.damage     = args.damage || 0;

  console.log(this.name + ' has been created...');
}

Person.prototype.action = function(){
  this.skill.do(this);
}

Person.prototype.move = function(direction){
  position = this.position;

  position.change(direction);
  console.log(this.name + ' is at ' + position.coords + ' now.')
}

Person.prototype.attack = function(target){
  var damage = this.damage + this.calculateItemBonus('damageBonus');
  target.reduceHealth(damage, this, false);

  console.log(target.health);
}

Person.prototype.reduceHealth = function(damage, attacker, isCounterAttack){
  var absorbedDamage = this.calculateItemBonus('damageAbsorb');
  this.health -= damage - absorbedDamage;

  if(Utilits.chance() && !isCounterAttack) this.attack(attacker, true);
}

// move to equipments 
Person.prototype.calculateItemBonus = function(bonusName){
  var totalBonus = 0;
  for(var e in this.equipments){
    var itemBonus = this.equipments[e][bonusName] || 0;
    totalBonus += itemBonus;
  }

  return totalBonus;
}


// SKILL
Skill = function(skillPromise){
  skillPromise = skillPromise || {};

  this.name = skillPromise.name || 'nothing';
  this.do   = skillPromise.do || this.defaultSkill;
}

Skill.prototype.defaultSkill = function(owner){
  console.log(owner.name + ' hasn\'t an unique skill.');
}


// ITEM
Item = function(args){
  args = args || {};

  this.name = args.name || 'unnamed';
  this.type = args.type || Item.Types['useless'];

  if(args.damageAbsorb) this.damageAbsorb = args.damageAbsorb;
  if(args.damageBonus) this.damageBonus = args.damageBonus;
  if(args.hpBonus) this.hpBonus = args.hpBonus;
}

Item.Types = {
  weapon:  'weapon',
  chest:   'chest',
  useless: 'useless'
}


// ENVIRONMENT
Environment = function(){
  this.limitX = 1000;
  this.limitY = 1000;
  this.places = [];
}

Environment.prototype.addPlace = function(place){
  this.places.push(place);
}


// POSITION
Position = function(coords){
  this.coords = coords;
}

Position.Direction = {
  n:  [0, 1],
  ne: [1, 1],
  e:  [1, 0],
  se: [1, -1],
  s:  [0, -1],
  sw: [-1, -1],
  w:  [-1, 0],
  nw: [-1, 1]
}

Position.prototype.change = function(direction){
  var coords, newCooords;

  coords      = this.coords;
  newCoords   = Position.Direction[direction];
  // fix limits and implement place matching
  this.coords = [coords[0] + newCoords[0], coords[1] + newCoords[1]];
}


// PLACE
Place = function(args){
  args = args || {};

  this.name = args.name || 'nether';
  this.environment = args.environment;
  this.coordinates = args.coordinates || [0, 0];

  if(args.environment) environment.addPlace(this);
}


// UTILITS
Utilits = {};
Utilits.chance = function(){
  var probability = 10;
  var rand = Math.floor((Math.random() * 10) + 1);
  return rand >= probability;
}




var magicWand = new Item({
  name: 'Magic Wand',
  type: Item.Types['weapon'],
  damageBonus: 1,
  damageAbsorb: 1
})

var holyRobe = new Item({
  name: 'Holy Robe',
  type: Item.Types['chest'],
  damageAbsorb: 1,
  hpBonus: 10
})


var elfinya = new Person({
  name: 'Elfinya',
  health: 80,
  damage: 5,
  coordinates: [2, 2],
  skill: {
    name:'Magic Glowing',
    do: function(owner){console.log('PEEEEEEEWW - - - - - >')}
  },
  equipments: {
    weapon: magicWand,
    chest:  holyRobe
  }
})

var urod = new Person({
  name: 'Urod',
  health: 30,
  damage: 3,
  coordinates: [2, 2]
})

