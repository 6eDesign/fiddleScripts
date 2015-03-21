var messagingImplementation = (function(w,d,$,pub){   
    for(var i=0; i < msgConfig.messageTypes.length; ++i) { 
        messenger.registerMessageType(msgConfig.messageTypes[i].id,msgConfig.messageTypes[i].opts); 
    }
    
    /* This section will need to be replaced with actual data from the JSON model or something */
    messenger.registerVariable('xmTaskName','Repair/Service Humidifier'); 
    messenger.registerVariable('consumerPhone','(303) 451 - 0562');     
    messenger.registerVariable('consumerEmail','jgreenemeier@homeadvisor.com'); 
    messenger.registerVariable('consumerFirstName','David'); 
    messenger.registerVariable('consumerLastName','Higginbotham'); 
    
    /* 
        This section will likely be replaced as well, but let's give it a quick go: 
        1. Attach click handler, sendMessage(), to .sendMessageBtn elements
        2. Create sendMessage function that serializes this form
    */ 
    var sendMessage = function() { 
        var opts = $(this).data(); 
        var data = $(opts.form).serializeObject(); 
        console.log(opts,data);
        return false; 
    }; 
    var init = function() { 
        $('.sendMessageBtn').on('click',sendMessage);         
    }; 
    $(d).ready(init); 

    
    return pub; 
})(window,document,jQuery,{}); 