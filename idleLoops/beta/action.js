// let Wander = new Action({
//   name : "Wander",
//   expMult : 1,
//   townNum : 0,
//   xmlKey : "wander",
//   varName : "Wander",
//   stats : {
//       Per:.2,
//       Con:.2,
//       Cha:.2,
//       Spd:.3,
//       Luck:.1
//   },
//   affectedBy : ["Buy Glasses"],
//   manaCost :  250,
//   manaCost : function(){ // we could support both Int or Function here, so you could use this line or the previous one depending on your need
//     return 250;
//   },
//   visible : true, // same here, function or static value
//   unlocked : true, // same here, function or static value
//   finish : function () {
//       towns[0].finishProgress(this.varName, 200 * (glasses ? 4 : 1), function() {
//           adjustPots();
//           adjustLocks();
//       });
//   }
// })
window.Action_test = function() {
  window._Action = function (params) {
    
    // debug mode will show suggestions for the action, based on the used params. Warnings should be taken care of, logs can be ignored.
    // turning debug off will hide the debugs, and also the [possible>path>to>texts] hidden
    // turning debug on for a given action will show all possible text keys in the UI, in order to know what key to use to add a text somewhere specific.
    this.debug = (typeof(params.debug) == "undefined" ? false : params.debug);
    
    var minimalKeys = ['id','xmlKey','finish']; // absolutely needed, will trigger an error if absent
    var minimalLabels = ['label','tooltip']; // should be used in most case, wil trigger a warning if absent in debug mode
    
    // ckeck the keys of param, and the labels if in debug mode
    var missingKeys = [];
    $(minimalKeys).each(function(x,k) {
      if(typeof(params[k]) == "undefined") 
        missingKeys.push(k);
    });
    if (missingKeys.length>0) {
      console.error("Creating a new action using params ",params," with missing keys, needed to work (minimal Action functionality) : ",missingKeys.join(", "));
      return false;// only hard stop, this is the minimal keys needed.
    }
    if(this.debug) {
      var missingLabels = [];
      $(minimalLabels).each(function(x,k) {
        if(_txt("actions>"+params.xmlKey+">"+k,undefined,false) == "") 
          missingLabels.push(k);
      });
      if (minimalLabels.length>0) {
          console.warn("Creating a new action using params ",params," with missing commonly used text (in actions>"+params.xmlKey+">*) : ",minimalLabels.join(", "));
      }
    }
    
    
    // we can start preparing the Action object
    this.id = params.id; // used to recognise the action and access it. Usually associated with the var name used when declaring the action.
    this.label = _txt("actions>"+params.xmlKey+">label",undefined,this.debug); // short label shown in the front
    this.tooltip = _txt("actions>"+params.xmlKey+">tooltip",undefined,this.debug);
    
    this.finish = (typeof(params.finish) == "undefined") ? param.finish : function(){};
    
    this.labelDone = _txt("actions>"+params.xmlKey+">label_done"); // used in progress bar associated
    return this;
  };
  
  window._Wander = new _Action({
    debug : true,
    id : "Wander",
    xmlKey : "test",
    finish : function() {
      console.log("this, from inside the function, to test the context",this);
    },
  });
  console.log(_Wander);
  // _Wander.finish();
  // new _Action({});
}