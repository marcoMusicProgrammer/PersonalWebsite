const latencyText = document.getElementById("latency")

function updateTime(){
    const time = Date.now()

    fetch(`/api/time`,{merhod: `get`})
        .then((resp)=>{
        resp.json()
        .then(testo =>{
            const rtt = Date.now()-time
            const dt = testo.time-time
            //round trip RTT
            // console.log(testo.time-time)ù
            latencyText.innerHTML = `Server latency: ${rtt} ms`

        })
        .catch(err => {
            console.log(err)
        })

        })
        .catch((err)=>{
            console.log(err)
        })
        }

setInterval(updateTime,1000)