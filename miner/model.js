
function Logger(movementPattern) {
	this.curSpeed = 10
	this.target = 0
	this.movementPattern = movementPattern
	this.isVisible = true
}
	
function Miner(movementPattern) {
	this.curSpeed = 10
	this.x = 0
	this.y = 0
	this.mineCounter = 0
	this.movementPattern = movementPattern
	this.isVisible = true
}

function Tree(size) {
	this.id = treeId++
	this.healthMax = this.health = (20*Math.pow(1.30001, size))|0 + 40 + size*10
	//console.log("healthMax: "+this.healthMax+", size: "+size)
	this.x = (Math.random() * maxX)|0
	this.y = 100 - this.id*1.4
	
	this.woodValue = (2 + size * Math.pow(1.30001, size) * .3)|0
	
	TreeGraphics(this)
	
	this.hasGivenGold = 0;
	this.stop = 0
}


function Material(x, y) {
	this.x = x
	this.y = y
	this.id = id++
	
	this.hasGivenGold = 0;
	this.stop = 0
}

function Dirt(theMaterial, depth) {
	theMaterial.materialHealth = 10 + depth
	theMaterial.materialHealthMax = theMaterial.materialHealth
	theMaterial.value = 1
	

	theMaterial.isUpdating = true
	return theMaterial
}


function Stone(theMaterial, depth) {
	theMaterial.materialHealth = theMaterial.materialHealthMax = 11 + (depth * 2)
	theMaterial.value = 3
	
	theMaterial.isUpdating = true
	return theMaterial
}

//////////////////////////////////////////////////////////////////////
//////// Work in Progress ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

//The toughness and value needs updated still.

function Aluminum(theMaterial, depth) {
    theMaterial.materialHealth = theMaterial.materialHealthMax = 12 + (depth * 3)
    theMaterial.value = 5

    var theAluminum = theMaterial.theMaterial
    theStone.className = 'Aluminum'
    theMaterial.theDiv = theAluminum
    theMaterial.isUpdating = true

    return theMaterial
}

function Feldspar(theMaterial, depth) {
    theMaterial.materialHealth = theMaterial.materialHealthMax = 13 + (depth * 4)
    theMaterial.value = 6

    var Feldspar = theMaterial.theMaterial
    theStone.className = 'Feldspar'
    theMaterial.theDiv = theFeldspar
    theMaterial.isUpdating = true

    return theMaterial
}

function Beryllium(theMaterial, depth) {
    theMaterial.materialHealth = theMaterial.materialHealthMax = 14 + (depth * 5)
    theMaterial.value = 7

    var theBeryllium = theMaterial.theMaterial
    theStone.className = 'Beryllium'
    theMaterial.theDiv = theBeryllium
    theMaterial.isUpdating = true

    return theMaterial
}

function Quartz(theMaterial, depth) {
    theMaterial.materialHealth = theMaterial.materialHealthMax = 15 + (depth * 6)
    theMaterial.value = 8

    var theQuartz = theMaterial.theMaterial
    theStone.className = 'Quartz'
    theMaterial.theDiv = theQuartz
    theMaterial.isUpdating = true

    return theMaterial
}

function SodiumCarbonate(theMaterial, depth) {
    theMaterial.materialHealth = theMaterial.materialHealthMax = 16 + (depth * 7)
    theMaterial.value = 9

    var theSodiumCarbonate = theMaterial.theMaterial
    theStone.className = 'SodiumCarbonate'
    theMaterial.theDiv = theSodiumCarbonate
    theMaterial.isUpdating = true

    return theMaterial
}

function Zeolites(theMaterial, depth) {
    theMaterial.materialHealth = theMaterial.materialHealthMax = 17 + (depth * 8)
    theMaterial.value = 10

    var theZeolites = theMaterial.theMaterial
    theStone.className = 'theZeolites'
    theMaterial.theDiv = theZeolites
    theMaterial.isUpdating = true

    return theMaterial
}

