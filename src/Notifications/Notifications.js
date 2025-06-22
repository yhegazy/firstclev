const Notifications = ({onCheckboxOutcome, notifications}) => {


    let data = {}

    // SAME
    const handleEmail = () => {
        //     fetch('/email', {method: "POST",})
        //         .then(function(res){ console.log(res) })
        }
    
        const handleSMS = () => {
            fetch('/sms', {method: "POST"})
                .then(function(res){console.log(res)})
        }
    
        const handleSMSDDL = (e) => {
        //     e.value !== 'select' && fetch('/ddl', {
        //         method: "POST", 
        //         headers: {'Content-Type': 'application/json'},
        //         body: JSON.stringify({option: e.value})
        //     })
        //     .then(function(res){console.log(res)})
        }
    


    // const [save, setSave] = useState({vID:"", subMenu:"", title: "", body:"", email:"noreply@firstcleveland.org", telephone:"216-404-8635",  hrefURL:"firstCleveland.org", start: new Date(), end: new Date(), allDay: false, imageName:"", orderBy: 'date', results: 30, buttonName: "Watch Latest Live Stream (Fridays 1:30p ET)", liveBtnOverride: false }) 


  return <>
    <div className="py-4 grid justify-center">
        <label className="px-2 font-semibold" htmlFor="liveBtnOverride" >Send Email to subscribers?</label>
        <button className="px-4 py-2 font-semibold text-white bg-blue-500 rounded shadow hover:bg-blue-700" onClick={handleEmail}>Submit</button>
    </div>

    <div className="py-4 grid justify-center">
        <label className="px-2 font-semibold" htmlFor="liveBtnOverride" >Send SMS to subscribers?</label>
        <select className=' border border-black' onChange={e => handleSMSDDL(e.target)} >
            <option>select</option>
            <option>liveStream</option>
            <option>eid</option>
            <option>test</option>
        </select>    
    </div>
    <div className="py-4 grid justify-center">
        <label className="px-2 font-semibold" htmlFor="liveBtnOverride" >Send SMS to subscribers?</label>
        <button className="px-4 py-2 font-semibold text-white bg-green-500 rounded shadow hover:bg-green-700" onClick={handleSMS}>Submit</button>
    </div> 
  </>
}

export default Notifications