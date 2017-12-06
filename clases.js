function Animal(name, owner, sound) {
  this.name = name;
  this.owner = owner;
  this.sound = sound;
}

Animal.prototype.sayHello = function () {
  console.log("animal")
}

function Dog(name, owner) {
  Animal.call(this, name, owner);
  // this.sound = "Guau Guau";
  this.edad = 0;
  this.humanRelation = "love";
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.sayHello = function() {
  console.log("perro");
}

Dog.prototype.unAnoMas = function() {
  this.edad += 1;
} 

var myAnimal = new Animal("Arya", "Josephine", "--");
var myDog = new Dog("Max", "Owen");
myDog.unAnoMas();
var myDog2 = new Dog("Maxi", "Owen");
myDog2.unAnoMas();
myDog2.unAnoMas();

