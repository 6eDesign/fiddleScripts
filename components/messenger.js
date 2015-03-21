var messenger = (function(w,d,$,pub){
 
    var state = { 
        // an array of the triggers 
        triggers: [ ], 
        // container-id-keyed object w/ 'someContainerID': { el: <element>, opts: { } }, ...
        containers: { }, 
        // message-type-keyed object w/ options for each message types (templates [tmpl]'s): 
        messageTypes: { }, 
        // an array of known values
        variables: [ ], 
        // custom open handlers, separate from template-options-based open handlers (can be assigned anytime)
        customOpenHandlers: { }
    }; 
    
    var messageDefaults = { 
        openHandler: null, 
        successHandler: null, 
        errorHandler: null
    }; 
        
    var domCollection = function() { 
        state.triggers = $('.msgTrigger').toArray(); 
        $(state.triggers).on('click',triggerClickHandler); 
        var containers = $('.msgContainer').toArray(); 
        for(var i=0; i < containers.length; ++i) { 
            state.containers[containers[i].getAttribute('id')] = { 
                container: containers[i], 
                opts: $(containers[i]).data(), 
                subject: $(containers[i]).find('[name="subject"]')[0], 
                message: $(containers[i]).find('[name="message"]')[0]
            }; 
        }
    }; 
    
    /* 
        This function is used to open the message editor 
        automatically when an .msgTrigger element is clicked. 
        The function acts as a proxy to the openMessage method 
        which is publicly exposed for programatic opening. 
    */ 
    var triggerClickHandler = function() { 
        var opts = $(this).data()
          , containerID = this.getAttribute('href').substring(1)
          , container = state.containers[containerID];
        
        openMessage(container,opts); 
    }; 
    
    var openMessage = function(container,opts) { 
        // function will only fire if message-type/template is registered/defined: 
        if(typeof state.messageTypes[opts.tmpl] != 'undefined') { 
            // grab copies of the default subject/message from template: 
            var tmpl = state.messageTypes[opts.tmpl]
              , subject = tmpl.subject
              , message = tmpl.message; 
            
            // inject all known message variables into the template subject and body: 
            for(var i=0; i < state.variables.length; ++i) { 
                subject = util.injectStringData(subject,state.variables[i].name,state.variables[i].value);    
                message = util.injectStringData(message,state.variables[i].name,state.variables[i].value); 
            }
            // set the subject and message values: 
            container.subject.value = subject;  
            container.message.value = message; 
            // call any open handlers
            if(tmpl.openHandler) tmpl.openHandler(opts); 
            if(typeof state.customOpenHandlers[opts.tmpl] != 'undefined') { 
                for(var i=0; i < state.customOpenHandlers[opts.tmpl].length; ++i) { 
                    state.customOpenHandlers[opts.tmpl][i](opts); 
                }   
            }
            // make message container visible:         
            $(container.container).addClass('visible'); 
        }

    }; 
    
    /*
        Usage Example: 
        messenger.registerMessageType(msgType,opts); 
        
        where: 
            msgType = templateUID = String
            opts = { 
                subject:             Variable-encoded String         (required)
                message:             Variable-encoded String         (required)
                openHandler:         function                        (optional)
                successHandler:      function                        (optional)
                errorHandler:        function                        (optional)
            }
    */ 
    pub.registerMessageType = function(msgType,opts) { 
        var opts = $.extend({},messageDefaults,opts); 
        state.messageTypes[msgType] = opts; 
    }; 
    
    /*
        Usage Example: 
        messenger.setVariable('xmTaskName','Humidifier Repair'); 
    */
    pub.registerVariable = function(name,value) { 
        var found = false; 
        for(var i=0; i < state.variables.length; ++i) { 
            if(state.variables[i].name == name) { 
                found = i; break; 
            } 
        }
        if(found !== false) { 
            state.variables[i].value = value; 
        } else { 
            state.variables.push({name: name, value: value}); 
        }
    };
    
    /*
        Usage Example: 
        messenger.openMessage('msgContainerSingle',{tmpl:'contactPreferences',spid:'123'})
    */
    pub.openMessage = function(containerID,opts) { 
       openMessage(state.containers[containerID],opts);  
    }; 
    
    /*
        Usage Example: 
        messenger.onMessageOpen('youAreHired',function(opts){ });
    */
    pub.onMessageOpen = function(msgType,cb) { 
        if(typeof cb !== 'function') return false; 
        if(typeof state.customOpenHandlers[msgType] == 'undefined') { 
            state.customOpenHandlers[msgType] = []; 
        }
        state.customOpenHandlers[msgType].push(cb); 
    }; 
    
    $(d).ready(domCollection); 
    return pub; 
})(window,document,jQuery,{}); 