new Vue({
    el:'#app',
    data:
    {
        plate:'',
        status:'',
        location:'',
        invoice:'',
        date:'',
        time:'',
        dtime:'',
        show: false,
        reply:[] ,
        statusx:'',
        searchp:''
    },
    methods:{
        getd: function()
        {
            this.show = true
            $.post('http://127.0.0.1:5000/pay',
            {
                "plate":"ubbbb"
            },(data,success)=>
            {
                this.reply = data
            })
        },
        save: function()
        {
            this.show = true
            $.post('http://127.0.0.1:5000/save',
            {
                plate:this.plate,
                location:this.location,
                invoice:this.invoice,
                date:this.date,
                time:this.time,
                dtime:this.dtime,
                status:this.status,
                fine: this.statusx
                
            })
           this.plate=""
           this.location = "Locations"
           this.invoice = ""
           this.date = "date"
           this.time = "time"
           this.status = "Status"
           
           this.getd()
        },
        status_set: function()
        {
            if(this.status === "Non Payment")
            {
            console.log('10000')
            this.statusx = 10000

           }if(this.status === "Clamped"){
            console.log('25000')
           this.statusx = 25000

        }if(this.status === "Wrong Parking"){
            console.log('30000')
            this.statusx = 30000
        }
    },
        searchplate: function()
        {
            $.post('http://127.0.0.1:5000/search',
            {
                plate:this.searchp
            },(data)=>
            {
                console.log(data)
                this.reply = data
            })
        }
    }
