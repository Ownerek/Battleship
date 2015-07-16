/**
 * Created by Matt on 16.07.15.
 */
var battleships = (function(){
    //create player maps
    var player1 = {
        map : new GenerateRoom(10, 10, '1', false),
        name: "Matt",
        shoot : shoot,
        canShoot : true
    };
    var player2 = {
        map : new GenerateRoom(10,10, '2', false),
        name: "Patrick",
        shoot : shoot,
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
                div.id = ene + "_" + i+1 + "x" + j+1;
                div.className = 'field';
                addListener(div);
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