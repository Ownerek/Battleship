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
    //create enemy map for players
    var player1Enemy = {
        enemyMap : new GenerateRoom(10, 10, '1', true)
    };
    var player2Enemy = {
        enemyMap : new GenerateRoom(10, 10, '2', true)
    };



    function shoot(x, y, shooter, target){
        if(target.map[x][y].shipPresent){
            console.log(shooter + " hit the target");
        } else{
           console.log(shooter + " missed the target");
        }
        shooter.canShoot = false;
        target.canShoot = true;
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
        player.appendChild(map);
        playerSide.appendChild(player);

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
            room.push([]);
        }
        return room;
    }
    //add click event listener function
    function addListener(element){
        element.addEventListener('click', function(){
            element.style.backgroundColor = 'red';
            this.removeEventListener('click', arguments.callee);
            console.log('clicked on: ' + element.id);
        })
    }

    function addShip(element){
        element.addEventListener('click', function(){
            var player = element.parentNode.className;

            if(player === player1.name){
                if(player1.ships < 15){
                    player1.ships++;
                    console.log(player1.name + " has: " + player1.ships);
                } else{
                    console.log("Maximum ships reached");
                }
            } else{
                if(player2.ships < 15){
                    player2.ships++;
                    console.log(player2.name + " has: " + player2.ships);
                } else{
                    console.log("Maximum ships reached");
                }
            }

            element.style.backgroundColor = 'blue';
            this.removeEventListener('click', arguments.callee);
            console.log('clicked on: ' + element.id);


        })
    }

    function test(){
        player2.map[1][1].shipPresent = true;
        console.log(player2.map[1][1]);
        player1.shoot(1,1, player1.name, player2);
    }
    test();
});

//instantiate game
battleships();