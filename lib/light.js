function Light(color) {
	this.color = color;
} 

Light.prototype.changeColor = function(color) {
	this.color = color;
}

module.exports = Light;