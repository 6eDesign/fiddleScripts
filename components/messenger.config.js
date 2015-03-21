var msgConfig = (function(w,d,$,pub){
    var nL = '\r\n'; 
      , defaultSubject = 'Regarding my #{xmTaskName}';
      , defaultMessage = 'Please contact me about my project: #{xmTaskName}.' + nL + nL + 
                         'The best way to get in touch with me is:' + nL + nL + 
                         'Daytime: #{consumerPhone}' + nL + nL + 
                         'Email: #{consumerEmail}' + nL + nL + 
                         'Regards, ' + nL + 
                         '#{consumerFirstName} #{consumerLastName}'; 
    
    pub.messageTypes = [ 
        { 
            id: 'contactPreferences',
            opts: { 
                subject: defaultSubject, 
                message: defaultMessage, 
                openHandler: singleRecipientSimple
            }
        }, { 
            id: 'youAreHired',
            opts: { 
                subject: defaultSubject, 
                message: 'Thank you for your time and effort regarding my project: ' + 
                            '#{xmTaskName}.' + nL + nL + 
                            'I have decided to hire your company to complete my project.' + nL + 
                            'Please contact me soon so we can make the ' + 
                            'appropriate arrangements.' + nL + nL + 
                            'Regards,' + nL + 
                            '#{consumerFirstName} #{consumerLastName}' + nL + 
                            'Phone: #{consumerPhone}' + nL + 
                            'Email: #{consumerEmail}', 
                openHandler: singleRecipientSimple
            }
        }
    ]; 

    return pub;
})(window,document,jQuery,{}); 

