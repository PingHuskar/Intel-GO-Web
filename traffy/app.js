const table = document.querySelector('table')

let sum_count = 0
let sum_count_start = 0
let sum_count_forward = 0 
let sum_count_inprogress = 0
let sum_count_finish = 0
let sum_count_irrelevant = 0
axios.get(`https://publicapi.traffy.in.th/share/teamchadchart/subdistrict-stat`)
.then(res => res.data)
.then(data => {
    console.log(data)
    for (let d of data) {
        sum_count += Number(d.count)
        sum_count_start += Number(d.count_start)
        sum_count_forward += Number(d.count_forward)
        sum_count_inprogress += Number(d.count_inprogress)
        sum_count_finish += Number(d.count_finish)
        sum_count_irrelevant += Number(d.count_irrelevant)
        let count_start_pct = Math.round(Number(d.count_start)/Number(d.count)*100) || 0
        let count_forward_pct = Math.round(Number(d.count_forward)/Number(d.count)*100) || 0
        let count_inprogress_pct = Math.round(Number(d.count_inprogress)/Number(d.count)*100) || 0
        let count_finish_pct = Math.round(Number(d.count_finish)/Number(d.count)*100) || 0
        let count_irrelevant_pct = Math.round(Number(d.count_irrelevant)/Number(d.count)*100) || 0
        table.innerHTML += `
        <tr>
        <td>${d.district}</td>
        <td>${d.count}</td>
        <td>${d.count_start} (${count_start_pct}%)</td>
        <td>${d.count_forward} (${count_forward_pct}%)</td>
        <td>${d.count_inprogress} (${count_inprogress_pct}%)</td>
        <td>${d.count_finish} (${count_finish_pct}%)</td>
        <td>${d.count_irrelevant} (${count_irrelevant_pct}%)</td>
        </tr>
        `
    }
})
.then(() => {
    table.innerHTML += `
        <tr>
        <td></td>
        <td>${sum_count}</td>
        <td>${sum_count_start}</td>
        <td>${sum_count_forward}</td>
        <td>${sum_count_inprogress}</td>
        <td>${sum_count_finish}</td>
        <td>${sum_count_irrelevant}</td>
        </tr>
    `
})
.catch(err => {
    alert(err)
})