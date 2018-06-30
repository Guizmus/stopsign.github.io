
window.Action_test = function() {
  
  // Action constructor
  window._Action = function (params) {
    
    // debug mode will show suggestions for the action, based on the used params. Warnings should be taken care of, logs can be ignored.
    // turning debug off will hide the debugs, and also the [possible>path>to>texts] hidden
    // turning debug on for a given action will show all possible text keys in the UI, in order to know what key to use to add a text somewhere specific.
    this.debug = (typeof(params.debug) == "undefined" ? false : params.debug);
    
    var minimalKeys = ['id','xmlKey','finish','townNum']; // absolutely needed, will trigger an error if absent
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
      if (missingLabels.length>0) {
          console.warn("Creating a new action using params ",params," with missing commonly used text (in actions>"+params.xmlKey+">*) : ",missingLabels.join(", "));
      }
      if (typeof(params.manaCost) == "undefined") 
        console.log("Creating a new action using params ",params," with no manaCost param, 0 used.");
      if (typeof(params.manaCost) == "undefined") 
        console.log("Creating a new action using params ",params," with no visible param, true used.");
      if (typeof(params.manaCost) == "undefined") 
        console.log("Creating a new action using params ",params," with no unlocked param, true used.");
      if (typeof(params.finish) == "undefined") 
        console.log("Creating a new action using params ",params," with no finish param.");
      if (typeof(params.stats) == "undefined") 
        console.log("Creating a new action using params ",params," with no stats param. No XP awarded.");
    }
    
    
    // we can start preparing the Action object
    
    // basic action identifiers and texts are needed
    this.id = params.id; // used to recognise the action and access it. Usually associated with the var name used when declaring the action.
    this.townNum = typeof(params.townNum) == "int" ? [params.townNum] : params.townNum; // used to know in what city to show. Can be passed as an array to use in multiple cities
    this.label = _txt("actions>"+params.xmlKey+">label",undefined,this.debug); // short label shown in the front
    this.tooltip = _txt("actions>"+params.xmlKey+">tooltip",undefined,this.debug);
    
    // manacost : will always be a function, even if not declared. default 0
    this.manaCost = (typeof(params.manaCost) == "undefined") ? 0 : (
      typeof(params.manaCost) == "function" ? params.manaCost : function() {return params.manaCost;}
    )
    // visible : will always be a function, even if not declared. deffault true
    this.visible = (typeof(params.visible) == "undefined") ? true : (
      typeof(params.visible) == "function" ? params.visible : function() {return params.visible;}
    )
    // unlocked : will always be a function, even if not declared. deffault true
    this.unlocked = (typeof(params.unlocked) == "undefined") ? true : (
      typeof(params.unlocked) == "function" ? params.unlocked : function() {return params.unlocked;}
    )
    // affectedBy : will always be an array. Adds an image on the action div
    this.affectedBy = (typeof(params.affectedBy) == "undefined") ? [] :  params.affectedBy;
    
    // finish : will always be a function, even if not declared
    this.finish = (typeof(params.finish) == "undefined") ? function(){} : params.finish;
    // loot :  will always be an array, even if not declared
    this.loot = (typeof(params.loot) == "undefined") ? [] :  params.loot;
    
    // stats : will always be an object, even if not declared
    this.stats = (typeof(params.stats) == "undefined") ? {} : params.stats;
    // expMult : will always be an object, even if not declared. defaut 100% (1)
    this.expMult = (typeof(params.expMult) == "undefined") ? function(){return 1} : (
      typeof(params.expMult) == "function" ? params.expMult : function(){return params.expMult;}
    );
    
    this.labelDone = _txt("actions>"+params.xmlKey+">label_done",undefined,this.debug); // used in progress bar associated. not needed
    return this;
  };
  
  _Action.prototype.test = function() {console.log(this);}
  
  let _Wander = new _Action({
    id : "Wander",
    debug : true,
    expMult : 1, // this is the defaut value, so if your action has an 100% XP scaling, no need to mention it. Can also be a function
    townNum : 0, // can now be an array to use the same action in multiple towns
    xmlKey : "wander",
    stats : {
        Per:.2,
        Con:.2,
        Cha:.2,
        Spd:.3,
        Luck:.1
    },
    affectedBy : ["BuyGlasses"],
    manaCost :  250,
    visible : true, // same here, function or static value
    unlocked : true, // same here, function or static value
    finish : function () {
        // towns[0].finishProgress(this.varName, 200 * (glasses ? 4 : 1), function() {
        //     adjustPots();
        //     adjustLocks();
        // });
    },
    loot : ['Pot','Lock'],// use this instead of the finish function for corresponding loot update on finish
    progress : {
      id : 'WanderProgress', // usefull if you need to access it from somewhere else. e.g. you want to make this progressbar advance in another action, do OtherAction.progress."this id", and use the accessible functions
      type : 'simple', // the classic progress bar
      difficulty : 1,// the scaling applied to the progress through the %
      onFinish : function() { // loot when this action finishes
        return 200 * (glasses ? 4 : 1);
      }, 
    }
  })
  // console.log(_Wander);
  // _Wander.test();
  // new _Action({});
}