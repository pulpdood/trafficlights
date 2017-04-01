function Light(color) {
	this.color = color;
} 

Light.prototype.changeColor = function(color) {
	this.color = color;
}

Light.prototype.getColor = function() {
	return this.color;
}

module.exports = Light;