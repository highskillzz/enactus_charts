var HttpClient = function () {
    this.get = function (aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function () {
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        };

        anHttpRequest.open("GET", aUrl, true);
        anHttpRequest.send(null);
    };
};




// Our labels along the x-axis
var date = [];

var complete_data;

var client = new HttpClient();
client.get('https://kashyapshashankv.github.io/envision/data/qwe.json', function (json_data) {
    complete_data = JSON.parse(json_data);

    var number_of_calls = [];
    var counter = [];
    for (var i = 0; i < complete_data.length; i++) {
        var d = new Date(complete_data[i].Time);
        var formattedDate = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
        if (date.indexOf(formattedDate) == -1) {
            date.push(formattedDate);
            counter.push({
                date: formattedDate,
                count: 1
            });
        }
        else {
            for(var j=0;j<counter.length;j++)
            {
                if(counter[j].date==formattedDate)
                {
                    counter[j].count++;
                }
            }
        }
        
    }

    for (var i = 0; i < counter.length; i++)
    {
        number_of_calls[i]=counter[i].count;
    }

    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: date,
            datasets: [
                {
                    data: number_of_calls,
                    label: "Number of calls",
                    borderColor: "#3e95cd",
                    fill: false
                }
            ]
        }
    });
});





