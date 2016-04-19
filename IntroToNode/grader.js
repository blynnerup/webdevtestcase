function average(grades){
    var numScores = grades.length;
    var combinedScoreVal = 0;
    for(var i = 0; i < grades.length; i++){
        combinedScoreVal += grades[i];
    }
    console.log(Math.round((combinedScoreVal / numScores)));
}

var scores = [90, 98, 89, 100, 100, 86, 94];
average(scores);

var scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49]
average(scores2);