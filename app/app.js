/**
 * Created by Matt on 16.07.15.
 */
var battleships = (function(){
    //create player maps
    var player1 = {
        map : new GenerateRoom(10, 10, '1', false),
        name: "pl_1",
        shoot : shoot,
        ships : 0,
        canShoot : true
    };
    var player2 = {
        map : new GenerateRoom(10,10, '2', false),
        name: "pl_2",
        shoot : shoot,
        ships : 0,
        canShoot : false
    };
    //create enemy map for players and assign them with null value
    var player1Enemy = {
        enemyMap :  null
    };
    var player2Enemy = {
        enemyMap : null
    };
    //game state object
    var gameState = {
        running : false,
        generateMaps : function(){
            player1Enemy.enemyMap = new GenerateRoom(10, 10, '1', true);
            player2Enemy.enemyMap = new GenerateRoom(10, 10, '2', true);
        }
    };


    function shoot(x, y, shooter, target, element){
        var tgt = target.name + "_" + x + "x" + y;
        var tgtField = document.getElementById(tgt);
        if(shooter.canShoot){
            if(target.map[x][y].shipPresent){
                console.log(shooter.name + " hit the target");
                target.map[x][y].shipPresent = 'destroyed';
                target.ships--;
                tgtField.style.backgroundColor = 'pink';
            } else{
                console.log(shooter.name + " missed the target");
                tgtField.style.backgroundColor = 'gray';
            }
            shooter.canShoot = false;
            target.canShoot = true;
            element.style.backgroundColor = 'red';
            element.removeEventListener('click', arguments.callee); // remove event listener
        } else{
            console.log("it's not your turn");
        }

        gameState = checkShips(target);
        if(!gameState){
            alert(shooter.name + " WINS!");
            setTimeout(location.reload(), 2000);

        }

    }

    function checkShips(player){
        return player.ships > 0 ? true : false;
    }

    //Game map generations
    function GenerateRoom(x, y, playerId, enemy){
        var room = [[]]; // instantiate first row
        var side = playerId == '1' ? 'left' : 'right';
        var playerSide = document.getElementById(side);
        var ene = enemy === true ? 'en_' + playerId  : 'pl_' + playerId;
        var player = document.getElementById(ene);
        var map = document.createElement('div');
        map.className = ene;
        playerSide.appendChild(player);
        player.appendChild(map);

        for(var i = 0; i < x; i++){
            for(var j = 0; j < y; j++){
                var div = document.createElement('div');
                room[i][j] = {
                    shipPresent: false
                };
                div.id = ene + "_" + i + "x" + j;
                div.className = 'field';
                if(enemy){
                    addListener(div);

                } else{
                    addShip(div);
                }
                map.appendChild(div);
            }
            room.push([]); //add next row
        }
        return room;
    }
    //add click event listener function
    function addListener(element){
        element.addEventListener('click', function(){
            var player = element.parentNode.className === 'en_1' ? 'pl_1' : 'pl_2';
            var x = Number(element.id.charAt(5));
            var y = Number(element.id.charAt(7));
            console.log(x + '___' + y);
            if(player === player1.name){
                shoot(x, y, player1, player2, element);
            } else{
                shoot(x, y, player2, player1, element);
            }
            console.log(player);

        })
    }

    function addShip(element){
        element.addEventListener('click', function(){
            var player = element.parentNode.className;
            var x = Number(element.id.charAt(5));
            var y = Number(element.id.charAt(7));
            if(player === player1.name){
                if(player1.ships < 5){
                    player1.ships++;
                    player1.map[x][y].shipPresent = true;
                    element.style.backgroundColor = 'blue';
                    console.log(player1.name + " has: " + player1.ships + " ships");
                } else{
                    console.log("Maximum ships reached");
                }
            } else{
                if(player2.ships < 5){
                    player2.ships++;
                    player2.map[x][y].shipPresent = true;
                    element.style.backgroundColor = 'blue';
                    console.log(player2.name + " has: " + player2.ships + " ships");
                } else{
                    console.log("Maximum ships reached");
                }
            }
            if(player1.ships === 5 && player2.ships === 5 && gameState.running === false){
                gameState.running = true;
                gameState.generateMaps();
            }
            this.removeEventListener('click', arguments.callee); // remove event listener
        })
    }
});

//instantiate game
battleships();