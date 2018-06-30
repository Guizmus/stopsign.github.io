let _Progress = function (params) {
  
  var minimalKeys = ['id','type']; // absolutely needed, will trigger an error if absent
  // ckeck the keys of param, and the labels if in debug mode
  var missingKeys = [];
  $(minimalKeys).each(function(x,k) {
    if(typeof(params[k]) == "undefined") 
      missingKeys.push(k);
  });
  if (missingKeys.length>0) {
    console.error("Creating a new progress using params ",params," with missing keys, needed to work (minimal Progress functionality) : ",missingKeys.join(", "));
    return false;// only hard stop, this is the minimal keys needed.
  }
  
  this.id = params.id;
  
  return this;
}

_Progress.prototype.update = function(action) {
  console.log("updating progress",this,action);
  return true;
}

_Progress.prototype.getLevel = function () {
  
}