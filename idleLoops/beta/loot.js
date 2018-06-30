window._Loots = []
let _Loot = function(params) {
  
  var minimalKeys = ['id','xmlKey','linkedTo','contents','count']; // absolutely needed, will trigger an error if absent
  // ckeck the keys of param, and the labels if in debug mode
  var missingKeys = [];
  $(minimalKeys).each(function(x,k) {
    if(typeof(params[k]) == "undefined") 
      missingKeys.push(k);
  });
  if (missingKeys.length>0) {
    console.error("Creating a new loot using params ",params," with missing keys, needed to work (minimal Loot functionality) : ",missingKeys.join(", "));
    return false;// only hard stop, this is the minimal keys needed.
  }
  if (typeof(window._Loots[params.id]) != "undefined") {
    console.error("Creating a new loot using params ",params," but another loot with the same id is already declared");
    return false;
  }
  
  this.id = params.id; // to access the loot, using window._Loots.{loot.id}
  this.linkedTo = params.linkedTo;  // progress bar under witch to display
  this.oneEvery = typeof(params.oneEvery) == "undefined" ? 10 : params.oneEvery;  // progress bar under witch to display
  // parsing and completing the earnings
  var contents = [];
  $(params.contents).each(function(x,content) {
    if(typeof(content.type) == "undefined") {
      console.error("Creating a new loot ",params," invalid content (no type)");
      return false;
    }
    if(typeof(content.val) == "undefined") {
      console.error("Creating a new loot ",params," invalid content (no value)");
      return false;
    }
    switch (content.type) {// in case of a new currency, add a case here, with the good function to call when the currency is earned.
      case 'mana' :
        content.earnFn = addMana;
        break;
      case 'gold' :
        content.earnFn = addGold;
        break;
      default : 
        var currencyFormated = content.type.charAt(0).toUpperCase() + content.type.slice(1);
        content.earnFn = window["add"+currencyFormated];
        if (typeof(content.earnFn) != "function"){ // couldn't find a default function 
          console.error("Loot earning undefined currency, need to specify an earning Fn in loot.js, default failed too",this);
          return false;
        }
        console.warn("Loot earning undefined currency, need to specify an earning Fn in loot.js, using default",this);
        break;
    }
    
    // manacost : will always be a function, even if not declared. default 0
    content.multiplier = (typeof(content.multiplier) == "undefined") ? function(){return 1;} : (
      typeof(content.multiplier) == "function" ? content.multiplier : function() {return content.multiplier;}
    );
    contents.push(content);
  })
  this.contents = contents;
  this.count = params.count;
  this.quantityChecked = 0;
  this.quantityUnlocked = 0;
  this.quantityOpened = 0;
  this.quantityGoodLoot = 0;
  this.lootableFirst = false;
  window._Loots[params.id] = this;
  this.needsUIDraw = true;
  this.needsUIUpdate = false;
  return true;
}

_Loot.prototype.load = function (data) { // loading data from savefile part
  this.quantityChecked = data.quantityChecked;
  this.lootableFirst = data.lootableFirst;
  this.needsUIUpdate = true;
}
_Loot.prototype.save = function () { // exporting savable data
  return {
    quantityChecked : this.quantityChecked,
    lootableFirst : this.lootableFirst
  };
}

_Loot.prototype.update = function (onlyVars) { // updates current count and redraws, param lets update only the values, not the UI (optional)
  this.quantityUnlocked = this.count();
  this.quantityGoodLoot = Math.floor(this.quantityChecked/this.oneEvery)
  if (!(onlyVars === true))
    this.needsUIUpdate = true;
}

// to be called on action completion
_Loot.prototype.open = function() { // called to open 1 loot. Returns true if a good loot was opened
  this.update(true); // let's start by updating internal values
  if (this.quantityOpened >= this.quantityUnlocked) { // if we already opened everything, we don't loot.
    return false; 
  }
  if (this.lootableFirst && (this.quantityOpened < this.quantityGoodLoot)) { // trying to open a checked loot, if there is still one to check
    this.openGoodLoot();
    return true;
  } else { // we are trying to open an unchecked loot
    if (this.quantityUnlocked <= this.quantityChecked) {// if everything is already checked
      if (this.quantityOpened < this.quantityGoodLoot) {// if there us still good loot to open
        this.openGoodLoot();
        return true;
      }
    } else { // there is loot left to check and we are going for it
      var previousGoodLoot = this.quantityGoodLoot;
      this.quantityChecked ++; // we check a new loot
      this.update(true);
      if (this.quantityGoodLoot > previousGoodLoot) { // if it resulted in a new good loot, we earn the content
        this.openGoodLoot();
        return true;
      }
    }
  }
  return false;
}

// actually opening a good loot and earning its rewards
_Loot.prototype.openGoodLoot = function () {
  this.quantityOpened ++; // opened a good loot
  this.earnContent();
  this.needsUIUpdate = true;
}

// calculating the value of the specified contentType
_Loot.prototype.getAdjustedContent = function(contentType) {
  var adjustedContent = 0;
  $(this.content).each(function(x,content) {
    if(content.type == contentType)
      adjustedContent = Math.floor(10 *(content.val * this.multiplier()));
  });
  return adjustedContent;
}

// actualy updating, earning the reward, using the multiplier
_Loot.prototype.earnContent = function () {
  content.earnFn.call(this.getAdjustedContent());
}


// new _Loot({
//   id : "Lock", // to access the loot, using window._Loots.{loot.id}
//   linkedTo : "WanderProgress",  // progress bar under witch to display
//   xmlKey : "lock", // path to corresponding texts in the <loot> tag
//   oneEvery : 10, // 1 every X of this loot will actually contain loot.
//   contents : [
//     {
//       type : 'gold', // type of content. Need to define a new handle for adding the currency
//       val : 10,
//       multiplier : function() { // bonus to currency earned. generates updated UI elements
//         var practical = getSkillLevel("Practical");
//         practical = practical <= 200 ? practical : 200;
//         return (1 + practical/100);
//       },
//     }
//   ],
// count : function () {
//   return _Actions.Wander.progress.WanderProgress.getLevel();
// },
// });

