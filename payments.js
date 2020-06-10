new Vue ({
    el: '#app',
    data:
    {
        test:'',
        reply:[],
        reply2:[],
        pay: false,
        credit: false
    },
    methods:
    {
        loadpayments: function()

        {
            this.pay = true
            this.credit = false
            $.post('http://127.0.0.1:5000/getpayments',
            {
                plate:'ubb'    

            },(data)=>
            {
                this.reply = data

            })
        },
        dsend: function()
        {
            this.pay = false
            this.credit = true
            $.post('http://127.0.0.1:5000/nonpay',
            {
                plate:'uxx'
            },(data)=>
            {
                this.reply2 = data

            })
        },
        send: function()
        {
            $('#tbid').tableToCsv(
                {
                  // var utc = ,
                  fileName: new Date().toJSON().slice(0,10).replace(/-/g,'/')
                })
          
            },
        dsave: function()
            {
                $('#tbid2').tableToCsv(
                    {
                      // var utc = ,
                      fileName: new Date().toJSON().slice(0,10).replace(/-/g,'/')
                    })
              
                }
        }

            
        
  
    

})
