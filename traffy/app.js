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
        table.innerHTML += `
        <tr>
        <td>${d.district}</td>
        <td>${d.count}</td>
        <td>${d.count_start}</td>
        <td>${d.count_forward}</td>
        <td>${d.count_inprogress}</td>
        <td>${d.count_finish}</td>
        <td>${d.count_irrelevant}</td>
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