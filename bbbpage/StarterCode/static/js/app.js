function getInMyBelly(id) {
    //Use the D3 library to read in samples.json.
        d3.json("samples.json").then (bellyData =>{
            console.log(bellyData)
            var ids = bellyData.samples[0].otu_ids;
            console.log(ids)
            var sampleValues =  bellyData.samples[0].sample_values.slice(0,10).reverse();
            console.log(sampleValues)
            var labels =  bellyData.samples[0].otu_labels.slice(0,10);
            console.log (labels)
        // Display top 10 OTUs and reverse order of list.
            var otuTopTen = ( bellyData.samples[0].otu_ids.slice(0, 10)).reverse();
        // Prep OTUs for plotting
            var OTU_id = otuTopTen.map(d => "OTU " + d);
            console.log(`OTU IDS: ${OTU_id}`)
         // Setting Top ten labels for plot
            var labels =  bellyData.samples[0].otu_labels.slice(0,10);
            console.log(`OTU_labels: ${labels}`)
            var trace = {
                x: sampleValues,
                y: OTU_id,
                text: labels,
                marker: {
                color: '#33C0FF'},
                type:"bar",
                orientation: "h",
            };
            // Setting data variable hover text
            var data = [trace];
    
            // create layout variable to set plots layout.
            var layout = {
                title: "Top 10 OTUs found in Test Subjects",
                yaxis:{
                    tickmode:"linear",
                },
            // Setting bar chart margins.    
                margin: {
                    l: 100,
                    r: 100,
                    t: 100,
                    b: 50
                }
            };
    
            // Create the bar plot
        Plotly.newPlot("bar", data, layout);
            //  Bubble chart
            var trace1 = {
                x: bellyData.samples[0].otu_ids,
                //gridcolor : rgb(255, 255, 255),
                y: bellyData.samples[0].sample_values,
                mode: "markers",
                marker: {
                    size: bellyData.samples[0].sample_values,
                    color: bellyData.samples[0].otu_ids,
                    //gridcolor : rgb(255, 255, 255),
                    
                },
                text:  bellyData.samples[0].otu_labels
                
    
            };
    
            // Layout for bubble chart
            var layout_2 = {
                xaxis:{title: "OTU ID"},
                height: 700,
                width: 1200
            };
    
            // Setting data1 variable 
            var data1 = [trace1];
    
        // Create the bubble plot
        Plotly.newPlot("bubble", data1, layout_2); 
        
        });
    }  
    // Function for demographic info chart
    function demoGraphic(id) {
    // d3 to read in json file.
        d3.json("samples.json").then((data)=> {
    // Get the demo data info for the demographic info panel
            var metadata = data.metadata;
    
            console.log(metadata)
    
          // Filter demo metadata info by id
           var result = metadata.filter(demo => demo.id.toString() === id)[0];
          // Select demo panel to pplace data into
           var demographicInfo = d3.select("#sample-metadata");
            
         // Reset demo panel each time new ID is picked
           demographicInfo.html("");
    
         // Filter data and append new data to demo panel
            Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
            });
        });
    }
    // Function to handle event changes
    function optionChanged(id) {
        getInMyBelly(id);
        demoGraphic(id);
    }
    
    // Function to set data into navigation
    function init() {
        // select dropdown menu 
        var dropdown = d3.select("#selDataset");
    
        // Read in data 
        d3.json("samples.json").then((data)=> {
            console.log(data)
    
            // Add in IDs to navigation menu
            data.names.forEach(function(name) {
                dropdown.append("option").text(name).property("value");
            });
    
            // Display data and plots
            getInMyBelly(data.names[0]);
            demoGraphic(data.names[0]);
        });
    }
    
    init();
