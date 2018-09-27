
        var jsonall;
        var mymap;
        window.onload = function () {
         document.getElementById('uploadfile').onchange = readFile;
         //alert($.contextMenu==null);
        };
        function readFile() {
                file = this.files[0];
         var fReader = new FileReader();
         fReader.onload = function (event) {
                 jsonall  = JSON.parse(parsecsv(event.target.result.trim()));

                
         };
        fReader.readAsText(file);
        }

        function parsecsv(csv){

                  var lines=csv.split("\n");

                  var result = [];

                  var headers=lines[0].split(",");

                  for(var i=1;i<lines.length;i++){

                          var obj = {};
                          var currentline=lines[i].split(",");

                          for(var j=0;j<headers.length;j++){
                                  obj[headers[j]] = currentline[j];
                          }

                          result.push(obj);

                  }

                  //return result; //JavaScript object
                  return JSON.stringify(result); //JSON
         }
    function transform_parse(){
        var  jsobj={};
        var  jsobj_ntuid={};

        var  jsobj_pure = {};

        jsonall.forEach(function(val,ind)
          {
        
           if(jsobj[val["NAME_SIM"].trim()]==null){
                jsobj[val["NAME_SIM"].trim()]={};
            }
            if(val["BEG"]){
                while((val["BEG"]+"").length<4){
                  val["BEG"] = (val["BEG"]+"")+"0";
                 }
            }
            if(val["END"]){
                while((val["END"]+"").length<4){
                  val["END"] = (val["END"]+"")+"0";
                 }

            }
            if(val["BEG"] && val["END"]){
              for(i=parseInt(val["BEG"]/100);i<=parseInt(val["END"]/100);i++){
                jsobj[val["NAME_SIM"].trim()][i+""]=val["id"];

              }
            }else if(val["BEG"]){
                jsobj[val["NAME_SIM"].trim()][(val["BEG"]/100).toFixed()+""]=val["id"];

            }else if(val["END"]){
                jsobj[val["NAME_SIM"].trim()][(val["END"]/100).toFixed()+""]=val["id"];

            }

            if(jsobj_ntuid[val["id"]]==null){
                jsobj_ntuid[val["id"]]={};
            }
            if(val["BEG"] && val["END"]){
                jsobj_ntuid[val["id"]]["ntuidyear"]=(val["BEG"] || "" ).substr(0,4)+""+"~"+ (val["END"] || "" ).substr(0,4)+"";
              }else if(val["BEG"]){
                  jsobj_ntuid[val["id"]]["ntuidyear"]=(val["BEG"] || "" ).substr(0,4)+"";
              }else if(val["END"]){
                jsobj_ntuid[val["id"]]["ntuidyear"]=(val["END"] || "" ).substr(0,4)+"";
              }
           
            jsobj_ntuid[val["id"]]["x"]= (val["X"] || "" )+"";
            jsobj_ntuid[val["id"]]["y"]= (val["Y"] || "" )+"";

            //console.log(jsobj_ntuid[val["id"]]["year"]);
            //console.log(jsobj_ntuid[val["id"]]["x"]);
            //console.log(jsobj_ntuid[val["id"]]["y"]);
          });
          jsobj_pure =  Object.assign({}, jsobj);
          jsobj = {};
          jsonall.forEach(function(val,ind)
          {

           if(jsobj[val["NAME_SIM"].trim()]==null){
                jsobj[val["NAME_SIM"].trim()]={};
            }
           if(jsobj[val["NAME_SIM"].trim().slice(0,-1)]==null){
                jsobj[val["NAME_SIM"].trim().slice(0,-1)]={};
            }
            if(val["BEG"]){
                while((val["BEG"]+"").length<4){
                  val["BEG"] = (val["BEG"]+"")+"0";
                 }

            }
            if(val["END"]){
                while((val["END"]+"").length<4){
                  val["END"] = (val["END"]+"")+"0";
                 }

            }
            if(val["BEG"] && val["END"]){
              for(i=parseInt(val["BEG"]/100);i<=parseInt(val["END"]/100);i++){
                jsobj[val["NAME_SIM"].trim()][i+""]=val["id"];
                jsobj[val["NAME_SIM"].trim().slice(0,-1)][i+""]=val["id"];
              }
            }else if(val["BEG"]){
                jsobj[val["NAME_SIM"].trim()][(val["BEG"]/100).toFixed()+""]=val["id"];
                jsobj[val["NAME_SIM"].trim().slice(0,-1)][(val["BEG"]/100).toFixed()+""]=val["id"];
            }else if(val["END"]){
                jsobj[val["NAME_SIM"].trim()][(val["END"]/100).toFixed()+""]=val["id"];
                jsobj[val["NAME_SIM"].trim().slice(0,-1)][(val["END"]/100).toFixed()+""]=val["id"];
            }
          });

        input_parse.value=input_parse.value.replace("压","庄");
        input_parse.value=input_parse.value.replace("庒","庄");
        input_parse.value=input_parse.value.replace("圧","庄");
        input_parse.value=input_parse.value.replace("莊","庄");
        let  ipv = input_parse.value;
        let  count_dup = 0;

        for (x in jsobj_pure){
                count_dup++;
                let count  = count_dup+"";
    
                if(x.length>2 && "縣廳堡所街庄城市州町里坪社門保軍倉埔崎郡溪潭營".indexOf(x.substr(-1))!=-1){
                let x_sub =  x.slice(0,-1);
                ipv = ipv.replace(new RegExp(x.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'),"g"),"turing"+count+"csie")
                         .replace(new RegExp(x_sub.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'),"g"),"alan"+count+"king");

                     

                }else if(x) {
                        ipv = ipv.replace(new RegExp(x.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'),"g"),"turing"+count+"csie");

                      

                }




        }

        //console.log(ipv);
        count_dup = 0;

        for (x in jsobj_pure){
                count_dup++;
                let count  = count_dup+"";
    
                if(x.length>2 && "縣廳堡所街庄城市州町里坪社門保軍倉埔崎郡溪潭營".indexOf(x.substr(-1))!=-1){
                let x_sub =  x.slice(0,-1);
                ipv = ipv.replace(new RegExp("turing"+count+"csie","g"),`<span class="markup manual unsolved placeName" type="placeName">`+x+`</span>`)
                         .replace(new RegExp("alan"+count+"king","g"),`<span class="markup manual unsolved placeName" type="placeName">`+x_sub+`</span>`);


                }else if(x) {


                        ipv = ipv.replace(new RegExp("turing"+count+"csie","g"),`<span class="markup manual unsolved placeName" type="placeName">`+x+`</span>`);


                }

        }
        var sobj = $("<div>").append(ipv);
        //console.log(ipv);
        sobj.find("span").each(function(ind){
             if(jsobj[$(this).text().trim()][year.value+""]!=null){
                $(this).attr("placename_id",jsobj[$(this).text().trim()][year.value+""]);

             }
                let array =[];
                let array2 = [];
                for (x in jsobj_pure[$(this).text().trim()]) {
                        let s = jsobj[$(this).text().trim()][x];
                        if(array.indexOf(s)==-1){
                                array.push(s);
                                array2.push(x);
                        }


                }
               array=array.map((ii,ind)=>(array2[ind]+"***"+ii));
               array.sort( (a,b)=>
                        {
                                let aa=a.substr(0,4)*1;
                                let bb=b.substr(0,4)*1;
                                let temp  = (year.value-aa)-(year.value-bb);
                                if(!temp){
                                                return aa-bb;
                                }else{

                                        return temp;
                                }
                        } );
                array=array.map((ii)=>(ii.split("***")[1]));
                $(this).attr("candidate_id",array.join(" "));

                $(this).attr("contextmenu_index",ind);
                var tempitemobj = {};
                var tempitemobj2 = {};
                if($(this).attr("placename_id")!=null){
                        tempitemobj[$(this).attr("placename_id")] = {name : ($(this).attr("placename_id")+" C.E."+jsobj_ntuid[$(this).attr("placename_id")]["ntuidyear"])};
                 }
                 $(this).attr("candidate_id").trim().split(" ").forEach(function(val,ind){
                      
                      if(val){
                        tempitemobj[val] = {name : (val+""+" C.E."+jsobj_ntuid[val.trim()]["ntuidyear"])};
                      
                      }  
                       
           
                       
                 });
                
           
                 if(!$.isEmptyObject(tempitemobj)){
                        sobj.contextMenu({
                                selector: "[contextmenu_index=\""+ind+"\"]",
                        callback: function(key, options) {
                                //var m = "clicked: " + key + " on " + $(this).text();
                                //window.console && console.log(m) || alert(m); 
                                if($(this).attr("candidate_id").split(" ").indexOf($(this).attr("placename_id"))==-1){
                                        $(this).attr("candidate_id",$(this).attr("candidate_id")+" "+$(this).attr("placename_id"));
                                }
                                $(this).attr("placename_id",key);

                        },
                        items: tempitemobj 
                        });
                  
                }else{
                        sobj.contextMenu({
                                selector: "[contextmenu_index=\""+ind+"\"]",
                        callback: function(key, options) {
                                

                        },
                        items: {"no":{"name":"no item"}}
                        });

                }

          });

          $(show_color_before_change_placename).html("");
          
          

          $(show_color_before_change_placename).append(sobj);
        



          output_parse.value = sobj.html();
          
         /* //window.open("about:blank").document.write(`<style>span{color:red}</style>`+sobj.html());
          var ucp_temp = "";

          sobj.find("span").each(function(ind){
                 let selectoption = "";
                 if($(this).attr("placename_id")){
                        selectoption = selectoption+`<option value="`+$(this).attr("placename_id")+""+`">`+$(this).attr("placename_id")+""+`</option>`;
                 }
                 $(this).attr("candidate_id").split(" ").forEach(function(element){
                        selectoption = selectoption+`<option value="`+element+""+`">`+element+""+`</option>`;

                 });
                ucp_temp = ucp_temp+`<div class="form-group" class="col-sm-3">`+$(this).text().trim()+""+`<form><select name="`+$(this).text().trim()+`">`
                +selectoption+`</select></form>`+`</div>`;



          });
          
          //console.log(ucp_temp);
          user_change_placename.innerHTML = ucp_temp;


          */
         $(showmap).removeAttr( "style" );
         $(show_color_before_change_placename).removeAttr( "style" );
         $("#showmap").html("");
              

        
       
        if(mymap == undefined || mymap == null){  
                mymap = L.map('showmap').setView([23.9,121.0], 8);
                L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
                maxZoom: 20,
                id: 'mapbox.streets',
                accessToken: 'pk.eyJ1IjoiaGN5dXNlciIsImEiOiJjamJmdmRva3IyemlsMzRxZmxyampzeXBjIn0.7TrJpOyMKft7JSaszfbVqQ'
                }).addTo(mymap);

        }else{
                mymap.remove();  
                mymap = L.map('showmap').setView([23.9,121.0], 8);
                L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
                maxZoom: 20,
                id: 'mapbox.streets',
                accessToken: 'pk.eyJ1IjoiaGN5dXNlciIsImEiOiJjamJmdmRva3IyemlsMzRxZmxyampzeXBjIn0.7TrJpOyMKft7JSaszfbVqQ'
                }).addTo(mymap);

        }
         var marker = {};
         if(marker){
                mymap.removeLayer(marker);
         }
          //var marker = L.marker([24.9,121.4]).addTo(mymap);
          //marker.bindPopup("Taipei1");
          //var marker = L.marker([24.9,121.3]).addTo(mymap);
          //marker.bindPopup("Taipei2");

          sobj.find("span").each(function(ind){
                if($(this).attr("candidate_id")){
                        let x = $(this).attr("candidate_id").split(" ");
                        for(let i=0;i<x.length;i++){
                                marker = L.marker([jsobj_ntuid[x[i]]["y"]+"",jsobj_ntuid[x[i]]["x"]+""]).addTo(mymap);
                                marker.bindPopup($(this).text().trim()+"<br>"+x[i]+""+"<br> C.E."+jsobj_ntuid[x[i]]["ntuidyear"]+"");
                
                        }

                }
                if($(this).attr("placename_id")){
                                marker = L.marker([jsobj_ntuid[$(this).attr("placename_id")+""]["y"]+"",jsobj_ntuid[$(this).attr("placename_id")+""]["x"]+""]).addTo(mymap);
                                marker.bindPopup($(this).text().trim()+"<br>"+$(this).attr("placename_id")+""+"<br> C.E."+jsobj_ntuid[$(this).attr("placename_id")+""]["ntuidyear"]+"");
                     
                        

                }


          });


            return 0;
    }

    



    function user_change_parse(){
   
        $("#show_color_before_change_placename").find("span").removeAttr("contextmenu_index"); 
       output_parse.value = $("#show_color_before_change_placename").find("div").html();



    }


    function escapeSpecialChars(jsonString) {

            return jsonString.replace(/\n/g, "\\n")
                .replace(/\r/g, "\\r")
                .replace(/\t/g, "\\t")
                .replace(/\f/g, "\\f")
               .replace(/\\n/g, "\\n")
               .replace(/\\'/g, "\\'")
               .replace(/\\"/g, '\\"')
               .replace(/\\&/g, "\\&")
               .replace(/\\r/g, "\\r")
               .replace(/\\t/g, "\\t")
               .replace(/\\b/g, "\\b")
               .replace(/\\f/g, "\\f");

    }
