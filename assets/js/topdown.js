// ------------------------------------------------
// World Class definition
var WorldMap = function(options) {
  var worldMap = {
    // map object and descriptors
    targetDiv: null,
    mapDiv: {},
    mapDimensions: {
      x: 10,
      y: 10
    },
    mapCoords: {
      x: 0,
      y: 0
    },
    mapData: [],
    obstacleDiv: {},
    obstacleDiv2: {},
    obstacleDiv3: {},
    obstacleData: [],
    player: null,
    enemies: [],

    _objectCanMove: function(character, moveRequest) {
      var that = this;
      var targetX = character.characterCoords.x - moveRequest.left;
      var targetY = character.characterCoords.y - moveRequest.top;
      if (that.obstacleData[targetY] && that.obstacleData[targetY][targetX] < 1) {
        return true;
      }
      return false;
    },
    _getMoveRequestForRestrictObjectToBounds: function(character, moveRequest) {
      var that = this;
      var targetX = character.characterCoords.x - moveRequest.left;
      var targetY = character.characterCoords.y - moveRequest.top;

      var newLeft = (targetX > that.mapDimensions.x) ? 0 : moveRequest.left;
      newLeft = (targetX < 0) ? 0 : moveRequest.left;
      var newTop = (targetY > that.mapDimensions.y) ? 0 : moveRequest.top;
      newTop = (targetY < 0) ? 0 : moveRequest.top;
      return ({
        left: newLeft,
        top: newTop
      });
    },

    animate: function(moveRequest) {
      var that = this;
      that.player._lookAt(moveRequest);
      moveRequest = that._getMoveRequestForRestrictObjectToBounds(that.player, moveRequest);
      if (that._objectCanMove(that.player, moveRequest)) {
        that.player.move(moveRequest);
        that.move(moveRequest);

      }
      for (var i = 0; i < that.enemies.length; i++) {
        var enemy = that.enemies[i];
        var enemyMoveRequest = that._getMoveRequestForRestrictObjectToBounds(enemy, {
          left: Math.round(Math.random() * 2) - 1,
          top: Math.round(Math.random() * 2) - 1
        });
        if (that._objectCanMove(enemy, enemyMoveRequest)) {
          enemy.move(enemyMoveRequest);
        }

      }
    },
    move: function(moveRequest) {
      var that = this;
      if (moveRequest.left != 0 || moveRequest.top != 0) {
        $('#world').css({
          'transform': 'scale(1)'
        });

        that.mapCoords.x += moveRequest.left;
        that.mapCoords.y += moveRequest.top;
        // apply css transform
        that.mapDiv.css('transform', 'translate(' + 32 * that.mapCoords.x + 'px,' + 32 * that.mapCoords.y + 'px)');
        that.obstacleDiv.css({
          'transform-origin': 32 * (that.player.characterCoords.x + 0.5) + 'px ' + 32 * (that.player.characterCoords.y + 0.5) + 'px',
          'transform': 'translate(' + (32 * that.mapCoords.x) + 'px,' + 32 * that.mapCoords.y + 'px) '
        });
        that.obstacleDiv2.css({
          'transform-origin': 32 * (that.player.characterCoords.x + 0.5) + 'px ' + 32 * (that.player.characterCoords.y + 0.5) + 'px',
          'transform': 'translate3d(' + (32 * that.mapCoords.x) + 'px,' + (32 * that.mapCoords.y - 4) + 'px, 5px)'
        });
        that.obstacleDiv3.css({
          'transform-origin': 32 * (that.player.characterCoords.x + 0.5) + 'px ' + 32 * (that.player.characterCoords.y + 0.5) + 'px',
          'transform': 'translate3d(' + (32 * that.mapCoords.x) + 'px,' + (32 * that.mapCoords.y - 8) + 'px, 10px)'
        });
      } else {
        $('#world').css({
          'transform': 'scale(1.3)'
        });
      }
    },
    //private methods
    _generate: function() {
      var that = this;
      that.mapData = [];
      for (var i = 0; i < that.mapDimensions.y; i++) {
        var line = [];
        for (var j = 0; j < that.mapDimensions.x; j++) {
          var value = Math.round(Math.random() * 4);
          line.push(value);
        }
        that.mapData.push(line);
      }
      that.obstacleData = [];
      for (var i = 0; i < that.mapDimensions.y; i++) {
        var line = [];
        for (var j = 0; j < that.mapDimensions.x; j++) {
          var randVal = Math.round(Math.random() * 20);
          var value = (randVal > 4) ? 0 : randVal;
          line.push(value);
        }
        that.obstacleData.push(line);
      }
    },
    _init: function() {
      var that = this;
      (!that.mapData.length) && that._generate();
      var docFrag = document.createDocumentFragment();
      for (var i = 0; i < that.mapData.length; i++) {
        for (var j = 0; j < (that.mapData[i].length); j++) {
          var tile = document.createElement("div");
          tile.classList.add('floor-' + that.mapData[i][j]);
          docFrag.appendChild(tile);
        }
      }
      var mapContainer = that.targetDiv;
      that.mapDiv = $('<div class="map" style="width:' + that.mapDimensions.x * 32 + 'px;height:' + that.mapDimensions.y * 32 + 'px;">');
      mapContainer.append(that.mapDiv);
      that.mapDiv.append(docFrag);

      // obstacle 1
      var docFrag = document.createDocumentFragment();
      for (var i = 0; i < that.obstacleData.length; i++) {
        for (var j = 0; j < (that.obstacleData[i].length); j++) {
          var tile = document.createElement("div");
          tile.classList.add('wall-' + that.obstacleData[i][j]);
          docFrag.appendChild(tile);
        }
      }

      that.obstacleDiv = $('<div class="map height1" style="width:' + that.mapDimensions.x * 32 + 'px;height:' + that.mapDimensions.y * 32 + 'px;">');
      mapContainer.append(that.obstacleDiv);
      that.obstacleDiv.append(docFrag);

      // obstacle 2
      for (var i = 0; i < that.obstacleData.length; i++) {
        for (var j = 0; j < (that.obstacleData[i].length); j++) {
          var tile = document.createElement("div");
          tile.classList.add('wall-' + that.obstacleData[i][j]);
          docFrag.appendChild(tile);
        }
      }

      that.obstacleDiv2 = $('<div class="map height2" style="width:' + that.mapDimensions.x * 32 + 'px;height:' + that.mapDimensions.y * 32 + 'px;">');
      mapContainer.append(that.obstacleDiv2);
      that.obstacleDiv2.append(docFrag);
      // obstacle 3
      for (var i = 0; i < that.obstacleData.length; i++) {
        for (var j = 0; j < (that.obstacleData[i].length); j++) {
          var tile = document.createElement("div");
          tile.classList.add('wall-' + that.obstacleData[i][j]);
          docFrag.appendChild(tile);
        }
      }

      that.obstacleDiv3 = $('<div class="map height3" style="width:' + that.mapDimensions.x * 32 + 'px;height:' + that.mapDimensions.y * 32 + 'px;">');
      mapContainer.append(that.obstacleDiv3);
      that.obstacleDiv3.append(docFrag);
    },
  };
  $.extend(worldMap, options);
  worldMap._init();
  return worldMap;
}

// ------------------------------------------------
// CHARACTER

var Character = function(options) {
    var character = {
      characterDiv: {},
      characterCoords: {
        x: 0,
        y: 0
      },
      moveRequest: {
        left: 0,
        top: 0,
        attack: 0
      },
      create: function() {
        var that = this;
        that.characterDiv = $('<div class="obj player">');

        // apply css transform
        that.characterDiv.css('transform', 'translate(' + 32 * that.characterCoords.x + 'px,' + 32 * that.characterCoords.y + 'px)');
        $('.map').first().append(this.characterDiv);
      },

      _lookAt: function(moveRequest) {
        var that = this;

        if (moveRequest.top == 0 && moveRequest.left == 0) {
          moveRequest = that.moveRequest;

        } else {
          that.moveRequest = moveRequest;

        }

        if (moveRequest.left == 0) {
          //this.characterDiv.removeClass('left right');
        } else {
          if (moveRequest.top == 0) {
            this.characterDiv.removeClass('up down');
          }
          this.characterDiv.removeClass('left right');
          this.characterDiv.addClass(((moveRequest.left > 0) ? ' left' : ' right'));
        }
        if (moveRequest.top == 0) {
          //this.characterDiv.removeClass('up down');
        } else {
          if (moveRequest.left == 0) {
            this.characterDiv.removeClass('left right');
          }
          this.characterDiv.removeClass('up down');
          this.characterDiv.addClass(((moveRequest.top > 0) ? ' up' : ' down'));

        }
      },
      move: function(moveRequest) {
        var that = this;
        that._lookAt(moveRequest);

        if (moveRequest.top == 0 && moveRequest.left == 0) {
          this.characterDiv.removeClass('running');
        } else {
          this.characterDiv.addClass('running');
          that.characterCoords.x -= moveRequest.left;
          that.characterCoords.y -= moveRequest.top;
          that.characterDiv.css('transform', 'translate(' + 32 * that.characterCoords.x + 'px,' + 32 * that.characterCoords.y + 'px)');
          //return true;
        }
        //return false;
      }
    };
    $.extend(character, options);
    character.create();
    return character;
  }
  // ------------------------------------------------
  // ENEMY
var Enemy = function(options) {
  var enemyObj = new Character(options);
  enemyObj.health = 20;
  return enemyObj;
}

// ------------------------------------------------

// moverequest et gestion des inputs
var moveRequest = {
  top: 0,
  left: 0,
  attack: 0
};

$('#viewport').on('keydown', function(e) {

  switch (e.which) {
    case 32:
      //fait un truc
      moveRequest.attack = 1;
      break;
    case 37:
      //fait un truc
      moveRequest.left = 1;
      break;
    case 38:
      //fait un truc
      moveRequest.top = 1;
      break;
    case 39:
      //fait un truc
      moveRequest.left = -1;
      break;
    case 40:
      //fait un truc
      moveRequest.top = -1;
      break;
    default:
      return false;
  }
})

// ------------------------------------------------

// creation et instanciation de la map
var currentMap = new WorldMap({
  targetDiv: $('#world'),
  mapDimensions: {
    x: 50,
    y: 50
  }

});
// ajout du player dans la map
currentMap.player = new Character({
  name: 'bob',
  health: 80,
  characterCoords: {
    x: 10,
    y: 7
  }
});
// ajout des ennemis dans la map
for (var i = 0; i < 10; i++) {
  var enemyStats = {
    name: 'batard',
    characterCoords: {
      x: Math.round(Math.random() * 10),
      y: Math.round(Math.random() * 10),
    },
    create: function() {
      var that = this;
      that.characterDiv = $('<div class="obj enemy">');

      // apply css transform
      that.characterDiv.css('transform', 'translate(' + 32 * that.characterCoords.x + 'px,' + 32 * that.characterCoords.y + 'px)');
      $('.map').first().append(this.characterDiv);
    },
  };
  var enemy = new Enemy(enemyStats);
  currentMap.enemies.push(enemy);
}

// ------------------------------------------------
// gametick, repetition toutes les 100ms

var gameTick = function() {
  currentMap.animate(moveRequest);

  moveRequest = {
    top: 0,
    left: 0,
    attack: 0
  };

}

window.setInterval(function() {
  gameTick()
}, 200);