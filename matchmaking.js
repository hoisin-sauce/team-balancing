/*
{id:{id,wins,losses,elo,mvp}}

*/

// initialise firebase

var firebase = require("firebase-admin");

var serviceAccount = require("./ocs-customs-firebase-adminsdk-ioj71-45424ddc26.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://ocs-customs-default-rtdb.firebaseio.com/"
});

var db = firebase.database();
//var ref = db.ref("players/");

/*var usersRef = ref.child("ID HERE");
usersRef.set({
  alanisawesome: {
    date_of_birth: "June 23, 1912",
    full_name: "Alan Turing"
  },
  gracehop: {
    date_of_birth: "December 9, 1906",
    full_name: "Grace Hopper"
  }
});*/


// example dataset


plrs = [
    {
        id: 1,
        wins: 0,
        losses: 0,
        elo: 145,
        mvp: 0
    },
    {
        id: 2,
        wins: 0,
        losses: 0,
        elo: 100,
        mvp: 0
    },
    {
        id: 3,
        wins: 0,
        losses: 0,
        elo: 120,
        mvp: 0
    },
    {
        id: 4,
        wins: 0,
        losses: 0,
        elo: 115,
        mvp: 0
    },
    {
        id: 5,
        wins: 0,
        losses: 0,
        elo: 175,
        mvp: 0
    },
    {
        id: 6,
        wins: 0,
        losses: 0,
        elo: 510,
        mvp: 0
    }
]


function initialiseUser(id){
    ref = db.ref("players/");
    usersRef = ref.child(id);
    usersRef.set({
        id_: id,
        wins: 0,
        los: 0,
        mvp: 0,
        elo: 0
    })
}

async function matchmake(players){
    elos = [];
    for(let player in players){
        elos.push(players[player].elo);
    }
    currentMinDif = 69420;
    currentOrder = elos;

    posibleCombinations = await permutator(elos);
    
    for(let i = 0; i < posibleCombinations.length; i++){
        combination = posibleCombinations[i];
        differ = calculateEloDifference(combination);
        if(differ < currentMinDif){
            currentMinDif = differ;
            currentOrder = combination;
        }
    }
    matchedElo = await matchELO(currentOrder, players);
    matchedElo = currentOrder;
    return split(matchedElo);
}

function split(elos){

    halfElo = Math.ceil(elos.length/2);
    t1 = elos.slice(0, halfElo);
    if(elos.length % 2 == 0){
        t2 = elos.slice(-halfElo);
    }else{
        t2 = elos.slice(-halfElo + 1);
    }
    
    return [t1, t2];
}

function calculateEloDifference(elos){
    elos = split(elos);
    dif = elos[0].reduce((a, b) => a + b, 0) - elos[1].reduce((a, b) => a + b, 0);
    dif = Math.abs(dif);
    return dif;
}

async function permutator(inputArr){
    let result = [];
  
    async function permute(arr, m = []){
      if (arr.length === 0) {
        result.push(m)
      } else {
        for (let i = 0; i < arr.length; i++) {
          let curr = arr.slice();
          let next = curr.splice(i, 1);
          permute(curr.slice(), m.concat(next))
       }
     }
   }
  
   await permute(inputArr)
  
   return result;
  }

async function matchELO(elos, players){
    outputTeams = [];
    for(let player in players){
        for(let i = 0; i < elos.length; i++){
            if(elos[i] == players[player].elo){
                outputTeams.push(players[player].id);
                elos.splice(i,1);
                break;
            }
        }
    }
    return outputTeams
}

async function testAlgorithm(){
    output = await matchmake(plrs);
    console.log(output);
}

testAlgorithm();



