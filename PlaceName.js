
        var jsonall;

        window.onload = function () {
         document.getElementById('uploadfile').onchange = readFile;
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


        let  ipv = input_parse.value;
        let  count_dup = 0;

        for (x in jsobj_pure){
                count_dup++;
                let count  = count_dup+"";
                while(count.length<5){
                        count = "0"+count;
                }
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
                while(count.length<5){
                        count = "0"+count;
                }
                if(x.length>2 && "縣廳堡所街庄城市州町里坪社門保軍倉埔崎郡溪潭營".indexOf(x.substr(-1))!=-1){
                let x_sub =  x.slice(0,-1);
                ipv = ipv.replace(new RegExp("turing"+count+"csie","g"),`<span class="markup manual unsolved placeName" type="placeName">`+x+`</span>`)
                         .replace(new RegExp("alan"+count+"king","g"),`<span class="markup manual unsolved placeName" type="placeName">`+x_sub+`</span>`);


                }else if(x) {
                        ipv = ipv.replace("turing"+count+"csie",`<span class="markup manual unsolved placeName" type="placeName">`+x+`</span>`);
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

          });
          show_color_before_change_placename.innerHTML = `<style>span{color:red}</style>`+sobj.html();
          output_parse.value = sobj.html();
          
          //window.open("about:blank").document.write(`<style>span{color:red}</style>`+sobj.html());
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
          
          console.log(ucp_temp);
          user_change_placename.innerHTML = ucp_temp;



            return 0;
    }

    



    function user_change_parse(){
   

        user_change_placename.innerHTML = output_parse.value;



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
