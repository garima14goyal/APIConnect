var verb = apim.getvariable('request.verb').toLowerCase();
var OpPath = apim.getvariable('api.operation.path').toString();
var Obj= apim.getvariable('api.document');
var Obj1=Obj.paths[OpPath][verb].parameters;

for(var call of Obj1){
   
if(call.required === true)
{
    switch(call.in.toString()){
    
    case "header":
        
    var tesmnow="request.headers."+[call.name.toLowerCase()];
    if(!apim.getvariable(tesmnow)){
               
      console.info("Mandatory Field "+call.name+" Missing");
      apim.setvariable('message.status.code',400);
      apim.setvariable('message.status.reason',("Mandatory Field "+call.name+" Missing"));
      apim.error('MyCustomError', 400, ("Mandatory Field "+call.name+" Missing"));
                
    }
    break; 
                
    case "query": case "path":
        
 var par="request.parameters."+[call.name];

    if(!apim.getvariable(par)){
            
      console.info("Mandatory Field "+call.name+" Missing");
      apim.setvariable('message.status.code',400);
      apim.setvariable('message.status.reason',("Mandatory Fiel "+call.name+" Missing"));
      apim.error('MyCustomError', 400, ("Mandatory Field "+call.name+" Missing"));
                
    }
    break;             
    }   

}
    
} 


var miscinfo = apim.getvariable('oauth.introspect.miscinfo');
var splitted = miscinfo.split("a:", 2);
var value=splitted[1];
var val = JSON.parse(value);
var sessionId = val.sessionId;
var d = new Date().toISOString();
apim.setvariable('message.headers.sessionId', sessionId);
apim.setvariable('message.headers.Authorization', apim.getvariable('request.headers.authorization'));
//Timestamp Change  
apim.setvariable('message.headers.timeStamp', new Date().toISOString());


session.output.write(apim.getvariable('PrevInvokeResp.body'));
    apim.output('application/json');
    
if(apim.getvariable('message.status.code') == '201')
{
  apim.setvariable('message.status.reason', 'Created');  
}
else{
apim.setvariable('message.status.reason', 'Ok');
}