majorRankBoundaries = [100,220,400,500];
majorRankNames = ["Bronze", "Silver", "Gold", "Plat"];
minorRankSplits = [5, 5, 3, 3];
eloIncrease = [50,40,30,20]
eloDecrease = [-15,-20,-25-30]
ranks = {};
base  = 0;
for(let i = 0; i < majorRankBoundaries.length; i++){
    for(let j = 1; j <= minorRankSplits[i]; j++){
        var name = majorRankNames[i] + (minorRankSplits[i]-j+1).toString();
        console.log('{'+name +  ":" + " { " + "elo:" + ((majorRankBoundaries[i]-base) * (j-1)/minorRankSplits[i] + base).toString()+",\nwin:"+ eloIncrease[i].toString()+",\nloss:"+ eloDecrease[i].toString()+ ",\nmvp:"+ "15" + "}"+'}');
    }
    base = majorRankBoundaries[i];
}
