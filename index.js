/**
 * Created by salpy on 2015-11-29.
 * http://stackoverflow.com/questions/521295/javascript-random-seeds/19303725#19303725
 * http://raksy.dyndns.org/randompoints.html
 */

function pickSpherePoints(numPoints, seed){

    var pts = [];

    //Random with a seed - same set each time
    function random() {
        var x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    }

    function dist2(a, b)
    {
        var dx = a.x - b.x;
        var dy = a.y - b.y;
        var dz = a.z - b.z;
        return dx*dx + dy*dy + dz*dz;
    }

    function randomPoint()
    {
        var x = random() - 0.5, y = random() - 0.5, z = random() - 0.5;
        var k = Math.sqrt(x*x + y*y + z*z);
        while (k < 0.2 || k > 0.3)
        {
            x = random() - 0.5;
            y = random() - 0.5;
            z = random() - 0.5;
            k = Math.sqrt(x*x + y*y + z*z);
        }
        return {x:x/k, y:y/k, z:z/k};
    }

    function spreadPoints(numPoints)
    {
        pts[0] = randomPoint();
        for (var i=1; i<numPoints; i++)
        {
            var best = null;
            for (var j=0; j<10; j++)
            {
                var p = randomPoint();
                var md = null;
                for (var k=0; k<pts.length; k++)
                {
                    var d = dist2(p, pts[k]);
                    if (md === null || md > d) md = d;
                }
                if (best === null || best[0] < md)
                    best = [md, p];
            }
            pts.push(best[1]);
        }
    }


    spreadPoints(numPoints);
    return pts;

}

module.exports = pickSpherePoints;
